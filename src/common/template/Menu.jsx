import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from '../../auth/authActions'

function Menu({ logout }) {
    return (
        <div className='shadow-md p-5'>
            <div className="flex justify-around">
                <span className="font-bold text-2xl text-purple-600">Dr. Song<span className='text-xs text-purple-300'> ALPHA</span> </span>
                <div className='flex gap-4 self-center'>
                    <Link to='/home' className='text-purple-700 font-semibold'>Home</Link>
                    {/* <Link to='/profile' className='text-purple-700 font-semibold'>Profile</Link> */}
                    <Link to='/create' className='text-purple-700 font-semibold'>Create</Link>

                </div>
                <div className="flex gap-2 hover:cursor-pointer" onClick={logout}>
                    <span className='self-center text-red-500 font-semibold'>Logout</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>

            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Menu)