import './Footer.css'
import { FooterProps } from '../../types/interfaces'

export default function Footer( { title, link1, img1, parentMethod }: FooterProps ) {
    return (
        <footer className="foot">
          <div className='footer-info'>
            <p>{title}</p>
          </div>
          <div className='footer-links'>
            <button className='contact' onClick={parentMethod}>Contacto</button>
          </div>
          <div className='footer-icons'>
            <a href={link1}>{img1}</a> 
          </div>
        </footer>
    )
}