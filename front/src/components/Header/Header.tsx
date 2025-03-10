import './Header.css'
import { HeaderProps } from '../../types/interfaces';
import DarkLightBtns from '../DarkLightBtns/DarkLightBtns';

function Header( {brandName, brandURL, navLinks }: HeaderProps ) {
    return (
        <div className='navDisposition'>
            <nav className="navbar navbar-expand-xl">
                <a href= {brandURL} className="navbar-brand mx-5">{brandName}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-3 mx-auto" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        }}>
                        { navLinks.map((link, index) => (
                            <li className="navbar-item mx-3" key={index}>   { /* Como navLinks es un array, genero una key para identificar cada li, que será el elemento único que se repite.*/}
                                <a href= {link.url} className="nav-link">{link.name}</a>
                            </li>
                        ))}
                        <DarkLightBtns />
                    </ul>
                </div>
                
            </nav>
        </div>
    )
}

export default Header;

