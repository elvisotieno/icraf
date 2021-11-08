import React from 'react'

const NewUser = ({handleSubmit, email, setEmail, name, setName, password, setPassword, password2, setPassword2}) => {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required
                    value={email} onChange={(e) => setEmail(e.target.value)} />                
                </div>

                <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required
                    value={name} onChange={(e) => setName(e.target.value)}/>              
                </div>

                <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' required
                    value={password} onChange={(e) => setPassword(e.target.value)} />
              
                </div>

                <div className='form-control'>
                <label htmlFor='password'>Confirm Password</label>
                <input type='password' id='password2' name='password' 
                required
                value={password2} onChange={(e) => setPassword2(e.target.value)} />                
                </div>
            <button
              type='submit'              
            >
              Create User
            </button>

            </form>
        </div>
    )
}

export default NewUser
