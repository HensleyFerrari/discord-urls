import React, { useState, useEffect } from 'react'
import axios from 'axios'
import consts from '../consts'
import Aos from 'aos'
import 'aos/dist/aos.css'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'

import { connect } from 'react-redux'

import Card from '../common/card/Card';

function Popular({ auth }) {
    const [info, setInfo] = useState(null)
    const [list, setList] = useState(null)

    useEffect(() => {
        getInfo()
        Aos.init()
    }, [])

    const getInfo = async () => {
        const date = Date.now() / 1000
        const checkDate = parseInt(localStorage.getItem('datePopular'))
        const check = localStorage.getItem('popular')
        const calc = date - checkDate

        if (check && calc < 180) {
            setInfo(JSON.parse(check))
        } else {
            localStorage.setItem('datePopular', Date.now() / 1000)
            axios.get(`${consts.API_URL}/info/popular`, {
                headers: {
                    Authorization: auth.user.token,
                }
            }).then(resp => {
                setInfo(resp.data)
                localStorage.setItem('popular', JSON.stringify(resp.data))
            })
        }

        axios.get(`${consts.API_URL}/info`, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(resp => {
            setList(resp.data)
        })
    }

    return (
        <div className="dark:bg-zinc-800 min-h-[891px] dark:text-white">
            <div className='container mx-auto pt-5'>
                <div className="flex flex-col gap-5">
                    <span className='font-bold text-3xl '>Top <span className='text-purple-700'>10</span> Populares</span>
                    <Splide
                        options={{
                            perPage: 4,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {info && info.map(info => {
                            return (
                                <SplideSlide key={info._id}>
                                    <span className='daerk:text-whit font-semibold'>{info.picked} reproduções</span>
                                    <Card song={info} />
                                </SplideSlide>
                            )
                        })}
                    </Splide>
                    <span className='font-bold text-3xl '>Sawano Hiroyuki <span className='bg-green-600 text-sm px-1 rounded-md align-middle'>Novo</span></span>
                    <Splide
                        options={{
                            perPage: 4,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {list && list.filter(val => {
                            const name = "SawanoHiroyuki"
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
                    <span className='font-bold text-3xl '>Official HiGE DANdism <span className='bg-green-600 text-sm px-1 rounded-md align-middle'>Novo</span></span>
                    <Splide
                        options={{
                            perPage: 4,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {list && list.filter(val => {
                            const name = "Official HiGE DANdism"
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
                    <span className='font-bold text-3xl '>Persona <span className='bg-green-600 text-sm px-1 rounded-md align-middle'>Novo</span></span>
                    <Splide
                        options={{
                            perPage: 4,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {list && list.filter(val => {
                            const name = "Persona"
                            if (val.author.toLowerCase().includes(name.toLowerCase()) ||
                            val.anime.toLowerCase().includes(name.toLowerCase())) {
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
                    <span className='font-bold text-3xl '>Boku no Hero Academia <span className='bg-green-600 text-sm px-1 rounded-md align-middle'>Novo</span></span>
                    <Splide
                        options={{
                            perPage: 4,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {list && list.filter(val => {
                            const name = "Boku no Hero Academia"
                            if (val.author.toLowerCase().includes(name.toLowerCase()) ||
                            val.anime.toLowerCase().includes(name.toLowerCase())
                            ) {
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

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Popular)