import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    let navigate = useNavigate();
    let [user, setUser] = useState({
        email: "",
        password: "",
    });
    function getUserData(e) {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
        // console.log(newUser)
    }


    async function Login(e) {
        e.preventDefault();
        setIsLoading(true);

        let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", user);
        console.log(data)
        if (data.message === "success") {
            localStorage.setItem("userToken", data.token)
            props.getUserData();
            setIsLoading(false);
            navigate('/home')
        }
        else {
            setError(data.message)
            setIsLoading(false);
        }


    }

    return (
        <>
            <form >
                {error ? <div className="alert alert-danger">{error}</div> : ""}
                <div>
                    <h2 className='py-3'>Login Form</h2>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="email" onChange={(e) => { getUserData(e) }} className="form-control" id="email" name="email" placeholder="name@example.com" />
                    <label htmlFor="email">E-mail</label>
                </div>

                <div className="form-floating mb-3 ">
                    <input type="password" onChange={(e) => { getUserData(e) }} className="form-control" id="password" name='password' placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>

                <button className='btn btn-lg btn-info text-white d-flex ms-auto ' onClick={Login}>Login </button>
                {/* {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Registered"} */}
            </form>

        </>
    )
}
