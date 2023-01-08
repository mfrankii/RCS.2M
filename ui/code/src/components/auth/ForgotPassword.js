import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';
import instance from "../../api/Http"

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    instance.get(`/auth/sendMail?email=${email}`,{withCredentials: true})
    .then(res => {
        if (res.status != 202)
          throw res.data
        navigate('/change', { state: { email: email, isForgot: true }, replace:true });
    })
    .catch(err => {
        console.error(err)
        alert("Error:" + err.response.data)
    })
 }
   


  return (
    <div>
        {
           <div>
              <h1 className="large text-primary">Reset Password</h1>
              <p className="lead"><i class="fas fa-user"></i> we will sent password to your email</p>
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
                <input type="submit" className="btn btn-primary" value="Send" />
              </form>
          </div>
          }
    </div>
    
    
  )
}

export default ForgotPassword;