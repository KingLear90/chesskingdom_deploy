import { useEffect, useState } from 'react'
import { getAuthHeaders } from '../../utils/getAuthHeaders'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../types/interfaces';

function GetUsers() {
  const [users, setUsers] = useState<User[]>([]);

  try {
    useEffect(() => {
      const fetchUsers = async () => {
        const response = await fetch('http://localhost:3001/api/user/get', {
          method: 'GET',
          headers: getAuthHeaders()
        })
        const data = await response.json()
        setUsers(data)
        console.log(data)
      }
      fetchUsers()
    }, [])
  } catch (error) {
    console.log(error)
  }

  const removeUser = async (id: string, userProfile: string) => {
    if (userProfile === 'admin') {
      alert('No puedes borrar a un administrador')
      return
    }
    if (confirm('¿Eliminar usuario?')) {
    try {
      const response = await fetch(`http://localhost:3001/api/user/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      if (response.ok) {
        setUsers(users.filter((user: User) => user._id !== id))
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

  return (
    <div className="users-container">
      <div>
        <h3>Hola admin!</h3>
      </div>
      <section className="users-section" style={{ marginTop: '30px' }}>
        <h4>Esta es la lista de usuarios actuales:</h4>
      </section>
      <div className="users-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {users.map((user: User) => (
          <div key={user._id} className="user-card">
            <h5>{user.name}</h5>
            <p>{user.email}</p>
            <p>{user.profile}</p>
            <IconButton aria-label="delete" onClick={() => removeUser(user._id, user.profile)}>
                <DeleteIcon />  
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GetUsers
