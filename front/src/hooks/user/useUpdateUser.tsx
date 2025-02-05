import { useState } from 'react';
import { User } from '../../types/interfaces';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

export const useUpdateUser = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const initialUrl = import.meta.env.VITE_API_URL

    const updateUser = async (id: string, userData: Partial<User>) => {
      setIsUpdating(true);
      try {
        const response = await fetch(`${initialUrl}user/update/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(userData)
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        const data = await response.json();
        setIsUpdating(false);
        return data;
      } catch (error) {
        console.error('Error updating user:', error);
        setIsUpdating(false);
        throw error;
      }
    };
  
    return { updateUser, isUpdating };
};