import React, { useEffect, useState } from 'react'
import consts from '../consts'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getInfo } from '../main/songs/songActions'

import Aos from 'aos'
import 'aos/dist/aos.css'
import { toast } from 'react-toastify'

import Card from '../common/card/Card'
import Loading from '../common/msg/Loading'

function Home({ auth, getInfo, info }) {
  // const [info, setInfo] = useState(infoRedux)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getInfo().then(() => {
      setLoading(true)
    })
    Aos.init()
    
  }, [])

  const updatePickedSong = (_id, picked) => {
    axios.put(`${consts.API_URL}/info/${_id}/popular`, { picked }, {
      headers: {
        Authorization: auth.user.token,
      }
    }).catch(() => {
      toast.error('Erro ao alterar música!')
    })
  }

  const getRandom = () => {
    const random = info[Math.floor(Math.random() * info.length)]
    return random
  }

  const copyRandom = () => {
    const random = getRandom()
    navigator.clipboard.writeText(`/play ${random.url}`)
    toast.info(`${random.nome} de ${random.anime} foi copiado!`)
    updatePickedSong(random._id, random.picked)
  }

  return (
    <div className='dark:bg-zinc-800 min-h-[891px]'>
      {!loading && <Loading />}
      {info && (
        <div className={`container mx-auto pt-5 pb-5 ${loading ? '' : 'hidden'}`}>
          <div className="flex mb-5 gap-5 pl-5 pr-5 sm:p-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" value={searchTerm} placeholder='Quero escutar...' className='w-full outline outline-offset-1 outline-purple-500 rounded-md p-2' onChange={e => { setSearchTerm(e.target.value) }} />
            <button onClick={e => setSearchTerm("")} className='px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button onClick={e => copyRandom()} className='px-4 py-2 rounded-md bg-[#ff0054] hover:bg-[#e7165b] text-white'>
              <span className='font-semibold'>Aleatório</span>
            </button>
          </div>
          <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 p-5 sm:p-0">
            {info.filter(val => {
              if (searchTerm === "") {
                return val
              } else if (val.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.anime.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val
              }
            }).map(info => {
              return (
                <div key={info._id}>
                  <Card song={info} name={auth.user._id} admin={auth.user.admin} setSearchTerm={setSearchTerm} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth, info: state.info.info })
const mapDispatchToProps = dispatch => bindActionCreators({ getInfo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)
