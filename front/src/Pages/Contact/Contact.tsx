import App from '../../App';
import './Contact.css';
import { useState } from 'react';


// El formulario aún no tiene validación alguna de datos, pero visualmente simula que ciertos campos son obligatorios. 
function Contact() {

  const [thanks, setThanks] = useState(false) // Planteo variable de estado de tipo booleana para mostrar mensaje al recibir form.

  const handleSubmit = (event: any) => {
    event.preventDefault();           // Previniendo la recarga automática de la página al hacer submit.
    setThanks(true);                 // Cambia thanks de false a true, para permitir mensaje (VER FINAL DEL FORM)
    setTimeout(() => {
      setThanks(false);
    }, 2000);                        // El mensaje dura 2 segundos y desaparece. 
  }

  
  return (
    <App>
        <form id="contact" className="contact-container"  onSubmit={handleSubmit}>
            <h4 className="contactTitle">¡CONTACTANOS!</h4>

            <div className='alert'>
              <span >Todos los campos son obligatorios.</span>
            </div>
            
            <label htmlFor="firstName">Nombre</label>
            <input type="text" name="firstName" className="contact-input"/>

            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" className="contact-input" />

            <label htmlFor="contact" className='select'>¿Cómo preferís ser contactado/a?</label>  
            <select className="form-select" name="contact">
                      <option selected>Selecciona una opción</option>
                      <option value="1">Por mail.</option>
                      <option value="2">No quiero que me contacten, sólo quería hacer un comentario. </option>
            </select>   

            <label htmlFor="message">Tu mensaje/comentario</label>
            <textarea name="message" className='contact-textarea' id="message" rows={8} maxLength={250} placeholder="Escriba su mensaje..."/> 

            <div className="contact-buttons">
              <button type="submit" className="btn btn-primary py-2">Enviar</button>
              <button type="reset" className="btn btn-danger py-2">Borrar</button>
            </div> 
        </form>
         {/* Como thanks es true, se muestra el mensaje de agradecimiento */}
         {thanks && <h4 className='thanksMsg'>¡Gracias por contactarnos!</h4>} 
    </App>
  )
}

export default Contact
