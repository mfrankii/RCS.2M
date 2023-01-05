import React from 'react'

const ClientItem = ({key,name,email,phone,isActive}) => {
  return (
    <div>
        <h1>Name: {name}</h1>
        <h1>Email: {email}</h1>
        <h1>Phone: {phone}</h1>
        <h1>Active: {isActive}</h1>
    </div>
  )
}

export default ClientItem;