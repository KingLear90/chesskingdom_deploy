import { useState, useEffect } from 'react';
import { User } from '../../types/interfaces';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

export const useFetchUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const initialUrl = import.meta.env.VITE_API_URL
  
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${initialUrl}user/get`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    return { users, loading, error, fetchUsers };
};