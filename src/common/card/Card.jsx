import React from 'react'
import { toast } from 'react-toastify'

function Card({ song }) {

    const { nome, author, anime, tag, image, url } = song

    return (
        <div className='shadow-lg flex rounded-md bg-purple-600 text-white overflow-hidden'>
            <img src={image} alt="" className='max-h-52 rounded-l-md max-w-[138px]' loading='lazy' />
            <div className='flex flex-col gap-2 w-full text-center'>
                <span className='font-bold text-lg mt-2'>{nome}</span>
                <span className='text-sm'>{author}</span>
                <span className='text-sm'>{anime} - {tag}</span>
                <button onClick={(e => {
                    navigator.clipboard.writeText(`;;p ${url}`)
                    toast.info('Link copiado!')
                })} className='px-4 py-2 mt-auto font-semibold w-full text-white bg-zinc-700 self-center flex flex-row justify-center gap-1 hover:bg-fuchsia-800'><span>Copiar Comando</span><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg></button>
            </div>
        </div>
    )
}

export default Card