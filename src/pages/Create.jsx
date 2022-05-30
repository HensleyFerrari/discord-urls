import React, { useEffect, useState } from 'react'
import consts from '../consts'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { validateToken } from './../auth/authActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Create({ auth }) {
    const [form, setForm] = useState({
        nome: '', author: '', anime: '', tag: '', url: '', image: '', createdBy: {
            id: auth.user._id,
            name: auth.user.name,
        }, token: auth.user.token
    })
    const [info, setInfo] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getInfo()
    }, [])

    useEffect(() => {
        const arr = info.findIndex((info, index) => { return info.nome.toLowerCase() === form.nome.toLowerCase() })
        if (arr !== -1) {
            toast.warn('Essa música já foi cadastrada!')
        }
    }, [form.nome])

    const changeForm = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

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


    const handleSubmit = () => {
        axios.post(`${consts.API_URL}/info`, form, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(() => {
            toast.success('Música cadastrada com sucesso!')
            localStorage.removeItem('info')
            navigate('/search')
        }).catch(() => {
            toast.error('Erro ao cadastrar música!')
        })
    }

    return (
        <div className="dark:bg-zinc-800 min-h-[891px]">
            <div className='container mx-auto pt-5'>
                <div className="flex flex-col content-center m-auto gap-5 w-96">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Nome da música </label>
                        <input type="text" onChange={changeForm} name='nome' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Autor</label>
                        <input type="text" onChange={changeForm} name='author' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Anime/Álbum</label>
                        <input type="text" onChange={changeForm} name='anime' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Tag <span className='text-xs text-gray-500'>(Opening, Ending, Original, Insert Song)</span></label>
                        <input type="text" onChange={changeForm} name='tag' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Link da música</label>
                        <input type="text" onChange={changeForm} name='url' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="nome" className='dark:text-white'>Link da capa <span className='text-xs text-gray-500'>(My Anime List ou Anilist)</span></label>
                        <input type="text" onChange={changeForm} name='image' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                    </div>
                    <button onClick={() => handleSubmit()} className='px-4 py-2 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-xl text-white'>Cadastrar música</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Create)