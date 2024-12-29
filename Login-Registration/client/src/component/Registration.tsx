import React, { ChangeEvent, FormEvent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/registration.css'
import { useState } from "react";
import axios from "axios";
import { popUpMessage } from "../utils/popUpMessage";

interface RegistrationType{
    firstname : string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    confirmpassword: string
}

const Registration: React.FC = ()  =>{
    const [isLoading, setIsLoading] = useState(false)
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationType>({
        firstname : '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        confirmpassword: ''
    }) 

    const FirstNameChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, firstname: e.target.value}));
    }
    const LastNameChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, lastname: e.target.value}));
    }
    const EmailChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, email: e.target.value}));
    }
    const UsernameChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, username: e.target.value}));
    }
    const PasswordChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, password: e.target.value}));
    }
    const ConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setRegistrationInfo(prev => ({...prev, confirmpassword: e.target.value}));
    }

    const SubmitRegister = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(registrationInfo.password !== registrationInfo.confirmpassword) return popUpMessage('Password does not match', 'error')
        setIsLoading(true)

        setTimeout(() => {
            axios.post('http://localhost:8080/register', registrationInfo)
            .then((res) =>{
                console.log(res)
                setIsLoading(false)
                popUpMessage("Successfully Registered", "success")
                setRegistrationInfo({ 
                    firstname: '',
                    lastname: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmpassword: ''
                })
            })
            .catch((error) =>{
                popUpMessage(error.response.data.error, 'error')
                console.log(error)
                setIsLoading(false)
                setRegistrationInfo({ 
                    firstname: '',
                    lastname: '',
                    email: '',
                    username: '',
                    password: '',
                    confirmpassword: ''
                })
            });
        }, 1000); 
    };

    return(
        <>
             <div className="registration-bg">
                <div className="registration-wrapper">
                    <h2 className="registration-header">Register</h2>
                    <form action="" onSubmit={SubmitRegister} >
                        <label htmlFor="">First Name</label><br />
                        <input type="text" placeholder="Enter First Name" value={registrationInfo.firstname} onChange={FirstNameChange} required/><br />
                        <label htmlFor="">Last Name</label><br />
                        <input type="text" placeholder="Enter Last Name" value={registrationInfo.lastname} onChange={LastNameChange} required/><br />
                        <label htmlFor="">Email</label><br />
                        <input type="email" placeholder="Enter Email" value={registrationInfo.email} onChange={EmailChange} required/><br />
                        <label htmlFor="">Username</label> 
                        <input type="text" placeholder="Enter Username" value={registrationInfo.username} onChange={UsernameChange} required/><br />
                        <label htmlFor="">Password</label> 
                        <input type="password" placeholder="Enter Password" value={registrationInfo.password} onChange={PasswordChange} required/><br />
                        <label htmlFor="">Confirm Password</label> 
                        <input type="password" placeholder="Confirm Password" value={registrationInfo.confirmpassword} onChange={ConfirmPasswordChange} required/><br/>
                                       
                        <button className="btn btn-success submit-registration-btn" disabled={isLoading}>
                        {isLoading ?  <span className="loader-register"></span>
                            : "Register"}
                        </button>
                    </form>
                    <div className="sign-in">Already have an account? <i><a href="/"  style={{color: "#00ADB5"}}>Log in</a></i></div>
                </div>
            </div>
        </>
    )
}

export default Registration