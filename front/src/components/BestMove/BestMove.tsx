import './BestMove.css';
import { useEffect, useState } from 'react';
import { Chess, Square } from 'chess.js';
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';

const STOCKFISH_PATH = "/js/stockfish-17-lite-single.js";

function BestMove() {
  const [chess] = useState(new Chess());
  const [stockfish, setStockfish] = useState<Worker | null>(null);
  const [bestMove, setBestMove] = useState<string>("");
  const [fen, setFen] = useState<string>(chess.fen());
  const [pieceSquare, setPieceSquare] = useState<string | null>(null);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");

  const aFigurine = (san: string) => {    // Función para convertir notación algebraica (san) a figurine.
    const figurineMap: { [key: string]: string } = {
      "K": "♔",
      "Q": "♕",
      "R": "♖",
      "B": "♗",
      "N": "♘",
    };
  
    return san.replace(/[KQRBN]/g, match => figurineMap[match] || match);
  };

  // Iniciar Stockfish
  useEffect(() => {
    const worker = new Worker(STOCKFISH_PATH);
    setStockfish(worker);

    stockfish?.postMessage("setoption name Multipv value 3");
    stockfish?.postMessage("setoption name Threads value 1");
    stockfish?.postMessage("setoption name Hash value 128");

    worker.onmessage = (event) => {
      const message = event.data;
      console.log("Stockfish:", message);

      if (message.startsWith('bestmove')) {
        const moveUCI = message.split(' ')[1];
        const move = chess.move({ from: moveUCI.slice(0, 2), to: moveUCI.slice(2, 4), promotion: 'q' });
        
        if (move) {
          setBestMove(aFigurine(move.san)); // Devuelve la jugada en notación algebraica (SAN)
          chess.undo()
        }
    };

    return () => worker.terminate(); // Limpiar el worker al desmontar
    }
  }, []);

  useEffect(() => {
    if (stockfish) {
      analyzePosition(chess.fen());
    }
  }, [stockfish]);

  const analyzePosition = (fen: string) => {
    stockfish?.postMessage(`position fen ${fen}`);
    stockfish?.postMessage("go depth 15");
  };  
  // Manejo de cambios si el usuario ingresa un código FEN (se puede optimizar verificando si el FEN es válido)
  const handleFenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFEN = event.target.value;
    setFen(newFEN);
    chess.load(newFEN);
    analyzePosition(newFEN)
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: 'q' });
      if (!move) return false;

      setFen(chess.fen());
      analyzePosition(chess.fen());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const onSquareClick = (square: string) => {
    if (pieceSquare === null) {
      setPieceSquare(square);
    } else {
      if (onDrop(pieceSquare, square)) {
        setPieceSquare(null);
      }
    }
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <div>
      <h4 className='engineFeature'>¡Analiza posiciones o partidas de inicio a fin con Stockfish!</h4>
      <h6>Ingresa el FEN de una posición o reproduce una partida jugada a jugada.</h6>

      <div className='engine-datacontainer'>
        <label className='code'>Código FEN: </label>
        <input type="text" className='fen' value={fen} onChange={handleFenChange} placeholder="Ingresa el código FEN" />

        <div className="board-controls-container mt-4">
          <div id="chessboard-container">
            <ChessboardInterface 
            fen={fen} 
            onDrop={onDrop} 
            onPieceClick={onSquareClick}
            arePiecesDraggable={true}
            snapToCursor={false}
            boardOrientation={boardOrientation} 
            />
          </div>
          <div className='boardBtns'>
            <button className="startBtn" onClick={() => { chess.reset(); setFen(chess.fen()); }}>
              Posición inicial ♖♘♗
            </button>
            <button className='flipBtn' onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}>
              Girar tablero 🔁
            </button>
            <button className='undoBtn' onClick={() => { chess.undo(); setFen(chess.fen()); }}>
              Deshacer ↩
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3>Stockfish recomienda: {bestMove || "Calculating..."}</h3>
      </div>
    </div>
  );
}

export default BestMove;