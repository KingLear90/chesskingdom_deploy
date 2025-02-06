import './Users.css'
import { useState } from 'react';
import { useFetchUser } from '../../hooks/user/useFetchUser';
import { useDeleteUser } from '../../hooks/user/useDeleteUser';
import { useUpdateUser } from '../../hooks/user/useUpdateUser';
import { User } from '../../types/interfaces';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';

function UsersList() {
  const { users, fetchUsers } = useFetchUser();
  const { deleteUser } = useDeleteUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = async (id: string, profile: string) => {
    await deleteUser(id, profile);
    setTimeout(() => {
      fetchUsers();
    }, 2000);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      try {
      const updatedFields: Partial<User> = {
        name: editingUser.name,
        email: editingUser.email,
        password: editingUser.password
      };

      if (editingUser.newPassword) {
        updatedFields.password = editingUser.newPassword;
      }

      await updateUser(editingUser._id, updatedFields);
      await fetchUsers();
      setEditingUser(null);
    } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'whitesmoke',
    boxShadow: 24,
    p: 4,
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
            <IconButton aria-label="delete" onClick={() => handleDelete(user._id, user.profile)}>
                <DeleteIcon />  
            </IconButton>
            <IconButton aria-label="update" onClick={() => setEditingUser(user)}>
                <Edit />  
            </IconButton>
          </div>
        ))}
      </div>
      <Modal open={!!editingUser} onClose={() => setEditingUser(null)}>
              <Box sx={modalStyle}>
                <form onSubmit={handleUpdate}>
                  <TextField
                    fullWidth
                    label="Nombre del usuario"
                    margin="normal"
                    value={editingUser?.name || ''}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, name: e.target.value})
                      }
                    }}  
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={editingUser?.email || ''}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, email: e.target.value})
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Nueva contraseña"
                    type='password'
                    margin="normal"
                    rows={4}
                    value={editingUser?.newPassword || ''}
                    onChange={(e) => {
                      if (editingUser) {
                        setEditingUser({...editingUser, newPassword: e.target.value})
                      }
                    }}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Update user
                  </Button>
              </form>
            </Box>
          </Modal>
    </div>
  )
}
export default UsersList
