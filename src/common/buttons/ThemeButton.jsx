import React from 'react'

function Button({ setTheme, setDropdown }) {


    const button = () => {
        if (localStorage.theme === 'dark') {
            return (
                <span onClick={() => {
                    localStorage.theme = 'light'
                    setTheme('light')
                    setDropdown(false)
                }} className='px-4 py-3 text-sm text-white capitalize transition-colors duration-200 transform dark:hover:bg-zinc-600 hover:bg-gray-100 flex gap-1'>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Modo Claro</span>                   
                </span>
            )
        } else {
            return (
                <span onClick={() => {
                    localStorage.theme = 'dark'
                   setTheme('dark')
                   setDropdown(false)
                }} className='px-4 py-3 text-sm  capitalize transition-colors duration-200 transform hover:bg-gray-100 flex gap-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>Modo Noturno</span>                    
                </span>
            )
        }
    }

    return (
        <>
            {button()}
        </>
    )
}

export default Button