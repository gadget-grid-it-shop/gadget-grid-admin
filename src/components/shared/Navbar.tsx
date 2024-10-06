'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button } from "../ui/button"
import { resetAuthData } from "@/redux/reducers/auth/authSlice"
import { useMediaQuery } from "react-responsive"
import { HiMiniBars3BottomLeft } from "react-icons/hi2"
import { setMenuOpen } from "@/redux/reducers/general/generalReducer"
import { clearCookie } from "@/actions/logout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


const Navbar = () => {

    const { isAuthenticated, user } = useAppSelector(s => s.auth)
    // const { isMenuOpen } = useAppSelector(s => s.general)
    const dispatch = useAppDispatch()
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })

    console.log(user)

    const handleLogout = () => {
        dispatch(resetAuthData())
        clearCookie()
    }

    return (
        <nav className=''>
            <div className='bg-white px-4 py-4 shadow-md rounded-md mt-3 flex justify-between'>
                {
                    !isDesktopOrLaptop && <Button className="px-0" onClick={() => dispatch(setMenuOpen(true))} variant={'icon'}><HiMiniBars3BottomLeft /></Button>
                }
                {
                    isAuthenticated && <div className="flex justify-end w-full">

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="icon">
                                    <Avatar>
                                        <AvatarImage src={'https://avatars.githubusercontent.com/u/94839405?v=4'} />
                                        <AvatarFallback className="capitalize">{user?.name.firstName.slice(0, 1)} {user?.name.lastName.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <span>Profile</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Billing</span>
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>Settings</span>
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>

                                        <span>Keyboard shortcuts</span>
                                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>

                                        <span>Team</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <span>New Team</span>
                                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>GitHub</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Support</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled>
                                    <span>API</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant={'delete'} onClick={handleLogout}>Logout</Button>
                    </div>
                }
            </div>

        </nav>
    )
}

export default Navbar