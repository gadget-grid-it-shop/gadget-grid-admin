'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMenuOpen } from '@/redux/reducers/general/generalReducer';
import {
    ChevronDown,
    DiamondPlusIcon,
    GalleryVertical,
    HardDriveUpload,
    LayoutDashboard,
    LayoutGrid,
    ListTodo,
    ShoppingCart,
    SlidersHorizontal,
    Tags,
    UserCog,
    UserPen,
    Users,
    UsersRound,
    X,
} from 'lucide-react';

interface TMenu {
    id: number;
    title: string;
    link: string;
    icon: ReactNode;
    children?: TMenu[];
}

const menus: TMenu[] = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/',
        icon: <LayoutGrid size={18} />,
    },
    {
        id: 2,
        title: 'Details Category',
        link: '/details-category',
        icon: <LayoutDashboard size={18} />,
    },
    {
        id: 3,
        title: 'Brand',
        link: '/brand',
        icon: <Tags size={18} />,
    },
    {
        id: 4,
        title: 'Category',
        icon: <ListTodo size={20} />,
        link: '/category',
    },
    {
        id: 5,
        title: 'Product',
        icon: <ShoppingCart size={18} />,
        link: '/product',
        children: [
            {
                id: 1,
                title: 'Create Product',
                link: '/product/create-product',
                icon: <DiamondPlusIcon size={18} />,
            },
            {
                id: 4,
                title: 'Product Filters',
                link: '/product/filters',
                icon: <SlidersHorizontal size={18} />,
            },
            {
                id: 2,
                title: 'All Products',
                link: '/product/all-products',
                icon: <GalleryVertical size={18} />,
            },
            {
                id: 3,
                title: 'Bulk Upload',
                link: '/product/bulk-upload',
                icon: <HardDriveUpload size={18} />,
            },
        ],
    },
    {
        id: 6,
        title: 'Roles',
        link: '/roles',
        icon: <UserCog size={18} />,
    },
    {
        id: 7,
        title: 'Users',
        link: '/users',
        icon: <Users size={18} />,
        children: [
            {
                id: 1,
                title: 'Admins',
                link: '/users/admins',
                icon: <UserPen size={18} />,
            },
            {
                id: 2,
                title: 'Customers',
                link: '/users/customers',
                icon: <UsersRound size={18} />,
            },
        ],
    },
];

const Sidebar = () => {
    const pathName = usePathname();
    const [openRoute, setOpenRoute] = useState<number[]>([]);

    const { isMenuOpen } = useAppSelector((s) => s.general);
    const dispatch = useAppDispatch();

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1200px)',
    });

    const isLinkActive = (link: string) => {
        if (link === '/' && pathName === '/') {
            return true;
        }
        return pathName.substring(1) === link.substring(1);
    };

    const handleClose = (value: boolean) => {
        dispatch(setMenuOpen(value));
    };

    useEffect(() => {
        menus.forEach((menu) => {
            if (pathName.includes(menu.link)) {
                setOpenRoute([menu.id]);
            }
        });
    }, [pathName]);

    const handleMenuOpen = (id: number) => {
        const exist = openRoute?.find((Id) => Id === id);
        if (exist) {
            const filteredMenu = openRoute?.filter((Id) => Id !== id) || [];
            setOpenRoute(filteredMenu);
        } else {
            setOpenRoute([...openRoute, id]);
        }
    };

    return (
        <div>
            {isMenuOpen && !isDesktopOrLaptop && (
                <div className='fixed z-30 h-screen w-screen bg-overlay'></div>
            )}
            <div
                className={`fixed top-0 z-50 flex h-screen flex-col overflow-y-auto custom-scrollbar px-2 py-4 shadow-md ${!isDesktopOrLaptop && !isMenuOpen ? 'hidden' : 'visible'} lg:w-[260px] min-[1200px]:sticky 2xl:w-[280px] ${!isDesktopOrLaptop ? 'bg-background-foreground' : 'bg-background'}`}
            >
                <div className='flex justify-between gap-5'>
                    <Image
                        src={'/gadget-grid-logo.png'}
                        height={100}
                        width={200}
                        alt='logo'
                    />
                    {!isDesktopOrLaptop && (
                        <Button
                            onClick={() => handleClose(false)}
                            variant={'icon'}
                            className='border border-border-color'
                        >
                            <X />
                        </Button>
                    )}
                </div>

                <div className='flex flex-grow flex-col gap-3 pt-8'>
                    {menus.map((item: TMenu) => {
                        if (!item?.children) {
                            return (
                                <Link
                                    className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${isLinkActive(item.link) ? 'bg-primary text-pure-white' : 'text-gray'}`}
                                    key={item.id}
                                    href={item.link}
                                >
                                    {item.icon}
                                    {item.title}
                                </Link>
                            );
                        } else {
                            return (
                                <div
                                    key={item.id}
                                    className={`${pathName.includes(item.link) && 'rounded-md bg-lavender-mist'}`}
                                >
                                    <button
                                        onClick={() => handleMenuOpen(item.id)}
                                        className={`flex w-full items-center justify-between rounded-xl px-2 py-2 text-black`}
                                    >
                                        <div className='flex items-center gap-2 text-sm text-gray'>
                                            {item.icon}
                                            {item.title}
                                        </div>

                                        <ChevronDown
                                            className={`${openRoute.find((id) => id === item.id) ? 'rotate-180' : 'rotate-0'} text-sm text-gray transition-all`}
                                        />
                                    </button>
                                    <div
                                        className={`flex flex-col gap-1 px-3 ${openRoute.find((id) => id === item.id) && 'py-2'}`}
                                    >
                                        {openRoute.find(
                                            (id) => id === item.id,
                                        ) &&
                                            item.children.map((child) => (
                                                <Link
                                                    className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                                                        isLinkActive(child.link)
                                                            ? 'bg-primary text-pure-white'
                                                            : 'text-gray'
                                                    }`}
                                                    key={child.id}
                                                    href={child.link}
                                                >
                                                    {child.icon}
                                                    {child.title}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
