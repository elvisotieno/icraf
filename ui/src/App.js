import './App.css';
import PriateRoute from './utils/Privateroute';
import { AuthProvider } from './Context/AuthContext';
import EditUser from './components/edituser';
import Home from './components/home';
import NewUser from './components/newuser';
import UserPage from './components/userpage';
import { useState} from 'react';
import { BrowserRouter as Router, useHistory, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Landingpage from './components/Landingpage';
import Header from './components/Header';

function App() {
      
  const [users, setUsers] = useState([])
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  const history = useHistory();

  
  
  
  const handleEdit = async (id) => {    
    const updatedUser ={ username: editName, email: editEmail};
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/user-detail/${id}/`, updatedUser);
      setUsers(users.map(user => user.id === id ? { ...response.data } : user));
      setEditEmail('');
      setEditName('');
      history.push('/');      
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user-detail/${id}/`);
      const userList = users.filter(user => user.id !== id);
      setUsers(userList);
      history.push('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

 
  return (
    <Router>
    <div className="App">  
    <AuthProvider>
      <Header /> 
      
       <Switch>  
       <Route path="/user/:id">     
          <Home  users={users} handleDelete={handleDelete}/>
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>

        <Route exact path="/register">        
            <NewUser />
         </Route>   

        <Route path="/edit/:id">
        <EditUser editEmail={editEmail} setEditEmail={setEditEmail}
        editName={editName} setEditName={setEditName} 
        handleEdit={handleEdit} users={users}/>
        </Route>       

        <PriateRoute component={Landingpage} path="/" exact/>
          <Route component={Login} path="/login"/>
          
        
        </Switch>
      </AuthProvider>
    </div>
    </Router>
    );
}

export default App;
