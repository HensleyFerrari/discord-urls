import axios from 'axios'
import consts from '../../consts'

const localUser = JSON.parse(localStorage.getItem('_discord_user'))

export function getInfo() {
    const request = axios.get(`${consts.API_URL}/info`)
    return {
        type: 'INFO_FETCHED',
        payload: request
    }
}