//import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import { toast } from 'react-toastify'
import consts from '../consts'

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(response => {
                dispatch([
                    { type: 'USER_FETCHED', payload: response.data },
                ])
                toast.success('Login feito com sucesso!')
            })
            .catch(e => {
                toast.error(`${e.response.data.errors}`)
            })
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
                .then(response => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: response.data.valid })
                })
                .catch(e => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: false })
                })
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}