import React, { useState, useEffect } from 'react';

export const DeadlockManager = ({ processes }) => {
  const [showDeadlockModal, setShowDeadlockModal] = useState(false);
  const [deadlockMessage, setDeadlockMessage] = useState('Nenhum deadlock detectado.');
  const [userConfirmed, setUserConfirmed] = useState(false); // Estado para rastrear a confirmação do usuário
  const [firstDeadlockNotified, setFirstDeadlockNotified] = useState(false);

  useEffect(() => {
    const waitingProcesses = processes.filter(process => process.state === 'em espera');

    if (waitingProcesses.length > 1) {
      setDeadlockMessage('Deadlock detectado!');

      if (!firstDeadlockNotified) {
        setShowDeadlockModal(true); // Exibir o modal
        setFirstDeadlockNotified(true);
      }
    } else {
      setDeadlockMessage('Nenhum deadlock detectado.');
    }
  }, [processes, firstDeadlockNotified]);

  // Função para lidar com a confirmação do usuário
  const handleConfirm = (confirmed) => {
    setUserConfirmed(confirmed);
    setShowDeadlockModal(false); // Fechar o modal
    if (confirmed) {
      console.log('Usuário confirmou a orientação.');
    } else {
      console.log('Usuário cancelou a ação.');
    }
  };

  const alertClass =
    deadlockMessage === 'Deadlock detectado!'
      ? 'alert alert-danger text-center mt-3 d-flex justify-content-between align-items-center'
      : 'alert alert-info text-center mt-3';

  // Função para bloquear o scroll da página quando o modal está aberto
  const toggleBodyScroll = (isModalOpen) => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    toggleBodyScroll(showDeadlockModal);
    return () => toggleBodyScroll(false);
  }, [showDeadlockModal]);

  return (
    <div className="container p-3 mb-5 bg-white rounded position-relative">
      <h3 className="text-end">Gerenciador de Deadlock</h3>
      <div className={alertClass}>
        {deadlockMessage}
        {deadlockMessage === 'Deadlock detectado!' && (
          <button
            className="btn btn-warning position-absolute"
            style={buttonStyle}
            onClick={() => setShowDeadlockModal(true)}
          >
            Saber mais
          </button>
        )}
      </div>

      {/* Modal da página */}
      {showDeadlockModal && (
        <div className="full-screen-card" style={fullScreenCardStyles}>
          <div className="modal-content p-4 bg-white rounded" style={modalContentStyles}>
          <h1 class="text-danger">Deadlock detectado!</h1>

            <h5 className="modal-title">O que é um Deadlock?</h5>
            <p className="modal-body">
              Um deadlock ocorre quando dois ou mais processos estão esperando por um recurso que nunca será liberado,
              resultando em uma situação de impasse. Isso pode acontecer em sistemas multitarefa ou distribuídos quando
              os recursos compartilhados não são gerenciados adequadamente.     
              <a href="https://www.devmedia.com.br/introducao-ao-deadlock/24794" target="_blank" rel="noopener noreferrer">saber mais...</a>
            </p>
            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={() => handleConfirm(true)} // Chamar handleConfirm com true
              >
                OK
              </button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Estilos do card em tela cheia
const fullScreenCardStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.76)', // Fundo semi-transparente
  zIndex: 1050,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// Estilos do conteúdo do modal
const modalContentStyles = {
  width: '400px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const buttonStyles = {
  bottom: '10px      ', // Ajuste a posição conforme necessário
  right: '10px',  // Ajuste a posição conforme necessário
  zIndex: 1060,   // Deve ser maior que o do modal
};
const buttonStyle = {
  bottom: '10px', // Ajuste a posição conforme necessário
  right: '10px',  // Ajuste a posição conforme necessário
    // Deve ser maior que o do modal
};