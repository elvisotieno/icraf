import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../Formcontrols/Fcontrol'


const Login = () => {
    const initialValues ={
        email :'',
        password : ''
    }
    const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
        password: Yup.string().required('Required')
      })

    let {loginUser} = useContext(AuthContext)
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} loginUser ={loginUser}>
            {
                formik => {
                    return(
                        <Form onSubmit={loginUser}>
                            <FormikControl
                            control ='input'
                            type = 'email'
                            label = 'Email'
                            name = 'username'
                            />
                             <FormikControl
                            control ='input'
                            type = 'password'
                            label = 'password'
                            name = 'password'
                            />
                            
                            <button type="submit">Login</button>

                        </Form>
                    )
                }
            }
            
        </Formik>
    )
}

export default Login