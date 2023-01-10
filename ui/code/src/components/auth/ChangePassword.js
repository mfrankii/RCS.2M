import React from 'react'
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import instance from "../../api/Http"

const ChangePassword = props => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const forgot = location?.state?.isForgot;

  const onSubmit = async e => {
    e.preventDefault();
    if (newPassword == ""){
      alert("Required field!")
      return;
    }
      
    if (forgot) { // CASE 1 : Change Forgot Password
      instance.put(`/ChangeForgotPassword?token=${token}&email=${email}&new_password=${newPassword}`,{withCredentials: true})
        .then(res => {
          if (res.status != 202)
            throw res.data

          alert(res.data);
          navigate('/');
        })
        .catch(err => {
            console.error(err)
            alert("Error: " + err.response.data)
        })
    }
    else {  // CASE 2 : Change Password 
      if (newPassword =! confirmPassword){
        alert("The passwords are not equal!")
        return;
      }

      if (oldPassword == "") {
        alert("Required field!")
        return;
      }

      if (newPassword =! oldPassword){
        alert("Must be different password!")
        return;
      }



      instance.put(`/ChangePassword?email=${email}&new_password=${newPassword}&old_password=${oldPassword}`,{withCredentials: true})
        .then(res => {
          if (res.status != 202)
            throw res.data

          alert(res.data);
          navigate('/');
        })
        .catch(err => {
            console.error(err)
            alert("Error: " + err.response.data)
        })
    }


 }

  console.log('email', email)
  return (email &&
    <div>
              <h1 className="large text-primary">Change Password</h1>
              <form className="form" onSubmit={e => onSubmit(e)}>
              {!forgot && <div className="form-group">
                  <input 
                      type="password" 
                      placeholder="Old Password"
                      name="oldPassword" 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      />
              </div>}
              {
                forgot && 
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Token"
                    name="token" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    />
                </div>
              }
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="New password"
                  name="newPassword"
                  minLength="10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <input
                  type="password"
                  placeholder="Confirm password"
                  name="ConfirmPassword"
                  minLength="10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Change Password" />
              </form>
     </div>
  )
}

export default ChangePassword;