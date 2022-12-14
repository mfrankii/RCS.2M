import React from 'react'

const ClientItem = ({name,email,packageNum,id}) => {
  return (
    <div>
        <h1>Name: {name}</h1>
        <h1>Email: {email}</h1>
        <h1>Internet package: {packageNum}</h1>
        
    </div>
  )
}

export default ClientItem;