import './Home.css';
import App from '../../App';
import { Logo } from '../../components';
import { Features } from '../../components';
import { features } from '../../data/Features';
import { Events } from '../../components';
import { eventOptions } from '../../data/events';
import { logo } from '../../data/Logo';


const primaryEvent = () => {
  const date = new Date();
  const targetDate = new Date("2025-02-05T00:00:00");   // Fecha de finalización del World Chess Championship 2024
  const randomEvent = () => Math.floor(Math.random() * eventOptions.length);  // Elige un evento aleatorio de la lista y lo muestra

  // Hasta que la fecha sea menor a la fecha objetivo (final del WCC 2024), se reproduce stream del WCC:
  return (
    <div className='primary-event'>
      {date < targetDate 
      ? <iframe src="https://lichess.org/embed/broadcast/tata-steel-chess-2025--masters/jR0BiOwR" className='iframeLichess' frameBorder="0"></iframe>
      : eventOptions[randomEvent()]
      }
    </div>
  )
}

function Home () {
  return (
    <App>
      <div>
          <div className='image-container'>
              {/*Extiendo las props del objeto logo a lo que el componente Logo renderiza (en este caso solo una imagen) */}
              <Logo {...logo}/> 
          </div>
          <div className='mainContain'>
              <h4 id="motto">Disfrutar y aprender en un mismo lugar <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="motto-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg></h4>
              <p className="offer">¿Qué podés encontrar en <span className="name">ChessKingdom</span>?</p>
              <Features features={features}/>
              <section className='novelties'>
                <h4 className='iframeTitle'>¡NO TE LO PIERDAS!
                <h5>¡Eventos en vivo y retransmitidos todas las semanas!</h5></h4>
              </section>
              <p> Del 18 de enero al 2 de febrero: <span className='importantTitle'>Tata Steel Chess 2025!</span></p>
              <Events event={primaryEvent()}/>
          </div>
      </div>
    </App>
  )
}
export default Home