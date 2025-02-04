import './DarkLightBtns.css'
import { useEffect, useState } from 'react';

function DarkLightBtns() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('isDarkMode') === 'true';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('isDarkMode', isDarkMode.toString());
        localStorage.setItem('isLightMode', (!isDarkMode).toString());
    }, [isDarkMode]);

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    }

  return (
    <div>
        {isDarkMode && (
            <div className="dark-mode-toggle">
                <button className="btn-dark" onClick= {toggleDarkMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
            </div>
        )}
        {!isDarkMode && (
            <div className="light-mode-toggle">
                <button className="btn-light" onClick= {toggleDarkMode}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </button>
            </div>
        )}
    </div>
  )
}

export default DarkLightBtns
