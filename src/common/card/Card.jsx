import React from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Card({ song, name, admin }) {

    const { nome, author, anime, tag, image, url, createdBy, _id } = song

    return (
        <div className='shadow-lg flex rounded-md bg-purple-600 text-white overflow-hidden min-h-[207px]' data-aos="fade-up" >
            <img src={image} alt="" className=' rounded-l-md max-w-[138px]' loading='lazy' />
            <div className='flex flex-col gap-2 w-full text-center'>
                <span className='font-bold text-lg mt-2 pl-1 pr-2 cursor-pointer ' onClick={(e => {
                    navigator.clipboard.writeText(`;;p ${url}`)
                    toast.info(`${nome} de ${anime} foi copiado!`)
                })}>{nome}</span>
                <span className='text-sm p-1'>{author}</span>
                <span className='text-sm p-1'>{anime} - {tag}</span>
                <div className="flex mt-auto">
                    <span onClick={(e => {
                        navigator.clipboard.writeText(`;;p ${url}`)
                        toast.info(`${nome} de ${anime} foi copiado!`)
                    })} className='cursor-pointer px-4 py-2 font-semibold w-full text-white gap-2 bg-zinc-700 self-center flex flex-row justify-center hover:bg-zinc-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span className='text-sm font-normal'>Copiar</span>
                    </span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`bg-red-600 hover:bg-red-400 w-full px-4 py-2 gap-2 font-semibold cursor-pointer flex justify-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className='text-sm font-normal'>Youtube</span>
                    </a>
                    {/* <Link to={`/${_id}/edit`} className={`bg-[#ffa200] hover:bg-[#ffb000] px-4 py-2 w-full font-semibold cursor-pointer flex justify-center ${name === createdBy.id || admin ? '' : 'hidden'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Card