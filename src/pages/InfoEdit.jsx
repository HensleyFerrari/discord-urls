import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

import consts from '../consts'

function InfoEdit({ auth }) {
    let navigate = useNavigate()
    const [form, setForm] = useState({
        nome: '', author: '', anime: '', tag: '', url: '', image: '', updatedBy: auth.user.nome ,token: auth.user.token
    })
    const [info, setInfo] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get(`${consts.API_URL}/info/${id}`, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(resp => {
            setInfo(resp.data)
            checkOwner(resp.data)
        })
    }, [])

    useEffect(() => {
        setForm({
            ...form,
            nome: info.nome,
            author: info.author,
            anime: info.anime,
            tag: info.tag,
            url: info.url,
            image: info.image
        })
    }, [info])

    const checkOwner = (data) => {
        if (auth.user._id !== data.createdBy.id && !auth.user.admin) {
            toast.warning('Você não tem permissão para editar essa música!')
            navigate('/home')
        }
    }

    const changeForm = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })

    }

    const handleSubmit = () => {
        axios.put(`${consts.API_URL}/info/${id}`, form, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(() => {
            toast.success('Música alterada com sucesso!')
            localStorage.removeItem('info')
            navigate('/search')
        }).catch(() => {
            toast.error('Erro ao alterar música!')
        })
    }

    return (
        <div className="dark:bg-zinc-800 min-h-[891px]">
            <div className='container mx-auto pt-5'>
                <div className="flex flex-col justify-center gap-5">
                    <div className="grid grid-rows justify-items-center gap-5 text-center">
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Nome da música</label>
                            <input type="text" value={form.nome} onChange={changeForm} name='nome' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Autor</label>
                            <input type="text" value={form.author} onChange={changeForm} name='author' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Anime/Álbum</label>
                            <input type="text" value={form.anime} onChange={changeForm} name='anime' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Tag <span className='text-xs text-gray-500 dark:text-gray-50'>(Opening, Ending, Original, Insert Song)</span></label>
                            <input type="text" value={form.tag} onChange={changeForm} name='tag' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Link da música</label>
                            <input type="text" value={form.url} onChange={changeForm} name='url' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <div className='flex flex-col gap-2 min-w-[402px]'>
                            <label htmlFor="nome" className='dark:text-white'>Link da capa <span className='text-xs text-gray-500 dark:text-gray-50'>(My Anime List ou Anilist)</span></label>
                            <input type="text" value={form.image} onChange={changeForm} name='image' className='p-1 outline outline-offset-1 outline-purple-500 rounded-md' required />
                        </div>
                        <button onClick={() => handleSubmit()} className='px-4 py-2 w-72 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold text-xl text-white'>Editar música</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(InfoEdit)