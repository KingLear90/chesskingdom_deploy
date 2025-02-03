import './Logo.css';
import { LogoProps } from '../../types/interfaces';

export const Logo = ({ src, alt, className } : LogoProps ) => {
    return (
        <div className='logo'>
            <img src={src} alt={alt} className={className} />
        </div>
    );
};

export default Logo;


