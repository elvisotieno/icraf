import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useContext } from 'react/cjs/react.development';
import AuthContext from '../Context/AuthContext';

const Home = () => {
    let { users, handleDelete } = useContext(AuthContext)
    const { id } = useParams();
    const user = users.find(post => (post.id).toString() === id);
    return (
        <div>
            <main className="PostPage">
            <article className="post">
                {user &&
                    <>
                        <h2>{user.email}</h2>                        
                        <p className="postBody">{user.username}</p>
                        <Link to={`/edit/${user.id}`}><button className="editButton">Edit User</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(user.id)}>
                            Delete User
                        </button>
                    </>
                }
                {!user &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>That's disappointing, create new user </p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
        </div>
    )
}

export default Home