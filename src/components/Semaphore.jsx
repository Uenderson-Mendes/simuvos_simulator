import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Semaphore = ({ processes, semaphoreStates }) => {
  return (

    <div className="container shadow-lg p-2 mb-5 bg-white rounded">
      <br></br><h3 className="text-center">Simulação de Semáforo</h3><br></br>
      {processes.length === 0 ? (
        <h2 className="text-center text-muted">Sem processos no momento</h2>
      ) : (
        <div className="row">
          {processes.map((process) => (
            <div className="col-md-3
             mb-1" key={process.id}>
              <div className="card shadow" style={{ width: '100%' }}>
                <div className="card-body">
                  <h6
                    className="card-title">Processo #{process.id}

                  </h6>
                  <p
                    className={`card-text ${semaphoreStates[process.id] ? 'text-success' : 'text-danger'
                      }`}
                  >
                    {semaphoreStates[process.id] ? 'desbloqueado' : 'bloqueado'}.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
