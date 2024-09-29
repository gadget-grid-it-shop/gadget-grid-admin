
'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineLaptopChromebook, MdListAlt } from 'react-icons/md';
import { BiCategory, BiAddToQueue } from 'react-icons/bi';
import { TbListDetails, TbSunFilled } from 'react-icons/tb';
import { BsMoonFill } from 'react-icons/bs';

import { useTheme } from 'next-themes';
import { FaChevronDown } from 'react-icons/fa6';

interface TMenu {
    id: number,
    title: string,
    link: string,
    icon: ReactNode,
    children?: TMenu[]
}

const menus: TMenu[] = [
    {
        id: 1,
        title: 'Details Category',
        link: '/details-category',
        icon: <TbListDetails />
    },
    {
        id: 2,
        title: 'Category',
        icon: <BiCategory />,
        link: '/category',
    },
    {
        id: 3,
        title: 'Product',
        icon: <MdOutlineLaptopChromebook />,
        link: '/product',
        children: [
            {
                id: 1,
                title: 'Create Product',
                link: '/product/create-product',
                icon: <BiAddToQueue />
            },
            {
                id: 2,
                title: 'All Products',
                link: '/product/all-products',
                icon: <MdListAlt />
            }
        ]
    }
]

const Sidebar = () => {
    const { theme, setTheme } = useTheme()
    const pathName = usePathname()
    const [openMenu, setOpenMenu] = useState<number | null>(null)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    const isLinkActive = (link: string) => {
        return pathName === link || pathName.startsWith(link);
    };


    useEffect(() => {
        menus.forEach(menu => {
            if (pathName.includes(menu.link)) {
                setOpenMenu(menu.id)
            }
        })
    }, [pathName])


    return (
        <div className="h-screen sticky top-0 w-[320px] bg-white p-4 shadow-md overflow-y-auto flex flex-col">
            <Image src={"/gadget-grid-logo.png"} height={100} width={200} alt="logo" />

            <div className='pt-8 flex flex-col gap-3 flex-grow'>
                {
                    menus.map((item: TMenu) => {
                        if (!item?.children) {
                            return <Link className={`rounded-xl py-2 px-4 text-black flex items-center gap-2 ${isLinkActive(item.link) ? 'bg-primary text-pure-white' : ''}`} key={item.id} href={item.link}>
                                {item.icon}
                                {item.title}
                            </Link>
                        }
                        else {

                            return <div key={item.id} className={`${pathName.includes(item.link) && 'bg-lavender-mist rounded-md'}`}>
                                <button onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)} className={`text-black rounded-xl py-2 px-4 flex justify-between w-full items-center `}>
                                    <div className='flex gap-2 items-center'>
                                        {item.icon}
                                        {item.title}
                                    </div>

                                    <FaChevronDown className={`${openMenu === item.id ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                </button>
                                <div className={`px-3 flex flex-col gap-1 ${openMenu === item.id && 'py-2'}`}>
                                    {openMenu === item.id && item.children.map(child => <Link className={`rounded-xl py-2 px-4 flex items-center gap-2 ${isLinkActive(child.link) ? 'bg-primary  text-pure-white' : 'text-black'}`} key={child.id} href={child.link}>
                                        {child.icon}
                                        {child.title}
                                    </Link>)}
                                </div>
                            </div>
                        }
                    })
                }
            </div>


            {
                loaded && <div
                    className='flex justify-center items-center border w-fit mx-auto rounded-full shadow-lg bg-lavender-mist font-semibold'
                >
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`flex text-black items-center gap-2 px-3 py-2 h-full rounded-full ${theme === 'light' ? '' : 'bg-pure-white text-primary'}`}
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
    )
}

export default Sidebar