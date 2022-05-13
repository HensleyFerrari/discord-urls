import React, { useEffect } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigate } from 'react-router'
import { validateToken } from '../auth/authActions'
import { toast } from 'react-toastify'

function AuthOrApp({ auth, validateToken, component }) {

    useEffect(() => {
        if (auth.user) {
            validateToken(auth.user.token)
        }
    }, [])

    const { user, validToken } = auth

    if (user && validToken) {
        axios.defaults.headers.common['Authorization'] = user.token
        return component
    } else if (!user && !validToken) {
        toast.error('Token inválido ou expirado, faça login novamente')
        return <Navigate to="/" />
    } else {
        return false
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)