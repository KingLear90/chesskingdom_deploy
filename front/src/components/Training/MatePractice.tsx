import './MatePractice.css';
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';
import ConfettiExplosion from 'react-confetti-explosion';
import { problems } from '../../data/problems';

const MatePractice = () => {
  
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(chess.fen()); // FEN inicial del primer problema
  const [currentMove, setCurrentMove] = useState(0); // Mueve el marcador en el problema
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false); // Estado para controlar si el juego ha terminado
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    chess.load(problems[currentMove].fen); // Cargar el FEN del problema en Chess.js
    setFen(chess.fen()); // Actualizar el estado de FEN para reflejar la nueva posición
    setIsGameOver(false); // Reiniciar el estado de fin de juego
    setCurrentStep(0); // Reiniciar el step actual
  }, [currentMove]);

  const nextProblem = () => {
    // Cambiar al siguiente problema
    setCurrentMove((prevMove) => (prevMove + 1) % problems.length); // Cicla entre problemas
    chess.reset(); // Resetear el tablero
    };
    
  // Manejar el evento de mover una pieza
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });
  
    if (move === null) return false;
  
    const userMove = `${sourceSquare}${targetSquare}`;
    const isMateInOne = problems[currentMove].solution.length === 1;
  
    // Manejo de mate en un solo movimiento
    if (isMateInOne && userMove === problems[currentMove].solution[0]) {
      setFen(chess.fen());
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        nextProblem();
      }, 1500);
      return true;
    }
    
    if (userMove === problems[currentMove].solution[currentStep]) {
      setFen(chess.fen());
      
      if (currentStep === problems[currentMove].solution.length - 1) {
        // último movimiento de la solución, problema resuelto
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
          nextProblem();
        }, 1500);
      } else {
        // Respuesta de la computadora
        setTimeout(() => {
          chess.move(problems[currentMove].solution[currentStep + 1]);
          setFen(chess.fen());
          setCurrentStep(currentStep + 2); // Prepara el siguiente movimiento del usuario
        }, 500);
      }
      return true;
    }
  
    chess.undo();
    setFen(chess.fen());
    alert('Movimiento incorrecto, intenta de nuevo');
    return false;
  };

  return (
    <div className="mate-practice">
      <h1>Ejercicios de Jaque Mate</h1>
      <h6>Mejora tu cálculo y visión resolviendo problemas</h6>
      {problems[currentMove].description ? <h3>{problems[currentMove].description}</h3> : null}
      <div id='chessboard-container'>
        <ChessboardInterface 
          fen={fen} 
          onDrop={onDrop} 
          boardOrientation={problems[currentMove].side === 'w' ? 'white' : 'black'}
          />
      </div>
        {isExploding && <ConfettiExplosion 
        particleCount={130} 
        particleSize={20}
        width={1100} 
        height={600}
        duration={4000}
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}  />}
        <button onClick={nextProblem} className="next-button">
          {isGameOver ? 'Siguiente problema' : 'Siguiente problema'}
        </button>
      </div>
  );
}

export default MatePractice;