import React, { useEffect, useState } from 'react'
import consts from '../consts'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { validateToken } from '../auth/authActions'

import Card from '../common/card/Card'
import Menu from '../common/template/Menu'

function Home({ auth, validateToken }) {
  const [info, setInfo] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get(`${consts.API_URL}/info`, {
      headers: {
        Authorization: auth.user.token,
      }
    }).then(resp => {
      setInfo(resp.data)
    })
  }, [])

  return (
    <>
      <Menu />
      <div className='container mx-auto mt-5'>
        <div className="flex mb-5 gap-5 pl-5 pr-5 sm:p-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={searchTerm} placeholder='Quero escutar ...' className='w-full outline outline-offset-1 outline-purple-500 rounded-md' onChange={e => { setSearchTerm(e.target.value) }} />
          <button onClick={e => { setSearchTerm("") }} className='px-4 py-2 rounded-md bg-gray-200'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 sm:p-0">
          {info.filter(val => {
            if (searchTerm === "") {
              return val
            } else if (val.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }
          }).map(info => {
            return (
              <>
                <Card song={info} />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)