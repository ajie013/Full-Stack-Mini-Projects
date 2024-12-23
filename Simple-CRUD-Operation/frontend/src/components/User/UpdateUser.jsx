import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './styles/createUser.css'
import axios from 'axios';
import moment from 'moment'
import popUpMessageToast from '../../utils/PopUpMessage'


function UpdateUser({setToggler, refreshUsers, id}) {
 
    const [countries, setCountries] = useState([]);
    
    const {data, isLoading} =  useFetch('https://restcountries.com/v3.1/all'); //call the useFetch hook
    const [defaultUser, setDefaultUser] = useState({});
    const [user, setUsers] = useState({
      
    });
    
    const fetchUserByID = async () =>{
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        const  da = await response.data;

        const mydate = new Date(da[0].birthdate)
        const dateString = moment(mydate).format('YYYY-MM-DD')

        setDefaultUser({
            ...da[0], birthdate: dateString
        })
    }
   
    useEffect(() => {
        const mydate = new Date(defaultUser.birthdate)
        const dateString = moment(mydate).format('YYYY-MM-DD')
     
        setUsers({...defaultUser, birthdate: dateString })
          
    }, [defaultUser]); 
    useEffect(() => {

        fetchUserByID();
      
    }, []); 

    useEffect(() => {
      
        if (!isLoading) {
            const countryList = data.map(item => item.name.common);
            countryList.sort((a, b) => a.localeCompare(b));
            setCountries(countryList);
        }
    }, [data]); 

    const cancelCreate = () =>{
        setToggler(t => ({...t, togglerUpdate: !t.togglerUpdate}))
    }

    const objectsAreEqual = (obj1, obj2) => {
       
        return JSON.stringify(obj1) === JSON.stringify(obj2)

    };

    const submitUpdate = (e) =>{

        e.preventDefault();

        if(objectsAreEqual(defaultUser , user)) return popUpMessageToast('info', 'No changes have been made', 350)
        
   

        axios.put(`http://localhost:8080/update_user/${id}`, user)
        .then((res) =>{
            console.log(res);
          
            setToggler(t => ({...t, togglerUpdate: !t.togglerUpdate}));
            setUsers(null);
            refreshUsers();
            popUpMessageToast("success", "User Updated", 240)
        })
        .catch((err) =>{
            console.log(err)
        })
         
    }

    return (

        
        <>
        
        {isLoading ? <span className="loader"></span> :   <div className='create-model-wrapper'>
            <div className="create-modal">
                <h3>Update User</h3>
                <form action="" onSubmit={(e) => submitUpdate(e)}>
                    <label htmlFor="">First Name</label>
                    <input type="text" value={user.first_name} name='firstname' onChange={(e) => setUsers(u =>({...u, first_name: e.target.value}))} placeholder='Enter First Name' required />
                    <label htmlFor="">Last Name</label>
                    <input type="text" name='lastname' value={user.last_name} onChange={(e) => setUsers(u =>({...u, last_name: e.target.value}))} placeholder='Enter Last Name' required />
                    <label htmlFor="">Birthdate</label>
                    <input type="date" name='birthdate' value={user.birthdate} onChange={(e) => setUsers(u =>({...u, birthdate: e.target.value}))} placeholder='Enter Email' required />
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' value={user.email} onChange={(e) => setUsers(u =>({...u, email: e.target.value}))} placeholder='Enter Email'  required/>
                    <label htmlFor="">Contact</label>
                    <input type="text" name='contactnumber' value={user.contact_number} onChange={(e) => setUsers(u =>({...u, contact_number: e.target.value}))} placeholder='Enter Contact Number' required />
                    <label htmlFor="gender">Gender</label>
                    <div className='gender-container'>
                        <div>
                            <input name='gender' value="Male" checked={user.gender === 'Male'} onChange={(e) => setUsers(u =>({...u, gender: e.target.value}))}  type="radio" />
                            <label htmlFor="">&nbsp;Male</label>
                        </div>
                    
                        <div>
                            <input name='gender' value="Female" checked={user.gender === 'Female'}  onChange={(e) => setUsers(u =>({...u, gender: e.target.value}))}  type="radio"/>
                            <label htmlFor="">&nbsp;Female</label>
                        </div>

                       
                    </div>
                    <label htmlFor="">Select Country</label>
                    <select name="country" value={user.country} onChange={(e) => setUsers(u =>({...u, country: e.target.value}))}  id='country'>
                        {countries.map((item,index) =>(<option key={index} value={item}>{item}</option>))}               
                    </select>
                            
                    <div className='form-button-container'>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={cancelCreate}>Cancel</button>
                    </div>
                </form>          
            </div>
        </div>}
          
          
        </> 
    );
}

export default UpdateUser;
