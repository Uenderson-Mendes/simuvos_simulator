import React from 'react';
import { ProcessManager } from './components/ProcessManager';

function App() {
  return (
    <div className="App">
      <header className="App-header text-center p-3 mb-4 bg-dark text-white">
        <h2> SimuVOS: Simulador para o Ensino de Sistemas Operacionais</h2>
       
      </header>
      <ProcessManager />
    </div>
  );
}

export default App;
