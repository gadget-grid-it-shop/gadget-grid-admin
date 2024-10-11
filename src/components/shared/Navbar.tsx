'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button } from "../ui/button"
import { resetAuthData } from "@/redux/reducers/auth/authSlice"
import { useMediaQuery } from "react-responsive"
import { HiMiniBars3BottomLeft } from "react-icons/hi2"
import { setMenuOpen } from "@/redux/reducers/general/generalReducer"
import { clearCookie } from "@/actions/logout"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useEffect, useState } from "react"
import { BsMoonFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { TbSunFilled } from "react-icons/tb"
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link"



const Navbar = () => {

    const [loaded, setLoaded] = useState(false)
    const { isAuthenticated, user } = useAppSelector(s => s.auth)
    // const { isMenuOpen } = useAppSelector(s => s.general)
    const dispatch = useAppDispatch()
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })

    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setLoaded(true)
    }, [])

    const handleLogout = () => {
        dispatch(resetAuthData())
        clearCookie()
    }

    return (
        <nav className=''>
            <div className='bg-white px-4 py-4 shadow-md rounded-md mt-3 flex justify-between'>
                {
                    !isDesktopOrLaptop && <Button className="px-0 text-2xl" onClick={() => dispatch(setMenuOpen(true))} variant={'icon'}><HiMiniBars3BottomLeft /></Button>
                }
                {
                    isAuthenticated && <div className="flex justify-end ms-auto">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="icon">
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} />
                                        <AvatarFallback className="capitalize">{user?.name.firstName.slice(0, 1)} {user?.name.lastName.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 pb-4 -right-10">
                                <DropdownMenuLabel >
                                    <div className="bg-primary rounded-tl-md rounded-tr-md text-pure-white px-3 py-4 flex justify-between items-center">
                                        <div>
                                            <h2 className="capitalize font-semibold text-pure-white pb-1">{`${user?.name.firstName} ${user?.name.middleName} ${user?.name.lastName}`}</h2>
                                            <h3 className="text-pure-white text-sm">Role: {user?.role?.role}</h3>
                                        </div>
                                        <Button variant={'delete_solid'} className="bg-background text-red" onClick={handleLogout}>Logout</Button>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link href={'/my-profile'} className="flex items-center gap-3">
                                            <FaRegUserCircle size={18} />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href={'/settings'} className="flex items-center gap-3">
                                            <IoSettingsOutline size={18} />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {
                            loaded && <div
                                className='flex justify-center items-center border w-fit mx-auto rounded-full shadow-lg bg-lavender-mist font-semibold'
                            >
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={`flex text-black items-center gap-2 px-3 py-2 h-full rounded-full ${theme === 'light' ? '' : 'bg-primary text-pure-white'}`}
                                >
                                    <BsMoonFill />
                                </button>
                                <button
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                    className={`flex text-black items-center gap-2 px-3 py-2 h-full rounded-full ${theme === 'light' ? 'bg-primary text-pure-white' : ''}`}
                                >
                                    <TbSunFilled />
                                </button>
                            </div>
                        }

                    </div>
                }
            </div>

        </nav>
    )
}

export default Navbar