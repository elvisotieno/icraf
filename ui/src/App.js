import './App.css';
import PriateRoute from './utils/Privateroute';
import { AuthProvider } from './Context/AuthContext';
import EditUser from './components/edituser';
import Home from './components/home';
import NewUser from './components/newuser';
import UserPage from './components/userpage';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, useHistory, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login';
import Landingpage from './components/Landingpage';
import Header from './components/Header';

function App() {
  const [users, setUsers] = useState([])    
  const [email, setEmail] = useState('');  
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  const history = useHistory();

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/register/');
        setUsers(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchUsers();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();    
    const newUser = { username: name, email: email, password, password2 };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', newUser);
      console.log(response)      
      setEmail('');
      setName(''); 
      setPassword('');
      setPassword2('');
      history.push('/');
           
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

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
          <UserPage users={users} />
        </Route>

        <Route exact path="/register">        
        <NewUser handleSubmit={handleSubmit}
            email={email} setEmail={setEmail}
            name={name} setName={setName}
            password={password} setPassword={setPassword} 
            password2={password2} setPassword2={setPassword2}
            />
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
