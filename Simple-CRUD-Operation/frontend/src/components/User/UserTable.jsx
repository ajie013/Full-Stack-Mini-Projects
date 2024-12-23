import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import '../User/styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser';

import ViewUser from './viewUser';
import { data } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DataTable  from 'react-data-table-component'
import popUpMessageToast from '../../utils/PopUpMessage'



function UserTable() {
 
 
    const [users, setUsers] = useState();
  
    const loaderRef = useRef(null);
    const {data, isLoading} = useFetch('http://localhost:8080/users')
    const [viewUser ,setViewUser] = useState(null);
    const [toggler, setToggler] = useState({
        togglerCreate: false,
        togglerRead: false,
        togglerUpdate: false,
       
    });


    useEffect(() =>{     
      
      setUsers(data)
      
     
    },[data]);
    

    const refreshUsers = () => {
      axios.get('http://localhost:8080/users')
          .then(response => {
              setUsers(response.data);
          })
          .catch(error => {
              console.error("There was an error fetching the users!", error);
          });
    };

    const ShowCreateModal = () =>{
     
        setToggler(t => ({...t, togglerCreate: !t.togglerCreate}))       
    }

    const ShowViewModal = (id) =>{
     
      setToggler(t => ({...t, togglerRead: !t.togglerRead}));
      setViewUser(id);
    }
    const ShowUpdateModal = (id) =>{
     
      setToggler(t => ({...t, togglerUpdate: !t.togglerUpdate}));
      setViewUser(id);
    }

    const DeleteUser = (e,id) =>{
      e.preventDefault();

     
      axios.delete(`http://localhost:8080/delete_user/${id}`)
      .then((res) =>{
        console.log(res);
        refreshUsers();
        popUpMessageToast("success", "User Deleted", 230);
      
      })
      .catch(err => {
        console.log(err)
      })
  }
  const columns = [
    {
        name: 'ID',
        selector: row => row.user_id,
        sortable: true,
         id: "id",
      
    },
    {
        name: 'First Name',
        selector: row => row.first_name,
        sortable: true,
        id: "firstname",
    },
    {
        name: 'Last Name',
        selector: row => row.last_name,
        sortable: true,
        
        id: "lastname",
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        id: "email",
    },
    {
        name: 'Actions',
        id: "buttons",
        cell: row => (
            <div className='action-buttons-wrapper'>
                <button className='btn btn-dark' onClick={() => ShowViewModal(row.user_id)}>Read</button>
                <button className='btn btn-primary' onClick={() => ShowUpdateModal(row.user_id)}>Update</button>
                <button className='btn btn-danger' onClick={(e) => DeleteUser (e, row.user_id)}>Delete</button>
            </div>
        ),
    },
];
    

    return (
      <>

      {toggler.togglerUpdate ?  <UpdateUser setToggler={setToggler} refreshUsers={refreshUsers}  id={viewUser} /> : " "} 
      {toggler.togglerCreate ?  <CreateUser setToggler={setToggler} refreshUsers={refreshUsers}/> : " "} 
      {toggler.togglerRead ?  <ViewUser id={viewUser} setToggler={setToggler}/> : " "} 
      <div className='table-user-wrapper'>
        <h1>User List</h1>
          <button className='btn btn-success btn-create-user' onClick={ShowCreateModal}>
              <span>Create</span>
              <i className="fa-solid fa-plus" style={{color: "white"}}></i>
          </button>
          {isLoading ? <span className="loader" ></span> : 
                           
              <DataTable
                  className='table-users'
                  columns={columns}
                  data={users}
                  pagination
                  highlightOnHover
                  striped               
              />                
          }
      </div>
   
      
      </>
    )
}

export default UserTable
