import App from '../../App';
import './Learn.css';
import Cards from '../../components/Cards/Cards';
import BestMoveApi from '../../components/BestMoveApi/BestMoveApi';
import { cardsItems } from '../../data/CardsItems';

function Learn() {
  return (
    <App>
      <div className='learn-container'>
        <h5 id='learn-info'>En esta sección podrás encontrar diversas propuestas de aprendizaje para empezar o mejorar tu ajedrez.</h5>
        <div className='main-container'>
          <Cards cardsItems={cardsItems} />
          <BestMoveApi /> {/* BestMoveApi conecta con la API del chess engine Stockfish */}
        </div>
      </div>
    </App>
  )
}

export default Learn
