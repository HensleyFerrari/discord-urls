import React from 'react'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'

import Card from '../card/Card';

function Slide({ list, name, filter }) {
    return (
        <>
            <span className='font-bold text-3xl '>{name}</span>
            <Splide
                options={{
                    perPage: 3,
                    pagination: false,
                    drag: 'free',
                    gap: "2rem"
                }} >
                {list && list.filter(val => {
                    const name = filter
                    if (val.author.toLowerCase().includes(name.toLowerCase())) {
                        return val
                    }
                }).map(info => {
                    return (
                        <SplideSlide key={info._id}>
                            <span className='daerk:text-whit font-semibold'>{info.picked} reproduções</span>
                            <Card song={info} />
                        </SplideSlide>
                    )
                })}
            </Splide>
        </>
    )
}

export default Slide