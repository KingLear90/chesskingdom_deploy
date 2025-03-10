import "./MatePractice.css";
import { useState, useEffect } from "react";
import { Chess, Square, PieceSymbol } from "chess.js";
import ChessboardInterface from "../ChessboardInterface/ChessboardInterface";
import ConfettiExplosion from "react-confetti-explosion";
import Rating from "@mui/material/Rating";
import { ChessProblemProps } from "../../types/interfaces";
import { useParams, useNavigate } from "react-router-dom";

const MatePractice = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(""); // FEN inicial del primer problema
  const [allProblems, setAllProblems] = useState<ChessProblemProps[]>([]);
  const [currentProblem, setCurrentProblem] = useState<ChessProblemProps>();
  const [seenProblems, setSeenProblems] = useState<string[]>([]); // Guardar los _id de los problemas ya mostrados
  const [currentStep, setCurrentStep] = useState(0);
  const [pieceSquare, setPieceSquare] = useState<string | null>(null);
  const [isAMateProblem, setIsAMateProblem] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const initialUrl = import.meta.env.VITE_API_URL as string;
  const { id, category, difficulty } = useParams();
  const navigate = useNavigate();


  //Obtener un problema aleatorio de la BD al cargar la página
  useEffect(() => {
    let isMounted = true;   // Variable de control para evitar problemas de memoria

    const fetchAllProblems = async () => {
      try {
        const response = await fetch(`${initialUrl}problem/get`); // Petición a BD del back
        const data = await response.json();
        if (isMounted) {
          setAllProblems(data);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchAllProblems();

    return () => { isMounted = false; }; // Limpiar el efecto cuando el componente se desmonta
  }, []);

  const getNewProblem = () => {
    // Filtrar solo los problemas que no han sido mostrados
    const availableProblems = allProblems.filter(
      (problem) => !seenProblems.includes(problem._id)
    );

    if (availableProblems.length === 0) {
      setSeenProblems([]); // Reiniciar la lista cuando ya se vieron todos
      return getNewProblem(); // Llamar de nuevo con la lista reiniciada
    }

    // Elegir un problema al azar de los disponibles
    const newProblem = availableProblems[Math.floor(Math.random() * availableProblems.length)];
    setSeenProblems([...seenProblems, newProblem._id]);
    setCurrentProblem(newProblem);
    setFen(newProblem.fen);
    chess.load(newProblem.fen);
    setIsGameOver(false);
    setCurrentStep(0);

    navigate(`/practice/problem/${newProblem._id}/category/${newProblem.category}`);
  };

  useEffect(() => {
    if (allProblems.length > 0) getNewProblem();
  }, [allProblems]);

  useEffect(() => {
    if (currentProblem) {
      setIsAMateProblem(currentProblem.category.includes("Mate"));
    }
  }, [currentProblem]);

  const nextProblem = () => {
    chess.reset();
    getNewProblem();
  };

  // Manejar el evento de mover una pieza
  const onDrop = (sourceSquare: string, targetSquare: string, promotion: string) => {
    if (sourceSquare === targetSquare) {
      setPieceSquare(null);
      return false;
    }

    const piece = chess.get(sourceSquare as Square);

    if (chess.turn() === 'w' && piece?.color === 'b') {
      alert('Es el turno de las blancas');
      return false;
    }
    if (chess.turn() === 'b' && piece?.color === 'w') {
      alert('Es el turno de las negras');
      return false;
    }

    if (chess.isGameOver()) {
      setPieceSquare(null);
      return false;
    }

    const move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) { 
      return false;
    } 

    console.log("Movimiento realizado:", move);

    const userMove = `${sourceSquare}${targetSquare}`;
    const solutionMoves: any = currentProblem?.solution;
    const isMateInOne = solutionMoves?.length === 1;

    if (isMateInOne && userMove === solutionMoves[0]) {
      setFen(chess.fen());
      setIsExploding(true);
      const explodingTimer = setTimeout(() => {
        setIsExploding(false);
        clearTimeout(explodingTimer);
      }, 1000);
      return true;
    }

    if (userMove === solutionMoves[currentStep]) {
      setFen(chess.fen());

      if (currentStep === solutionMoves.length - 1) {
        // último movimiento de la solución, problema resuelto
        setIsExploding(true);
        const explodingTimer = setTimeout(() => {
          setIsExploding(false);
          clearTimeout(explodingTimer);
        }, 1000);
      } else {
        // Respuesta de la computadora
        setTimeout(() => {
          const computerMove = solutionMoves[currentStep + 1];
          if (computerMove) chess.move(computerMove);
          setFen(chess.fen());
          setCurrentStep(currentStep + 2); // Prepara el siguiente movimiento del usuario
        }, 500);
      }
      return true;
    }

    chess.undo();
    setFen(chess.fen());
    setPieceSquare(null);
    alert("Movimiento incorrecto, intenta de nuevo");
    return false;
  };

  const onSquareClick = (square: string) => {
    if (pieceSquare === null) {
      setPieceSquare(square);
    } else {
      const moveSuccess = onDrop(pieceSquare, square, "q");
      setPieceSquare(null);
    }
  };

  return (
    <div className="mate-practice">
      <h1>Problemas de ajedrez</h1>
      <h5 className="introMsg">
        Mejora tu visión y cálculo resolviendo ejercicios.
      </h5>
      <div className="problemInfo">
        <span className="problemDescription">
          {currentProblem?.description ? (<h3>{currentProblem?.description}</h3>) : ("")}
        </span>
        <span>
          {isAMateProblem ? (<h5 className="hints">Tema: jaque mate</h5>) : (<h5 className="hints">Tema: ventaja decisiva</h5>)}
        </span>
        <span className="difficultyRank">
          <h5>
            Dificultad:{" "}
            <Rating
              name="problemRating"
              readOnly={true}
              className="ratingStars"
              value={currentProblem?.difficulty ? currentProblem.difficulty : 0}
              precision={0.5}
            />
          </h5>
        </span>
      </div>
      <div id="chessboard-container">
        {currentProblem && (
          <ChessboardInterface
            fen={fen}
            onDrop={onDrop}
            onPieceClick={onSquareClick}
            arePiecesDraggable={true}
            snapToCursor={false}
            boardOrientation={currentProblem?.side === "w" ? "white" : "black"}
          />
        )}
      </div>
      <div>
      </div>
      {isExploding && (
        <ConfettiExplosion
          particleCount={170}
          particleSize={20}
          width={1100}
          height={1000}
          duration={4000}
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
      <button onClick={nextProblem} className="next-button">
        {isGameOver ? "Siguiente problema" : "Siguiente problema"}
      </button>
    </div>
  );
};

export default MatePractice;
