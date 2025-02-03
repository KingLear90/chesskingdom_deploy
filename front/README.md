# ChesskingdomReact

Proyecto desarrollado en React. Cuenta con diversas secciones, dos de las cuales (Learn & Gallery) conectan con dos APIs.

La API de la sección Gallery accede a información personificada de cada Campeón Mundial que incorporé a mockapi.io

La API de la sección Learn accede a información considerablemente más compleja: conecta con un chess engine (motor de ajedrez) llamado Stockfish, y logra analizar un código FEN que se le otorgue o la posición que se vaya realizando en el tablero. 
Si se tiene conocimientos de ajedrez, se puede utilizar algún configurador de código FEN a partir de una posición dada, como el sitio https://www.dailychess.com/chess/chess-fen-viewer.php 
Todo lo que debe hacerse es configurar la posición que se desea analizar y el sitio, por encima del tablero, va generando el código FEN adecuado. 
En chesskingdom/learn, en el apartado correspondiente, se puede pegar dicho FEN y solicitar a Stockfish que indique cuál es el próximo mejor movimiento en dicha situación.

Alternativamente, se puede ir reproduciendo una partida y cuando se desee, consultar a Stockfish.

Por debajo de la información suministrada por la API del engine, describí línea por línea qué es lo que devuelve, es decir, cómo "leer" la información que el engine devuelve.