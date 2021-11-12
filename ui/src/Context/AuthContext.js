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

    const [editEmail, setEditEmail] = useState('');
    const [editName, setEditName] = useState('');  


    const [email, setEmail] = useState('');  
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [roles, setRoles] = useState('');   
    const [is_admin, setIsAdmin] = useState(true);
    const [is_manager, setIsManager] = useState(true);
    const [is_supervisor, setIsSupervisor] = useState(true);
    const [is_superuser, setIsSuperuser] = useState(false); 
    
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
         
        const newUser = { username: name, email: email, password, password2, roles, is_admin,is_manager,is_superuser,is_supervisor };
        
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

      const handleEdit = async (id) => {    
        const updatedUser ={ username: editName, email: editEmail};
        try {
          const response = await axios.put(`http://127.0.0.1:8000/api/user-detail/${id}/`, updatedUser,{ headers: headers });
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
          await axios.delete(`http://127.0.0.1:8000/api/user-detail/${id}/`,{ headers: headers });
          const userList = users.filter(user => user.id !== id);
          setUsers(userList);
          history.push('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }


    let contextData ={
        user:user,
        authTokens:authTokens,

        users:users,
        name: name,
        email: email,
        roles : roles,

        editEmail:editEmail,        
        editName:editName,
        
        
        password: password,
        password2: password2,
        setRoles : setRoles,
        is_admin : is_admin,
        is_manager: is_manager,
        is_supervisor: is_supervisor,
        is_superuser: is_superuser,

        setIsAdmin: setIsAdmin,
        setIsManager: setIsManager,
        setIsSuperuser:setIsSuperuser,
        setIsSupervisor: setIsSupervisor,
        handleEdit: handleEdit,
        
        setIsAdmin:setIsAdmin,
        setEditName:setEditName,
        setEditEmail: setEditEmail,
        setName: setName,
        setEmail:setEmail,
        setPassword:setPassword,
        setPassword2:setPassword2,
        handleSubmit:handleSubmit,
        handleDelete: handleDelete,
       

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