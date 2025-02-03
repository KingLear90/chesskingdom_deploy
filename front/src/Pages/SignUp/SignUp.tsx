import App from '../../App';
import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form'
import { SignUpForm } from '../../types/interfaces';

function SignUp() {
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>()

  const onSubmit = async (formData: SignUpForm) => {
    try {
      const response = await fetch('http://localhost:3001/api/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setRegistrationSuccess(true);
        setTimeout(() => {
            navigate('/signin');
          }, 2000);
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }      
  };
  
  return (
    <App>
        <form className="formLayout" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="formTitle">¡REGISTRATE GRATIS!</h4>
        <span className='alertForm'>Todos los campos son obligatorios</span>

            <input type="text" {...register('name', { required: true } )} className = 'registerInput' placeholder='Nombre'/>
            {errors.name && <span className="error">Este campo es requerido</span>}
            <input type="email" {...register('email', {required: true})}  className = 'registerInput' placeholder='Email'/>
            {errors.email && <span className="error">Email válido requerido</span>}
            <input type="password" {...register('password', { required: true } )} className = 'registerInput' placeholder='Contraseña'/> 
            {errors.password && <span className="error">La contraseña deben contener al menos 6 caractéres, incluyendo al menos una mayúscula y un número. </span>}

            <div className="formButtonContainer">
              <Button type="submit" variant="outlined" color="success" className='registerBtn'>REGISTRAR</Button>
            </div>
            {/* Como REGISTRO es true, se muestra el mensaje de confirmación */}
            {registrationSuccess && <h4 className='thanksMsg'>¡Gracias por registrarte!</h4>} 
        </form>
    </App>
  )
}

export default SignUp




