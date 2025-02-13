import React, { Suspense } from 'react';
import App from '../../App'
const ChessMemory = React.lazy(() => import('../../components/ChessMemory/ChessMemory'));
const MatePractice = React.lazy(() => import('../../components/Training/MatePractice'));

function Practice() {
  return (
    <App>
        <div>
          <Suspense fallback={<div>Cargando problemas... Un momento por favor.</div>}>
            <MatePractice />
          </Suspense>
        </div>
    </App>
  )
}

export default Practice
