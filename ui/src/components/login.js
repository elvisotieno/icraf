import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'


const Login = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser}>
                <div className='form-control'>                
                    <input type='email' name='username' placeholder="Enter Username" />                
                </div>

                <div className='form-control'>                
                <input type='password' name='password' placeholder="Enter Password" />               
                </div>

                <input type="submit"/>

            </form>
        </div>
    )
}

export default Login