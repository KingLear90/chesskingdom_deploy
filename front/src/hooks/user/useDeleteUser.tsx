import { useState } from 'react';
import { getAuthHeaders } from '../../utils/getAuthHeaders';
  
export const useDeleteUser = () => {
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const initialUrl = import.meta.env.VITE_API_URL

    const deleteUser = async (id: string, userProfile: string) => {
        setIsDeleting(true);

        if (userProfile === 'admin') {
            alert('No puedes borrar a un administrador')
            return
          }

        if (confirm('¿Eliminar usuario?')) {
        try {
            const response = await fetch(`${initialUrl}user/delete/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            setIsDeleted(true);
            setTimeout(() => {
                setIsDeleting(false);
                window.location.reload();
            }, 1500);
        } catch (error) {
            setError('Error deleting user');
            setIsDeleting(false);       
        }
        };
    }

    return { deleteUser, isDeleting, isDeleted, error };
}