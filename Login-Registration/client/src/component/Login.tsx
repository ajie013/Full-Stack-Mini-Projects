import React, { ChangeEvent, FormEvent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Login.css'
import { useState } from "react";
import axios from "axios";
import { popUpMessage } from "../utils/popUpMessage";

interface Credential{
    username : string
    password: string
}

const Login:React.FC = () =>{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [credentials, setCredentials] = useState<Credential>({
        username: '',
        password: ''
    })

    const SubmitLogin = async (event: FormEvent<HTMLFormElement>)   =>{
        event.preventDefault();
       
        if(!credentials.password || !credentials.username ){
            popUpMessage('Cannot be empty', 'error');
            return;
        }
        setIsLoading(true)
        setTimeout(() => {
            axios.post('http://localhost:8080/login', credentials)
            .then((res) =>{
                console.log(res)
                setIsLoading(false)
                return popUpMessage("Logged In Successfully", "success")
            })
            .catch((err) =>{
                setIsLoading(false)
                popUpMessage(err.response.data.error, "error")
                         
            })
        }, 1000);
        
       
    }

    const UsernameChange = (e:ChangeEvent<HTMLInputElement>) : void =>{
        setCredentials(prev => ({...prev, username: e.target.value}))
    }

    const PasswordChange = (e:ChangeEvent<HTMLInputElement>) : void =>{
        setCredentials(prev => ({...prev, password: e.target.value}))
    }


    return(
        <>
            <div className="login-bg">
                <div className="login-wrapper">
                    <h2 className="login-header">Login</h2>
                    <form action="" onSubmit={SubmitLogin}>
                        <label htmlFor="">Username</label><br />
                        <input type="text" value={credentials.username} placeholder="Enter Username" onChange={UsernameChange}/><br />
                        <label htmlFor="">Password</label><br />
                        <input type="password" value={credentials.password} placeholder="Enter Password" onChange={PasswordChange}/><br />
                        <div className="forgot-pass-wrapper"><a href="#" style={{color: "#00ADB5"}}><i >Forgot Password?</i></a></div>
                        <button className="btn btn-success submit-login-btn" disabled={isLoading}>
                        {isLoading ?  <span className="loader-login"></span>
                            : "Login"}
                        </button>
                    </form>
                    <div className="sign-up">No account? <i><a href="/registration" style={{color: "#00ADB5"}}>Register</a></i></div>
                </div>
            </div>
        </>
    )
}

export default Login