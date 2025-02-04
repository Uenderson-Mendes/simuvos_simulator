import React, { useState, useEffect } from 'react';

// Simulação de alocação de memória
const allocateMemory = () => {
  return Math.floor(Math.random() * 100) + 1; // Atribui de 1 a 100MB de memória
};

export let totalProcesses = 0;
export let totalMemoryAllocated = 0;

export const MemoryManager = ({ processes }) => {
  const [memoryAllocations, setMemoryAllocations] = useState({});

  useEffect(() => {
    const updatedMemoryAllocations = { ...memoryAllocations };

    processes.forEach((process) => {
      if (!(process.id in updatedMemoryAllocations)) {
        // Se a memória ainda não foi alocada, faz a alocação
        updatedMemoryAllocations[process.id] = allocateMemory();
      }
    });

    setMemoryAllocations(updatedMemoryAllocations);

    // Atualizar os valores exportados `totalProcesses` e `totalMemoryAllocated`
    totalProcesses = processes.length;
    totalMemoryAllocated = Object.values(updatedMemoryAllocations).reduce((total, allocation) => total + allocation, 0);
  }, [processes]);

  const handleStopProcesses = () => {
    // Limpa as alocações de memória
    setMemoryAllocations({});
    // Atualiza os totais para refletir que não há mais processos
    totalProcesses = 0;
    totalMemoryAllocated = 0;
  };

  return (
    <div>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>
            Processo {process.id} alocou {memoryAllocations[process.id] || 0}MB.
          </li>
          
        ))}
   
      </ul>
      
 
      
    
    </div>
  );
};
