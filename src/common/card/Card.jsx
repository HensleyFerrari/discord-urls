import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import consts from '../../consts'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { connect } from 'react-redux'

function Card({ song, name, admin, auth, setSearchTerm }) {

    const { nome, author, anime, tag, image, url, _id, picked } = song

    const updatePickedSong = () => {
        axios.put(`${consts.API_URL}/info/${_id}/popular`, { picked }, {
            headers: {
                Authorization: auth.user.token,
            }
        }).catch(() => {
            toast.error('Erro ao alterar música!')
        })
    }

    return (
        <div className='shadow-lg flex rounded-md dark:bg-purple-900 text-black dark:text-white overflow-hidden min-h-[265px]' data-aos="fade-up" >
            <img src={image} alt="" className=' rounded-l-md max-w-[185px] max-h-[265px]' loading='lazy' />
            {/* <div className='fixed w-20 h-20 ml-4 mt-7'>
                <LazyLoadImage src={image} alt="..." width={138} height={207} className='rounded-3xl' />
            </div>
            <LazyLoadImage src={image} alt="..." width={185} height={265} /> */}
            <div className='flex flex-col gap-2 w-full text-center'>
                <span className='font-bold text-lg mt-2 pl-1 pr-2'>{nome}</span>
                <span className='text-sm p-1' onClick={() => setSearchTerm(author)}>{author}</span>
                <span className='text-sm p-1' onClick={() => setSearchTerm(anime)}>{anime}</span>
                <span className='text-sm p-1' onClick={() => setSearchTerm(tag)}>{tag}</span>
                <div className="flex mt-auto">
                    <span onClick={(e => {
                        navigator.clipboard.writeText(`/play ${url}`)
                        updatePickedSong()
                        toast.info(`${nome} de ${anime} foi copiado!`)
                    })} className='cursor-pointer px-4 py-2 font-semibold w-full text-white gap-2 bg-zinc-700 self-center flex flex-row justify-center hover:bg-zinc-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span className='text-sm font-normal'>Copiar</span>
                    </span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`bg-red-600 text-white hover:bg-red-400 w-full px-4 py-2 gap-2 font-semibold cursor-pointer flex justify-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className='text-sm font-normal '>Youtube</span>
                    </a>
                </div>
            </div>
            <span className="absolute text-white font-bold bg-purple-900 px-2 py-2 flex flex-col justify-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 self-center" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className='text-sm'>{picked}</span>
            </span>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(React.memo(Card))