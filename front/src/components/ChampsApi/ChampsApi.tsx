import './Gallery.css';
import { useState, useEffect } from 'react';
import { Champion } from '../../types/interfaces';

function ChampsApi () {
    const [champions, setChammpions] = useState<Champion[]>([]); // Almacenará en un array la información devuelta por la API.
    const [showChampions, setShowChampions] = useState(false);  // Controlará si se muestra o no la info devuelta por la API.
    const [error, setError] = useState<string | null>(null);
    const infoBtn = document.querySelector('.info-btn')  // Se apunta al botón con clase 'info-btn'.
    const [startingIndex, setStartingIndex] = useState(0);  // Índice inicial para mostrar los campeones.
    const [endingIndex, setEndingIndex] = useState(3);  // Índice final para mostrar los campeones.
    const championsArr = champions.slice(startingIndex, endingIndex);  // Array con los campeones a mostrar.
    
    useEffect(() => {   // Conexión con la API
        const fetchData = async () => {
            try {
                const response = await fetch('https://66fddf1a6993693089566ad0.mockapi.io/api/CK/players');
                const jsonData = await response.json();
                setChammpions(jsonData);
            } catch (error) {
                setError('No se pudo cargar la información.' + error)
                } 
            };
        fetchData();
        }, []);
        
    const handleClickGallery = () => {
        setShowChampions(!showChampions);
        if (infoBtn) {
            if (showChampions) {
                infoBtn.textContent = 'VER INFO';
            } else {
                infoBtn.textContent = 'OCULTAR INFO';
                setStartingIndex(0);
                setEndingIndex(3);
            }
        } 
      }

    const handleMoreInfo = () => {
      champions
      setStartingIndex(prev => prev + 3); // Se incrementa el índice inicial en 3.
      setEndingIndex(prev => prev + 3); // Se incrementa el índice final en 3.
      if (endingIndex === champions.length) {
        setStartingIndex(0); // Para reiniciar el índice a 0 una vez llegado al final.
        setEndingIndex(3); // Idem, pero con índice final
      } 
    }
    
  return (
    <div>
      <h5 id="getInfo">Para conocer información de los campeones...</h5>
      <button className='info-btn' onClick={handleClickGallery}>VER INFO</button>
      {showChampions && (
        <div>
          {championsArr.map((champion) => (   // Mapeo del array que contiene la info devuelta por API
            <div className='champions-Info' key={champion.id}>
              {` ${champion.numChampion}: ${champion.firstName} ${champion.lastName}. ${champion.description}. Campeón durante: ${champion.worldChampion}.`}
            </div>
          ))}
        <button id='more-btn' className='info-btn' onClick={handleMoreInfo}>Mostrar más</button>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default ChampsApi;


