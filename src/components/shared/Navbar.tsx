'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '../ui/button';
import { useMediaQuery } from 'react-responsive';
import { setMenuOpen } from '@/redux/reducers/general/generalReducer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { handleLogout } from '@/lib/utils';
import ImageGallery from '../product/ImageGallery';
import NotificationMenu from '../notifications/NotificationMenu';
import {
    CircleUserRound,
    Images,
    Menu,
    Moon,
    Settings,
    Sun,
} from 'lucide-react';

const Navbar = () => {
    const [loaded, setLoaded] = useState(false);
    const { isAuthenticated, user } = useAppSelector((s) => s.auth);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const dispatch = useAppDispatch();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)',
    });

    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <nav className=''>
            <div className='mt-3 flex gap-2 justify-between rounded-md bg-background px-4 py-4 shadow-md'>
                {!isDesktopOrLaptop && (
                    <Button
                        className='px-0 text-2xl'
                        onClick={() => dispatch(setMenuOpen(true))}
                        variant={'icon'}
                    >
                        <Menu />
                    </Button>
                )}
                <div className='flex w-full justify-end gap-2'>
                    <Button
                        onClick={() => setGalleryOpen(true)}
                        className='gap-1 bg-bright-turquoise text-sm'
                    >
                        <Images size={18} /> Gallery
                    </Button>

                    <NotificationMenu />

                    {isAuthenticated && (
                        <div className='flex justify-end gap-2'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='icon' size={'base'}>
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profilePicture}
                                            />
                                            <AvatarFallback className='capitalize'>
                                                {user?.name.firstName.slice(
                                                    0,
                                                    1,
                                                )}
                                                {user?.name.lastName.slice(
                                                    0,
                                                    1,
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='-right-10 w-72 pb-4'>
                                    <DropdownMenuLabel>
                                        <div className='flex items-center justify-between rounded-tl-md rounded-tr-md bg-primary px-3 py-4 text-pure-white'>
                                            <div>
                                                <h2 className='pb-1 font-semibold capitalize text-pure-white'>{`${user?.name.firstName} ${user?.name.middleName} ${user?.name.lastName}`}</h2>
                                                <h3 className='text-sm text-pure-white'>
                                                    Role: {user?.role?.role}
                                                </h3>
                                            </div>
                                            <Button
                                                variant={'delete_solid'}
                                                className='bg-background text-red'
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link
                                                href={'/my-profile'}
                                                className='flex items-center gap-3'
                                            >
                                                <CircleUserRound size={18} />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href={'/settings'}
                                                className='flex items-center gap-3'
                                            >
                                                <Settings size={18} />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {loaded && (
                                <div className='mx-auto flex w-fit items-center justify-center rounded-full border border-border-color bg-lavender-mist font-semibold shadow-lg'>
                                    <button
                                        onClick={() =>
                                            setTheme(
                                                theme === 'dark'
                                                    ? 'light'
                                                    : 'dark',
                                            )
                                        }
                                        className={`flex h-full items-center gap-2 rounded-full px-3 py-2 text-black ${
                                            theme === 'light'
                                                ? ''
                                                : 'bg-primary text-pure-white'
                                        }`}
                                    >
                                        <Moon />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setTheme(
                                                theme === 'light'
                                                    ? 'dark'
                                                    : 'light',
                                            )
                                        }
                                        className={`flex h-full items-center gap-2 rounded-full px-3 py-2 text-black ${
                                            theme === 'light'
                                                ? 'bg-primary text-pure-white'
                                                : ''
                                        }`}
                                    >
                                        <Sun />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <ImageGallery open={galleryOpen} setOpen={setGalleryOpen} />
            </div>
        </nav>
    );
};

export default Navbar;
