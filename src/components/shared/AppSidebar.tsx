'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import {
    BookOpen,
    ChevronRight,
    FileText,
    GalleryHorizontalEnd,
    GalleryVerticalEnd,
    LayoutDashboard,
    Store,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarRail,
    useSidebar,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useAppSelector } from '@/redux/hooks';
import { usePathname } from 'next/navigation';
import {
    ChevronDown,
    DiamondPlusIcon,
    GalleryVertical,
    HardDriveUpload,
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '../ui/collapsible';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
        id: 11,
        title: 'Shop',
        icon: <Store size={20} />,
        link: '/shop',
        children: [
            {
                id: 1,
                title: 'Banner Builder',
                link: '/shop/banner-builder',
                icon: <GalleryHorizontalEnd size={18} />,
            },
        ],
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

export function AppSidebar() {
    const { user } = useAppSelector((state) => state.auth);
    const pathName = usePathname();
    const [openRoute, setOpenRoute] = useState<number[]>([]);
    const { state } = useSidebar();

    useEffect(() => {
        menus.forEach((menu) => {
            if (pathName.includes(menu.link)) {
                setOpenRoute([menu.id]);
            }
        });
    }, [pathName]);

    const isLinkActive = (link: string) => {
        if (link === '/' && pathName === '/') {
            return true;
        }
        return pathName.substring(1) === link.substring(1);
    };

    function renderMenu(menu: TMenu) {
        const active = isLinkActive(menu.link);
        return (
            <SidebarMenuItem
                key={menu.id}
                className={`${active ? 'bg-sidebar-primary text-pure-white' : ''}`}
            >
                {menu.children && menu?.children.length > 0 ? (
                    <Collapsible className='group/collapsible'>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={menu.title}>
                                <h2>{menu.icon}</h2>
                                <span>{menu.title}</span>
                                <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent
                            className={active ? 'hover:bg-transparent' : ''}
                        >
                            <SidebarMenuSub>
                                {menu.children.map((item) => (
                                    <SidebarMenuSubItem key={item.id}>
                                        {renderMenu(item)}
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                ) : (
                    <SidebarMenuButton
                        className={
                            active
                                ? 'hover:bg-transparent hover:text-pure-white'
                                : ''
                        }
                        tooltip={menu.title}
                        asChild
                    >
                        <SidebarMenuSubItem>
                            <h2>{menu.icon}</h2>
                            <Link href={menu.link}>{menu.title}</Link>
                        </SidebarMenuSubItem>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        );
    }

    const { theme } = useTheme();

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size='lg'>
                            {/* <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                <GalleryVerticalEnd className='size-4' />
                            </div> */}
                            <div className='flex shrink-0 flex-col gap-0.5 leading-none'>
                                <Image
                                    src={
                                        theme !== 'dark'
                                            ? '/logo/logo-white.png'
                                            : '/logo/logo-dark.png'
                                    }
                                    width={140}
                                    height={50}
                                    className={cn('w-full h-12', {
                                        'h-[34px]': state === 'collapsed',
                                    })}
                                    alt='logo'
                                />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menus.map((menu) => renderMenu(menu))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </SidebarContent>
            <SidebarFooter />
            <SidebarRail />
        </Sidebar>
    );
}
