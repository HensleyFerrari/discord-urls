import React, { useEffect } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Auth from './auth/auth'
import { validateToken } from './auth/authActions'
import { Navigate } from 'react-router-dom'

function AuthOrApp({ auth, validateToken }) {

    useEffect(() => {
        if (auth.user) {
            validateToken(auth.user.token)
        }
    }, [])

    const { user, validToken } = auth

    if (user && validToken) {
        axios.defaults.headers.common['Authorization'] = user.token
        return <Navigate to='/home' />
    } else if (!user && !validToken) {
        return <Auth />
    } else {
        return false
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)