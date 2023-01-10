import React from 'react'

const ClientItem = ({name,email,phone,isActive}) => {
  return (
    <div className='card'>
        <h1>Name: <span>{name}</span></h1>
        <h1>Email: {email}</h1>
        <h1>Phone: {phone}</h1>
        <h1>Active: {isActive}</h1>
    </div>
  )
}

export default ClientItem;