import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  style  from './Register.module.css'

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [userError, setuserError] = useState([]);
    let navigate = useNavigate();
    let [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        age: 0
    });
    function getUserData(e) {
        let newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
        // console.log(newUser)
    }

    function validateUserData(user) {
        let schema = Joi.object({
            first_name: Joi.string().alphanum().required().min(2).max(30),
            last_name: Joi.string().required().alphanum().min(2).max(30),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
            password: Joi.string().pattern(/^[A-Z][a-z]{3,5}$/),
            age: Joi.number().min(16).max(30)
        })
        // return schema.validate(user, { abortEarly: false })
        return schema.validate(user)

    }

    async function Register(e) {
        e.preventDefault();
        setIsLoading(true);
        let validationRes = validateUserData(user);
        console.log(validationRes)
        if (validationRes.error) {
            setuserError(validationRes.error.details);

        } else {
            let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signUp", user);
            console.log(data)
            if (data.message === "success") {
                setIsLoading(false);
                navigate('/login')
            }
            else {
                setError(data.message)
                setIsLoading(false);
            }
        }

    }



    return (
        <>
            <form >
                {userError.map((err, index) => <div className="alert alert-danger" key={index}>{err.message}</div>)}
                {error ? <div className="alert alert-danger">{error}</div> : ""}
                <div>
                    <h2 className='py-3'>
                        Registeration form
                    </h2>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="text" onChange={(e) => { getUserData(e) }} className="form-control" id="first_name" name="first_name" placeholder="Farah" />
                    <label htmlFor="first_name" className={style.inputLabel}>FirstName</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" onChange={(e) => { getUserData(e) }} className="form-control" id="last_name" name="last_name" placeholder="Samir" />
                    <label htmlFor="last_name" className={style.inputLabel}>LastName</label>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="email" onChange={(e) => { getUserData(e) }} className="form-control" id="email" name="email" placeholder="name@example.com" />
                    <label htmlFor="email" className={style.inputLabel}>E-mail</label>
                </div>

                <div className="form-floating mb-3 ">
                    <input type="password" onChange={(e) => { getUserData(e) }} className="form-control" id="password" name='password' placeholder="Password" />
                    <label htmlFor="password" className={style.inputLabel}>Password</label>
                </div>
                <div className="form-floating mb-3 ">
                    <input type="number" onChange={(e) => { getUserData(e) }} className="form-control" id="age" name="age" placeholder="21" />
                    <label htmlFor="age" className={style.inputLabel}>Age</label>
                </div>
                <button className='btn btn-lg btn-info text-white d-flex ms-auto' onClick={Register}>Register </button>
                {/* {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Registered"} */}
            </form>

        </>
    )
}
