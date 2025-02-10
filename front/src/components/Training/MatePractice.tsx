import './MatePractice.css';
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';
import ConfettiExplosion from 'react-confetti-explosion';
import { getRandomProblem } from '../../services/chessService';
import { ChessProblemProps } from '../../types/interfaces';

const MatePractice = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(chess.fen()); // FEN inicial del primer problema
  const [currentProblem, setCurrentProblem] = useState<ChessProblemProps | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  //Obtener un problema aleatorio de la BD al cargar la página
  const fetchNewProblem = async () => {
    const problem = await getRandomProblem();
    if (problem) {
      setCurrentProblem(problem);
      chess.load(problem.FEN); // Cargar la posición en el motor de ajedrez
      setFen(chess.fen()); // Actualizar el estado de FEN
      setIsGameOver(false);
      setCurrentStep(0);
    }
  };

  useEffect(() => {
    fetchNewProblem();
  }, []);

  const nextProblem = () => {
    // Cambiar al siguiente problema
    fetchNewProblem();
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
    const partialSolution: any = currentProblem?.Moves.split("");
    const solutionMoves: string[] = partialSolution?.slice(1)
  
    const isMateInOne = solutionMoves?.length === 2 

    if (isMateInOne && userMove === solutionMoves[1]) {
      setFen(chess.fen());
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        nextProblem();
      }, 1500);
      return true;
    }
    
    if (userMove === solutionMoves[currentStep]) {
      setFen(chess.fen());
      
      if (currentStep === solutionMoves.length) {
        // último movimiento de la solución, problema resuelto
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
          nextProblem();
        }, 1500);
      } else {
        // Respuesta de la computadora
        setTimeout(() => {
          chess.move(solutionMoves[currentStep] + 1);
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
      {currentProblem?.Themes.includes("mate") ? <h3>Encuentra el jaque mate</h3> : null}
      <div id='chessboard-container'>
        <ChessboardInterface 
          fen={fen} 
          onDrop={onDrop} 
          boardOrientation={currentProblem?.FEN.includes('w') ? 'white' : 'black'}
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