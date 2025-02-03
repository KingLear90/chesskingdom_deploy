import './Champions';
import { useState, useEffect } from 'react';
import { ChampionsProps } from '../../types/interfaces';

function Campeones( { champions } : ChampionsProps ) {

  const [index, setIndex] = useState(0);  // Se declara un índice que se utilizará para mostrar las fotos de los campeones.

  function handleNext() {
    setIndex(index + 1);
    // Si el índice es igual a la longitud del array - 1, se reinicia a 0. Si no, se incrementa en 1.
    // Esto permite que al llegar a la última foto, si se vuelve a presionar el botón, se muestre la primera foto nuevamente:
    index === champions.length - 1 ? setIndex(0) : setIndex(index + 1); 
  }

  function handlePrevious() {
    setIndex(index - 1);
    // Similar a lo descripto para el handleNext... en este caso, si el índice es 0, se reinicia a la última foto.
    index === 0 ? setIndex(champions.length - 1) : setIndex(index - 1);
  }

  let campeon = champions[index];

  // Mover las fotos con teclas izquierda y derecha: 
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrevious();
    };
  
    window.addEventListener('keydown', handleKeyPress); // Evento el navegador que queda a la escucha de presionar teclas.
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [index]);

  return (
    <div>
      <div className='campeon-container'>
        <img className='champions' src={campeon.src} 
            width={campeon.width} 
            height={campeon.height}
            alt={campeon.alt}
        />
        <span>{campeon.id} {campeon.nombre}</span>
      </div>
      <div className='gallery-btns'>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={handlePrevious} width="38" height="34" viewBox="0 0 24 24" fill="green" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="previousArrow"><path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={handleNext} width="38" height="34" viewBox="0 0 24 24" fill="green" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="nextArrow"><path d="M6 9h6V5l7 7-7 7v-4H6V9z"/></svg>
      </div>
    </div>
      )
}

export default Campeones


