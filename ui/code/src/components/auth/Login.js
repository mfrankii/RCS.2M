import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../profile/Profile';
import instance from "../../api/Http"


const Login = (props) => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log("username", props.username)
  const onSubmit = async e => {
    e.preventDefault();
    instance.post("/auth/login",{email: email, password: password},{withCredentials: true,})
    .then(res => {
      if (!res.data.Status)
        throw "Invalid user!"

        props.onSetUsername();
        window.location.reload()
    })
    .catch(err => {
        console.error(err)
        alert("Error user: " + err.response.data)
    })

 }
  return (
    <div>
        {props.username && 
          <Profile Username={props.username} email={props.email} />
        }
        {!props.username && 
           <div>
              <h1 className="large text-primary">Sign In</h1>
              <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
              
              <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="email" 
                      placeholder="Email Address"
                      name="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
              </form>
              <p className="my-1">
              Dont have an account? <Link to='/register'>Sign Up</Link>
              </p>
              <p className="my-1">
              Forgot Password? <Link to='/reset'>Reset Password</Link>
              </p>
          </div>
        }
    </div>
    
    
  )
}

export default Login;