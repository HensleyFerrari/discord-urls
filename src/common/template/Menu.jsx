import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'
import ThemeButton from '../../common/buttons/ThemeButton'

function Menu({ logout, auth, setTheme }) {
    const [dropdown, setDropdown] = useState(false)

    if (!auth.user) {
        return (
            <></>
        )
    } else {
        return (
            <div className='shadow-md p-5 dark:bg-zinc-700'>
                <div className="flex justify-around">
                    <span className="font-bold text-2xl text-purple-600 self-center">Dr. Song<span className='text-xs text-purple-300 dark:text-gray-100'> BETA</span> </span>
                    <div className='flex gap-4 self-center'>
                        <Link to='/home' className='text-purple-600 dark:text-white font-bold flex gap-2 hover:text-purple-700 dark:hover:text-purple-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span>Populares</span>
                        </Link>
                        <Link to='/search' className='text-purple-600 dark:text-white font-bold flex gap-2 hover:text-purple-700 dark:hover:text-purple-700'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                            <span>Músicas</span>
                        </Link>
                        {/* <Link to='/profile' className='text-purple-700 font-semibold'>Profile</Link> */}
                        {/* <Link to='/create' className='text-purple-700 font-semibold'>Create</Link> */}
                    </div>
                    <div className="flex gap-2 hover:cursor-pointer">
                        <div className="flex items-center justify-center">
                            <div className="relative inline-block">
                                {/* Dropdown toggle button */}
                                <button className="flex gap-1 relative z-10 p-2 dark:text-white text-purple-600 font-bold bg-white dark:bg-zinc-700 border border-transparent rounded-md" onClick={() => { setDropdown(!dropdown) }}>
                                    <span>{auth.user.name}</span>
                                    <svg className="w-5 h-5 text-gray-800 dark:text-white self-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                {/* Dropdown menu */}
                                <div className={`absolute right-0 z-20 w-48 py-2 mt-2 bg-white dark:bg-zinc-900 rounded-md shadow-xl ${dropdown ? '' : 'hidden'} `} onMouseLeave={() => setDropdown(false)}>
                                    <Link to='/' onClick={() => { setDropdown(false) }} className="dark:text-white dark:hover:bg-zinc-600 px-4 py-3 text-sm  capitalize transition-colors duration-200 transform hover:bg-gray-100 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        <span >Populares</span>
                                    </Link>
                                    {auth.user.editor && <Link to='/create' onClick={() => { setDropdown(false) }} className="dark:text-white dark:hover:bg-zinc-600 px-4 py-3 text-sm  capitalize transition-colors duration-200 transform hover:bg-gray-100 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg><span >Adicionar Música</span>
                                    </Link>}
                                    {auth.user.editor && <Link to='/profile' onClick={() => { setDropdown(false) }} className="dark:text-white dark:hover:bg-zinc-600 px-4 py-3 text-sm  capitalize transition-colors duration-200 transform hover:bg-gray-100 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg><span >Perfil</span>
                                    </Link>}
                                    {auth.user.admin && <Link to='/admin/home' onClick={() => { setDropdown(false) }} className="dark:text-white dark:hover:bg-zinc-600 px-4 py-3 text-sm  capitalize transition-colors duration-200 transform hover:bg-gray-100 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span >Admin Panel</span>
                                    </Link>}
                                    <ThemeButton setTheme={setTheme} setDropdown={setDropdown} />
                                    <hr className='border-gray-200 dark:border-gray-700' />
                                    <span className="px-4 py-3 text-sm text-red-500 hover:text-red-600 capitalize dark:hover:bg-zinc-600 transition-colors duration-200 transform hover:bg-gray-100 flex gap-1" onClick={() => {
                                        logout()
                                        setDropdown(false)
                                        localStorage.removeItem('info')
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Menu)