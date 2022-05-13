import React, { useState } from 'react'
//import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'

function Auth(props) {
    const [loginMode, setLoginMode] = useState(true)
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm_password: '' })

    const changeMode = () => {
        setLoginMode(!loginMode)
    }

    const onSubmit = (values) => {
        values.preventDefault()
        const { login, signup } = props

        if (loginMode) {
            const loginForm = {email : form.email, password : form.password}
            login(loginForm)
        } else {
            signup(form)
        }        
    }

    const changeForm = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    return (
        <div className='flex bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen'>
            {/* <form onSubmit={ handleSubmit (v => onSubmit(v))}> */}
            <div className='flex flex-col justify-center m-auto bg-white w-72 rounded-lg p-10'>
                <form className='flex flex-col gap-5 w-52 self-center' onSubmit={onSubmit}>
                    <input className={loginMode ? 'hidden' : ''} name="name" type="input" placeholder="Nome" onChange={changeForm} />
                    <input name="email" type="email" placeholder="E-mail" onChange={changeForm} />
                    <input name="password" type="password" placeholder="Senha" onChange={changeForm} />
                    <input className={loginMode ? 'hidden' : ''} name="confirm_password" type="password" placeholder="Confirmar Senha" onChange={changeForm} />
                    <button type='submit' className='px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl'>{loginMode ? 'Entrar' : 'Registrar'}</button>
                </form>
                <button onClick={() => changeMode()}>
                    {loginMode ? 'Não possui usuário? Registre-se!' : 'Já possui usuário? Entre!'}
                </button>
            </div>
        </div>
    )
}

// Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)