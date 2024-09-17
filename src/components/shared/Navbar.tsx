'use client'

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

    const { theme, setTheme } = useTheme()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    return (
        <nav className=''>
            <div className='bg-white px-4 py-4 shadow-md rounded-md mt-3'>
                {
                    loaded && <button className='text-text' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        {
                            theme
                        }
                    </button>
                }
            </div>

        </nav>
    )
}

export default Navbar