import React, { useState, useEffect } from 'react'
import axios from 'axios'
import consts from '../consts'
import Aos from 'aos'
import 'aos/dist/aos.css'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'

import Slide from '../common/slides/Slide'

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
        await axios.get(`${consts.API_URL}/info/popular`, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(resp => {
            setInfo(resp.data)
        })

        await axios.get(`${consts.API_URL}/info`, {
            headers: {
                Authorization: auth.user.token,
            }
        }).then(resp => {
            setList(resp.data)
        })
    }

    return (
        <div className="dark:bg-zinc-800 min-h-[891px] dark:text-white">
            <div className='container mx-auto pt-5 pb-5'>
                <div className="flex flex-col gap-5">
                    <span className='font-bold text-3xl ml-3'>Top <span className='text-purple-700'>10</span> Populares</span>
                    <Splide
                        options={{
                            perPage: 3,
                            pagination: false,
                            drag: 'free',
                            gap: "2rem"
                        }} >
                        {info && info.map(info => {
                            return (
                                <SplideSlide key={info._id}>
                                    <Card song={info} />
                                </SplideSlide>
                            )
                        })}
                    </Splide>
                    <Slide list={list} name={'Sawano Hiroyuki'} filter={'Sawano'} />
                    <Slide list={list} name={'Official HiGE DANdism'} filter={'Official HiGE DANdism'} />
                    <Slide list={list} name={'Persona'} filter={'Persona'} />
                    <Slide list={list} name={'LiSA'} filter={'lisa'} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(mapStateToProps)(Popular)