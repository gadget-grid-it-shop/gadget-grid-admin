'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button } from "../ui/button"
import { resetAuthData } from "@/redux/reducers/auth/authSlice"
import { useMediaQuery } from "react-responsive"
import { HiMiniBars3BottomLeft } from "react-icons/hi2"
import { setMenuOpen } from "@/redux/reducers/general/generalReducer"


const Navbar = () => {

    const { isAuthenticated } = useAppSelector(s => s.auth)
    // const { isMenuOpen } = useAppSelector(s => s.general)
    const dispatch = useAppDispatch()
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })

    const handleLogout = () => {
        dispatch(resetAuthData())
    }

    return (
        <nav className=''>
            <div className='bg-white px-4 py-4 shadow-md rounded-md mt-3 flex justify-between'>
                {
                    !isDesktopOrLaptop && <Button className="px-0" onClick={() => dispatch(setMenuOpen(true))} variant={'icon'}><HiMiniBars3BottomLeft /></Button>
                }
                {
                    isAuthenticated && <Button variant={'delete'} onClick={handleLogout}>Logout</Button>
                }
            </div>

        </nav>
    )
}

export default Navbar