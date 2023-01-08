import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../api/Http"

const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      alert('password do not match')
    } else {
        instance.post("/CreateUser",
        {userName: name, email: email, password: password},{withCredentials: true,})
      .then(response => {
        if (response.status != 201)
          throw response.data

          alert(response.statusText)
          navigate('/')
      })
      .catch(err => {
          console.error(err)
          alert("Error user: " + err.response.data)
      })

    }
 }
   


  return (
    <div>
       <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
             type="text" 
             placeholder="Name" 
             name="name"
             value={name}
             onChange={e => onChange(e)} 
             required 
             />
        </div>
        <div className="form-group">
          <input 
             type="email" 
             placeholder="Email Address"
             name="email" 
             value={email}
             onChange={e => onChange(e)}
             />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/'>Sign In</Link>
      </p>
    </div>
  )
}

export default  Register;
