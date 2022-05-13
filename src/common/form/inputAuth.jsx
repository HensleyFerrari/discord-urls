import React from 'react'

function inputAuth(props) {
  return (
    <div>
        <input {...props.input} 
        readOnly={props.readOnly}
        placeholder={props.placeholder}
        type={props.type} />
        <span>Teste</span>
    </div>
  )
}

export default inputAuth