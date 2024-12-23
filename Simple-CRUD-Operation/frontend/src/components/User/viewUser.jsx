import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import './styles/viewUser.css'

function ViewUser({id, setToggler}) {
    const {data, isLoading} = useFetch(`http://localhost:8080/users/${id}`)
    const [user, setUser] = useState({
        user_id: '',
        first_name: '',
        last_name:'',
        email: '',
        birthdate: '',
        contact_number: '',
        gender: '',
        country: ''
    })

    useEffect(() =>{
        if(!isLoading){
           setUser({
            ...data[0]
           })
         
        }
    },[data])
     
    const exitModal = () =>{
        setToggler(t => ({...t, togglerRead: !t.togglerRead}))
    }
    return (        
        <>
            {isLoading ? " "  : <div className='view-user-wrapper'>
                <div className='view-user-modal'>
                    <h3>VIEW USER</h3>
                    <table className='table-user-view'>
                            <tr>
                                <th>ID</th>
                                <td>{user.user_id}</td>
                            </tr>

                            <tr>
                                <th>First Name</th>
                                <td>{user.first_name}</td>
                            </tr>

                            <tr>
                                <th>Last Name</th>
                                <td>{user.last_name}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>

                            <tr>
                                <th>Contact Number</th>
                                <td>{user.contact_number}</td>
                            </tr>

                            <tr>
                                <th>Birthdate</th>
                                <td>{user.birthdate}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>

                            <tr>
                                <th>Country</th>
                                <td>{user.country}</td>
                            </tr>

                            <tr>
                                <th>Gender</th>
                                <td>{user.gender}</td>
                            </tr>
                    </table>

                    <button type='button' className='exitModal' onClick={exitModal}>Back</button>
                </div>
            </div> }            
        </> 
    );
}

export default ViewUser;
