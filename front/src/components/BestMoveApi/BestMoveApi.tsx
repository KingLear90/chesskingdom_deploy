import './Learn.css';
import { useState } from 'react';
import { Chess } from 'chess.js'
import ChessboardInterface from '../ChessboardInterface/ChessboardInterface';

function BestMoveApi() {
  //Se declara un código FEN por defecto, para que el usuario pueda ver cómo lo analiza Stockfish, pero además por si no conoce cómo es un FEN.
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState<string>(chess.fen());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const depth: number = 18;
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<string>();
  const [mate, setMate] = useState<string>();
  const [winChance, setWinChance] = useState<number | undefined>();
  const [interpretation, setInterpretation] = useState(false);
  const CHESS_API_URL = 'https://chess-api.com/v1'

  // Los eventos de cambio en React con Typescript no pueden ser, por ejemplo, de tipo string.
  // sino un objeto de tipo React.ChangeEvent<ELEMENTO QUE SE USE>.
  const handleFenChange = (event: React.ChangeEvent<HTMLInputElement>) => {   
    const newFEN = event.target.value;   // Se actualiza el estado del FEN con el valor ingresado por el usuario.
    setFen(newFEN)                    
    chess.load(newFEN)                   // Se carga la nueva instancia de Chess con el FEN proporcionado.
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {  // Igual situación de evento en TS + React, pero con un evento tipo click.
    event.preventDefault();  
    setLoading(true);             // Avisa al usuario que se está procesando la solicitud.

    try {   {/* Esta sería la solicitud POST a la API (se puede chusmear en chess-api.com) con el FEN ingresado por el usuario */}
        const response = await fetch(CHESS_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fen, depth }) // Solicitud según FEN y depth (colocada por defecto en 18, la mejor opción que ofrece la API).
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('API error: ${response.status} ${response.statusText}');
        }

        let result = data.text;
        if (result.includes(")")) {
          result = result.replace(")", '');
        } 
        if (result.includes(":")) {
          result = result.replace(":", '');
        }
        if (result.includes("Depth")) {
          result = result.replace("Depth", 'Profundidad');
        }
        if (result.includes("The game is balanced.")) {
            result = result.replace("The game is balanced.", '');
        }
        if (result.includes("White is winning.")) {
          result = result.replace("White is winning.", '');
        }
        if (result.includes("Black is winning.")) {
        result = result.replace("Black is winning.", '');
        }
      
        setResultado(result.slice(14,45));

        const mate = data.mate;
        setMate(mate);

        setWinChance(data.winChance);

      } catch (error) {
        console.error(error);
        setResultado('Error al obtener el mejor movimiento');
      } finally {
        setLoading(false);
      }
  };

  // Función para movimientos.  
  const onDrop = (sourceSquare: string, targetSquare: string) => {

    // Validación de movimientos (chess.js library)
    const move = chess.move({
        from: sourceSquare,   // Casilla de origen
        to: targetSquare,     // Casilla destino
        promotion: 'q'        // Promocionar a 'Reina'
      });

      // Si el movimiento es inválido, retorna Falso para ignorarlo.
      if (move === null) {
        return false;
      }

      setFen(chess.fen());  // Actualiza el FEN cuando el movimiento es válido.
      return true; // Devuelve entonces un true
    }
  
  const handleInterpretation = () => {
    setInterpretation(!interpretation)  // Interpretation explica la respuesta de Stockfish. Por defecto el estado está en false.
  }

  const toggleBoardOrientation = () => {
    setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white');
  };

  return (
    <div>
        <h4 className='engineFeature'>¡Consultá con Stockfish el mejor movimiento de una determinada posición!</h4>
        <h5>¿Cómo funciona? Es simple: </h5>
        <ol className='instructions'>
            <li>Ingresa el código FEN de la posición a analizar. Por defecto ya hay un FEN escrito para que veas el formato.</li>
            <li>Haz clic en <i>'¿Mejor movimiento?'</i> y espera la respuesta de Stockfish.</li>
        </ol>
        <div className='engine-datacontainer'>
            <label className='code'>Código FEN: </label>
            <input type="text" className='fen' name='fen' value={fen} onChange={handleFenChange} placeholder="Ingresa el código FEN" />
            <div className="board-controls-container mt-4">
            <div id="chessboard-container">
              <ChessboardInterface 
                fen={fen}
                onDrop={onDrop}
                boardOrientation={boardOrientation}
              />
            </div>
            <div className='boardBtns'>
              <button 
                className="startBtn" 
                onClick={() => {
                  chess.reset();
                  setFen(chess.fen());
                }}>
                Posición inicial ♖♘♗
              </button>
              <button 
                className='flipBtn' 
                onClick={toggleBoardOrientation}>
                Girar tablero 🔁
              </button>
              <button 
                className='undoBtn' 
                onClick={() => { chess.undo()
                  setFen(chess.fen())
                }}>
                Deshacer ↩
              </button>
            </div>
          </div>
        </div>
            <button onClick={handleSubmit} className='btn btn-link mb-3' style={{fontWeight:'bolder'}}>¿Mejor movimiento?</button>

            {loading && <h4 className='calculating'>Calculando...</h4>}  {/* Avisa al usuario que se está procesando la solicitud. */}
            <div>
              {resultado && <p className='textAnalysis'>El mejor movimiento es: {resultado}</p>} 
              {mate && <p className='textAnalysis'>Mate en {mate}</p>}
              {resultado && winChance !== undefined && <p className='textAnalysis'> La probabilidad de victoria para las blancas es del {winChance.toFixed(2)}%</p>}
              {resultado && <h5 className='interpretation'>¿Cómo interpretar el resultado? 
                <button onClick={handleInterpretation} className='interButton'>
                {!interpretation ? <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 16" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="arrowDown"><path d="M15 6v6h4l-7 7-7-7h4V6h6z"/></svg> : 
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="arrowUp"><rect width="16" height="16" x="4" y="4" rx="3"/><path d="M8 12h8"/></svg>}
                </button> </h5>}
              {interpretation && <h6> {/* Si interpretation es true, entonces... */}
                  <ul className='list-interpretation'>
                      <li>Primero se indica en notación algebraica la mejor jugada en la posición.</li>
                      <li>El siguiente valor, ubicado entre corchetes, indica la evaluación de la posición . Un valor negativo indica que la ventaja es para las negras.</li>
                      <li>Por último, puede verse la profundidad del análisis de Stockfish (máximo 18, equivalente a 2750 puntos FIDE).</li>
                      <li>Si hay posibilidad de mate en la posición, se especifica en cuántas jugadas (si el número de jugadas es negativo, significa que son las negras quienes pueden dar mate).</li>
                      <li>En el último recuadro aparece la probabilidad de uno u otro bando para ganar. Si el porcentaje es cercano al 50% signfica que la posición está equilibrada. Por encima del 50%, las chances incrementan para las blancas, por debajo de dicho valor, aumentan para las negras.</li>
                  </ul>       
                </h6> 
              }
            </div>
        </div>
  );
  
}

export default BestMoveApi;