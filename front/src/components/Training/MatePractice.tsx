import './MatePractice.css';
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';
import ConfettiExplosion from 'react-confetti-explosion';
import { ChessProblemProps } from '../../types/interfaces';


const MatePractice = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(''); // FEN inicial del primer problema
  const [currentProblem, setCurrentProblem] = useState<ChessProblemProps>();
  const [currentStep, setCurrentStep] = useState(0);
  const [pieceSquare, setPieceSquare] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const initialUrl = import.meta.env.VITE_API_URL as string

  //Obtener un problema aleatorio de la BD al cargar la página
  const fetchNewProblem = async () => {
    try {
      const response = await fetch(`${initialUrl}problem/get-random`); // Petición a BD del back
      const data = await response.json();

      if (data) {
          console.log("New chess problem: ", data.fen, data.description);
          chess.load(data.fen);
          setFen(data.fen);
          setCurrentProblem(data);
          setIsGameOver(false);
          setCurrentStep(0);
      }
    } catch (error) {
      console.error("Error fetching problem:", error);
    } 
  };

  useEffect(() => {
    fetchNewProblem();
  }, []);

  const nextProblem = () => {
    // Cambiar al siguiente problema
    chess.reset()
    fetchNewProblem();
    };
    
  // Manejar el evento de mover una pieza
  const onDrop = (sourceSquare: string, targetSquare: string) => {
    console.log("Intentando mover:", sourceSquare, "->", targetSquare);
    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });
  
    if (move === null) return false;
    console.log("Movimiento realizado:", move);

    const userMove = `${sourceSquare}${targetSquare}`;
    const solutionMoves: any = currentProblem?.solution
    const isMateInOne = solutionMoves?.length === 1 

    if (isMateInOne && userMove === solutionMoves[0]) {
      setFen(chess.fen())
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        nextProblem();
      }, 1500);
      return true;
    }
    
    if (userMove === solutionMoves[currentStep]) {
      setFen(chess.fen())
      
      if (currentStep === solutionMoves.length - 1) {
        // último movimiento de la solución, problema resuelto
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
          nextProblem();
        }, 1500);
      } else {
        // Respuesta de la computadora
        setTimeout(() => {
          const computerMove = (solutionMoves[currentStep + 1]);
          if (computerMove) chess.move(computerMove);
          setFen(chess.fen())
          setCurrentStep(currentStep + 2); // Prepara el siguiente movimiento del usuario
        }, 500);
      }
      return true;
    }
  
    chess.undo();
    setFen(chess.fen())
    alert('Movimiento incorrecto, intenta de nuevo');
    return false;
  };

  const onSquareClick = (square: string) => {
    if (pieceSquare === null) {
      setPieceSquare(square);
    } else {
      const moveSuccess = onDrop(pieceSquare, square);
      setPieceSquare(null);
      if (!moveSuccess) {
        setPieceSquare(null);
      }
    }
  };

  return (
    <div className="mate-practice">
      <h1>Ejercicios</h1>
      <h6>Mejora tu visión y cálculo resolviendo problemas</h6>
      {currentProblem?.description ? <h3>{currentProblem?.description}</h3> : ''}
      <div id='chessboard-container'>
        {currentProblem && (
          <ChessboardInterface 
          fen={fen} 
          onDrop={onDrop} 
          onPieceClick={onSquareClick}
          boardOrientation={currentProblem?.side === 'w' ? 'white' : 'black'}
          />
        )}
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