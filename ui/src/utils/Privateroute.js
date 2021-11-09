import { Route, Redirect } from "react-router-dom"
import { useContext } from 'react'
import AuthContext from "../Context/AuthContext"


 const PriateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    return(
        <Route {...rest}>{!user ? <Redirect to="/login" /> :   children}</Route>
    )
}
export default PriateRoute;