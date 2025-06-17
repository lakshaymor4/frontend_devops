import React, { useEffect, useState } from 'react'
import { userRequest } from '../helpers/axios_helper';
import { Link } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    useEffect( () => {
        loadUsers();
    }, []);

    const loadUsers = async() => {
        userRequest("GET").then( (response) => {
            if(response.status === 200) {
                setUsers(response.data);
            }
        }).catch( (error) => {
            setMessage("Data does not loading");
        })
    }

    const deleteUser = async (userId) => {
        await userRequest("DELETE", `/${userId}`);
        loadUsers();
    }

  return (
    <div className='container'>
        { message != "" ? 
        (
            <div className='row justify-content-md-center'>
                <p className='lead'>{message}</p>
            </div> 
        ): 
        (
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( (user, index) => (
                                <tr>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link className='btn btn-primary mx-2' to={`/viewuser/${user.userId}`}>View</Link>
                                        <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.userId}`}>Edit</Link>
                                        <button onClick={ () => deleteUser(user.userId) } className='btn btn-danger mx-2'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}
