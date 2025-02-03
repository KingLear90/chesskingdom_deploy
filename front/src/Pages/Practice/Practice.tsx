import React, { Suspense } from 'react';
import App from '../../App'
const MatePractice = React.lazy(() => import('../../components/Training/MatePractice'));

function Practice() {
  return (
    <App>
        <div>
          <Suspense fallback={<div>Cargando...</div>}>
            <MatePractice />
          </Suspense>
        </div>
    </App>
  )
}

export default Practice
