import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './styles/createUser.css'
import axios from 'axios';
import popUpMessageToast from '../../utils/PopUpMessage'

function CreateUser({setToggler, refreshUsers}) {

    const [countries, setCountries] = useState([]);
    let navigate = useNavigate;
    const {data, isLoading} =  useFetch('https://restcountries.com/v3.1/all'); //call the useFetch hook
    const [user, setUser] = useState({
        first_name: '',
        last_name:'',
        email: '',
        birthdate: '',
        contact_number: '',
        gender: '',
        country: ''
    });

   
    useEffect(() => {
        if (data) {
            const countryList = data.map(item => item.name.common);
            countryList.sort((a, b) => a.localeCompare(b));
            setCountries(countryList);
        }
    }, [data]); 

    const cancelCreate = () =>{
        setToggler(t => ({...t, togglerCreate: !t.togglerCreate}))
    }

    const submitCreate = (e) =>{
        e.preventDefault();

        axios.post('http://localhost:8080/add_user', user)
        .then((res) =>{
            console.log(res);
            refreshUsers();
            setToggler(t => ({...t, togglerCreate: !t.togglerCreate}));
            setUser(null);
            popUpMessageToast("success", 'New User Added',260)
          
        })
        .catch((err) =>{
            if (err.response) {
                             
                popUpMessageToast("error", err.response.data.message || 'An error occurred', 280);
            } else if (err.request) {
              
                
                popUpMessageToast("error", 'No response received from server', 340);
            } else {
               
               
                popUpMessageToast("error", err.message, 260);
            }
        })     
        
    }

    return (

        
        <>
        
        {isLoading ? <span className="loader"></span> :   <div className='create-model-wrapper'>
            <div className="create-modal">
                <h3>Create User</h3>
                <form action="" onSubmit={(e) => submitCreate(e)}>
                    <label htmlFor="">First Name</label>
                    <input type="text" name='firstname' onChange={(e) => setUser(u =>({...u, first_name: e.target.value}))} placeholder='Enter First Name' required />
                    <label htmlFor="">Last Name</label>
                    <input type="text" name='lastname' onChange={(e) => setUser(u =>({...u, last_name: e.target.value}))} placeholder='Enter Last Name' required />
                    <label htmlFor="">Birthdate</label>
                    <input type="date" name='birthdate' onChange={(e) => setUser(u =>({...u, birthdate: e.target.value}))} placeholder='Enter Email' required />
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' onChange={(e) => setUser(u =>({...u, email: e.target.value}))} placeholder='Enter Email'  required/>
                    <label htmlFor="">Contact</label>
                    <input type="text" name='contactnumber' onChange={(e) => setUser(u =>({...u, contact_number: e.target.value}))} placeholder='Enter Contact Number' required />
                    <label htmlFor="gender">Gender</label>
                    <div className='gender-container'>
                        <div>
                            <input name='gender' value="Male" onChange={(e) => setUser(u =>({...u, gender: e.target.value}))}  type="radio" />
                            <label htmlFor="">&nbsp;Male</label>
                        </div>
                    
                        <div>
                            <input name='gender' value="Female"  onChange={(e) => setUser(u =>({...u, gender: e.target.value}))}  type="radio"/>
                            <label htmlFor="">&nbsp;Female</label>
                        </div>

                        {/* <div>
                            <input name='gender' value="Other"  onChange={(e) => setUsers(u =>({...u, contact_number: e.target.value}))}  type="radio"/>
                            <label htmlFor="">&nbsp;Other</label>
                        </div> */}
                    </div>
                    <label htmlFor="">Select Country</label>
                    <select name="country" onChange={(e) => setUser(u =>({...u, country: e.target.value}))}  id='country'>
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

export default CreateUser;
