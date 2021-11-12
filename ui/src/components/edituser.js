import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from 'react/cjs/react.development';
import AuthContext from '../Context/AuthContext';

const EditUser = () => { 
    let {handleEdit, editName, setEditName, editEmail, setEditEmail, users} = useContext(AuthContext);
    const { id } = useParams();  
    const user = users.find(user => (user.id).toString() === id);
    useEffect(() => {
        if (user) {
            setEditEmail(user.email);
            setEditName(user.username);
        }
    }, [user, setEditEmail, setEditName])

    return (
        <div>
            {editEmail &&
            <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required
                    value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                {/*<ErrorMessage name='email'>
                    {error => <div className='error'>{error}</div>}
                </ErrorMessage>*/}
                </div>

                <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required
                    value={editName} onChange={(e) => setEditName(e.target.value)}/>
               {/* <ErrorMessage name='name' component={TextError} />*/}
                </div>

            <button
              type='submit'
              //disabled={!formik.isValid || formik.isSubmitting}
              onClick={() => handleEdit(user.id)}
            >
              Create Role
            </button>

            </form>
            
            </>
            }
            {!editEmail &&
                <>
                    <h2>Email Not Found</h2>
                    <p>Well, you can create the user</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                   
                </>
            }
        </div>
    )
}

export default EditUser