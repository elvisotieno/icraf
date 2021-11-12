import React, { useContext, useEffect } from 'react'
import AuthContext from '../Context/AuthContext'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../Formcontrols/Fcontrol'

const NewUser = () => {
    const dropdownOptions = [
        { key: 'Select Role', value: '' },
        { key: 'FINANCE', value: 'FINANCE' },
        { key: 'HR', value: 'HR' },
        { key: 'Marketing', value: 'Marketing' },
        { key: 'Research', value: 'Research' },
        { key: 'Engineer', value: 'Engineer'}
      ]
    
      const checkboxOptions = [
        { key: 'is_admin', value: 'is_admin' },
        { key: 'is_manager', value: 'is_manager' },
        { key: 'is_supervisor', value: 'is_supervisor' },
        { key: 'is_superuser', value: 'is_superuser' },
        { key: 'is_staff', value: 'is_staff' }
      ]

    const initialValues = {
        email: '',
        name:  '',
        password: '',
        password2: '',
        roles: '',
        permissions: [],
    }
   const validationSchema = Yup.object({
        email: Yup.string()
          .email('Invalid email format')
          .required('Required'),
         name: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        Password2: Yup.string()
          .oneOf([Yup.ref('password'), ''], 'Passwords must match')
          .required('Required'),
        roles: Yup.string().required('Required'),
        
    })
    let {name,email,password,password2,handleSubmit, setEmail,setName,setPassword,setPassword2,
        roles, setRoles, is_admin, setIsAdmin, is_manager, setIsManager, is_superuser, 
        setIsSuperuser, is_supervisor, setIsSupervisor} = useContext(AuthContext);
    const permission = (permissions)=> permissions? permissions.map(
        role =>{
          switch (role) {
            case is_superuser:
              return setIsSuperuser(true)
            case is_supervisor:
              return setIsSupervisor(true)    
            case is_manager:
              return setIsManager(true)  
            case is_admin:
              return setIsAdmin(true)   
            default:
              return false
          }
        }
      ):[]

      useEffect(()=> {
        permission()
    }, [])

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} handleSubmit={handleSubmit}>
            {
                formik =>{
                    return(
                        <Form onSubmit={handleSubmit}>
                            <FormikControl
                            control = 'input'
                            type = 'email'
                            label = 'Email'
                            name = 'email'
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            />

                            <FormikControl
                            control = 'input'
                            type = 'text'
                            label = 'Name'
                            name = 'name'
                            value={name} onChange={(e) => setName(e.target.value)}
                            />                            
                            
                            <FormikControl
                            control = 'input'
                            type = 'password'
                            label = 'password'
                            name = 'password'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            />  
                            <FormikControl
                            control = 'input'
                            type = 'password'
                            label = 'Confirm Password'
                            name = 'password2'
                            value={password2} onChange={(e) => setPassword2(e.target.value)}
                            /> 
                            <FormikControl
                            control='select'
                            label='Roles'
                            name='roles'
                            options={dropdownOptions}
                            value={roles} onChange={(e) => setRoles(e.target.value)}
                            />

                            <FormikControl
                            control='checkbox'
                            label='User Permission'
                            name='permissions'
                            options={checkboxOptions}      
                                                                      
                            />
                        <button
                        type='submit'              
                        >
                        Create User
                        </button>

                        </Form>
                    )
                }
            }

            
        </Formik>
    )
}

export default NewUser
