import React from 'react'
import { toast } from 'react-toastify'

function Card({ song }) {

    const { nome, author, anime, tag, image, url, spotify, _id, createdBy } = song

    return (
        <div className='shadow-md flex rounded-md bg-purple-600 text-white overflow-hidden'>
            <img src={image} alt="" className='max-h-52 rounded-l-md' />
            <div className='flex flex-col gap-2 w-full text-center'>
                <span className='font-bold mt-2'>{nome}</span>
                <span className='text-sm'>{author}</span>
                <span className='text-sm'>{anime} - {tag}</span>
                <button onClick={(e => {
                    navigator.clipboard.writeText(`;;p ${url}`)
                    toast.info('Link copiado!')
                })} className='px-4 py-2 mt-auto font-semibold w-full text-white bg-fuchsia-800 self-center'>Copiar</button>
            </div>
        </div>
    )
}

export default Card