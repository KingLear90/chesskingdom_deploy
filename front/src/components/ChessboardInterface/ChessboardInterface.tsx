import { Chessboard } from 'react-chessboard'; // Componente que representa un tablero de ajedrez.
import { ChessboardProps } from '../../types/interfaces';
import { useState, useEffect } from 'react';

const ChessboardInterface: React.FC<ChessboardProps> = ({ fen, onDrop, boardOrientation }) => {
  const [pieceSquare, setPieceSquare] = useState<string | null>(null);

  // Resetea pieceSquare cuando cambia el FEN
  useEffect(() => {
    setPieceSquare(null);
  }, [fen]);

  // La propiedad onSquareClick de react-chessboard permite para manejar el evento de clic en un cuadrado del tablero.
  // Esto permite mover las piezas haciendo clic en ellas y luego en la casilla de destino.
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
    <div>
      <div id="chessboard-container">
        <Chessboard 
          position={fen} 
          onPieceDrop={onDrop}     
          onSquareClick={onSquareClick}
          boardWidth={370}  
          customBoardStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              width: "min(90vw, 350px)",
            }} customDarkSquareStyle={{
              backgroundColor: "#15948e"
            }} customLightSquareStyle={{
              backgroundColor: "#edeed1"
            }} 
          boardOrientation={boardOrientation}
        />
      </div>
    </div>
  );
};

export default ChessboardInterface;