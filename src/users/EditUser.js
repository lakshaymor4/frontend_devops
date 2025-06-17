import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {

    let navigate = useNavigate();
    const {id} = useParams();

    const [user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });

    const {name, username, email} = user;

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const loadUserData = async () => {
        const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`);
        setUser(response.data);
    }

    const onSubmit= async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/api/v1/users/${id}`, user);
        navigate("/");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit User</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your name'
                            value={name}
                            onChange={ (e) => onInputChange(e) }
                            name='name' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your username'
                            value={username}
                            onChange={ (e) => onInputChange(e) }
                            name='username' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Enter your email'
                            value={email}
                            onChange={ (e) => onInputChange(e) }
                            name='email' />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditUser