import './App.css';
import PriateRoute from './utils/Privateroute';
import { AuthProvider } from './Context/AuthContext';
import EditUser from './components/edituser';
import Home from './components/home';
import NewUser from './components/newuser';
import UserPage from './components/userpage';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/login';
import Landingpage from './components/Landingpage';
import Header from './components/Header';

function App() {      
   
  return (
    <Router>
    <div className="App">  
    <AuthProvider>
      <Header /> 
      
       <Switch>  
       <Route path="/user/:id">     
          <Home />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>

        <Route exact path="/register">        
            <NewUser />
         </Route>   

        <Route path="/edit/:id">
        <EditUser />
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