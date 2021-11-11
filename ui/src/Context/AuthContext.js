import { createContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const [email, setEmail] = useState('');  
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState(false);    
    
    const [users, setUsers] = useState([])
    const history = useHistory()

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': authTokens?`Bearer ${authTokens.access}`: null
      }

    let loginUser = async(e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history.push('/')
        }else{
            alert('Oops! there is an error')
        }
    }
    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();    
        const newUser = { username: name, email: email, password, password2, role, 
          permissions: e.target.permissions.value};
        
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register/',newUser,{ headers: headers });
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

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/register/',{ headers: headers });
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


    let contextData ={
        user:user,
        authTokens:authTokens,

        users:users,
        name: name,
        email: email,
        role : role,
        
        password: password,
        password2: password2,
        setRole : setRole,
        
        setName: setName,
        setEmail:setEmail,
        setPassword:setPassword,
        setPassword2:setPassword2,
        handleSubmit:handleSubmit,

        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])
    return(
        <AuthContext.Provider value={contextData}>
            {loading? null : children}
        </AuthContext.Provider>
    )
}