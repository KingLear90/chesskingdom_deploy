import './NotFound';

function NotFound() {
  return (
    <div className='notFound'>
        <div>
            <div>
            <h4 className='notFoundMsg'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-frown"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg> Lo sentimos, es posible que la página solicitada sea inexistente.</h4>
            </div>
            <div className='logo404' style={{paddingTop:'35%', position: 'relative',}}><img src="./img/7iJR.gif" width="90%" height="95%" style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}} frame-border="0" allow-fullScreen/></div>
            {/* Se ofrece como sugerencia redirigirse a la página principal */}
            <span className='redirectMsg'>Tal vez quieras intentar: <a href="http://localhost:5173/home" id='redirect'>ChessKingdom</a></span>
        </div>
    </div>
  )
}

export default NotFound
