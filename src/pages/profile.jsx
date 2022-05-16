import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { validateToken } from '../auth/authActions'

import consts from '../consts'
import CardProfile from '../common/card/CardProfile'

function Profile({ auth }) {
  const [info, setInfo] = useState([])

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    const date = Date.now() / 1000
    const checkDate = parseInt(localStorage.getItem('date'))
    const check = localStorage.getItem('info')
    const calc = date - checkDate

    if (check && calc < 180) {
      setInfo(JSON.parse(check))
    } else {
      localStorage.setItem('date', Date.now() / 1000)
      axios.get(`${consts.API_URL}/info`, {
        headers: {
          Authorization: auth.user.token,
        }
      }).then(resp => {
        setInfo(resp.data)
        localStorage.setItem('info', JSON.stringify(resp.data))
      })
    }
  }

  return (
    <div className='dark:bg-zinc-800 min-h-[891px]'>
      <div className='container mx-auto pt-5 pb-5'>
        <div className="sm:pb-4 dark:text-white font-bold text-3xl p-5 sm:p-0">
          Olá, <span className='text-purple-600'>{auth.user.name}</span>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 sm:p-0">
          {info.filter(val => {
            if (val.createdBy.name.toLowerCase().includes(auth.user.name.toLowerCase())) {
              return val
            }
          }).map(info => {
            return (
              <>
                <CardProfile song={info} name={auth.user._id} />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Profile)