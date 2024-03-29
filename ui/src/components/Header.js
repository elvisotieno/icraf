import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Menu</Link>
            <span> | </span>
            {user ? (
                 <button  onClick={logoutUser}>Logout</button>
            ): (
                <Link to="/login" >Login</Link>
            )}
           
            {user &&   <p>Hello {user.username}</p>}
        </div>
    )
}

export default Header
