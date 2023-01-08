import React from 'react'
import ClientsList from './ClientsList';
import { useState } from 'react';
import instance from "../../api/Http"


const Profile = (props) => {


  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    instance.post("CreateConsumer",
      {name: clientName, phone: clientPhone, email: clientEmail, isActive: true })
      .then(result => {
        if (result.status != 201)
          throw result.data
        
        setClientName('');
        setClientEmail('');
        setClientEmail('');

        alert(result.statusText)

        window.location.reload()
      })
      .catch(err => {
          console.error(err)
          alert("Error user:" + err)
      })
 }


  return (
    <div>
        <h1 className="large text-primary">Hello {props.Username}</h1>
        <p className="lead">Add New Client</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                  <input 
                      type="text" 
                      placeholder="Client Name"
                      name="name" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      />
              </div>
              <div className="form-group">
                  <input
                  type="email"
                  placeholder="Client Email"
                  name="email"
                  value={clientEmail}
                  onChange={(e) =>  setClientEmail(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <input
                  type="text"
                  placeholder="Client Phone"
                  name="Phone"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  />
              </div>
              <input type="submit" className="btn btn-primary" value="Add Client" />
              </form>
        <ClientsList />
    </div>
  )
}

export default Profile;