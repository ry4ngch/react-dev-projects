import React, {useState} from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([])

  const addUserHandler = (user) => {
    setUsersList((prevState) => (
      [...prevState, user]
    ))
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      {usersList.length === 0 && <p style={{color: '#fff', textAlign: 'center' }}>No Users Yet!, Start by Input and Adding the new user</p>}
      {usersList.length > 0 && <UsersList users={usersList}/>}
    </div>
  );
}

export default App;
