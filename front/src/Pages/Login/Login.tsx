import './Login.css';
import App from '../../App';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { FormData } from '../../types/interfaces';

function Login() {
  const [sesion, setSesion] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate(); 
  const toSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token guardado en localStorage:', localStorage.getItem('token'));
    if (token) {
      setSesion(true);
    }
  }, []);

  const handleSignIn = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(formData)
    })

    if (response.ok) {      
      const data = await response.json();     
      localStorage.setItem('token', data.token); // Almacena el token en el localStorage
      localStorage.setItem('profile', data.profile); // Almacena el 'profile' en el localStorage

      if (data.profile === 'admin') {
        setIsAdmin(true);
        setTimeout(() => {
          navigate('/users', { replace: true }); // Se impide que el usuario vuelva hacia atrás con el botón del navegador.
        }, 1500);                                // Si lo intenta, se redirige a la página principal de la aplicación (home) y no a la página de inicio de sesión.
      } else {
        setTimeout(() => {
          navigate('/', { replace : true }); 
        }, 1500);
      }
    }
    }catch (error: string | any) {
      console.error(error.message);
    }
  }
  
  return (
    <App>
        <form className="formLayout" onSubmit={handleSubmit(handleSignIn)}>
            <h4 className="formTitle">Iniciar sesión:</h4>

            <input type="email" {...register('email')}  className = 'loginInput' placeholder='Email'/>
            <input type="password" {...register('password', { required: true } )} className = 'loginInput' placeholder='Contraseña'/> 
            {!errors && <span>Uno o más datos ingresados son incorrectos.</span>}
            {isAdmin && <h4 className='thanksMsg'>¡Hola administrador/a!</h4>}

            <div className="formButtonContainer">
              <button type="submit" className="btn btn-success py-2">ACCEDER</button>
            </div>
            {/* Como REGISTRO es true, se muestra el mensaje de confirmación */}
            {!sesion && <h4 className='thanksMsg'>¡Bienvenido/a!</h4>} 
            <div>
            <button className="btn btn-primary py-2" onClick={toSignUp}>REGISTRARSE (GRATIS)</button>
        </div>
        </form>

    </App>
  )
}

export default Login
