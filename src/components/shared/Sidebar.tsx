"use client";
import React, {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {MdOutlineLaptopChromebook, MdListAlt, MdOutlineClose} from "react-icons/md";
import {BiCategory, BiAddToQueue} from "react-icons/bi";
import {TbListDetails} from "react-icons/tb";

import {useMediaQuery} from "react-responsive";

import {FaChevronDown, FaUsers} from "react-icons/fa6";
import {Button} from "../ui/button";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setMenuOpen} from "@/redux/reducers/general/generalReducer";
import {FaUsersCog} from "react-icons/fa";

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
    title: "Details Category",
    link: "/details-category",
    icon: <TbListDetails />,
  },
  {
    id: 2,
    title: "Category",
    icon: <BiCategory />,
    link: "/category",
  },
  {
    id: 3,
    title: "Product",
    icon: <MdOutlineLaptopChromebook />,
    link: "/product",
    children: [
      {
        id: 1,
        title: "Create Product",
        link: "/product/create-product",
        icon: <BiAddToQueue />,
      },
      {
        id: 2,
        title: "All Products",
        link: "/product/all-products",
        icon: <MdListAlt />,
      },
    ],
  },
  {
    id: 4,
    title: "Roles",
    link: "/roles",
    icon: <FaUsersCog size={18} />,
  },
  {
    id: 5,
    title: "Users",
    link: "/users",
    icon: <FaUsers size={18} />,
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const {isMenuOpen} = useAppSelector((s) => s.general);
  const dispatch = useAppDispatch();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const isLinkActive = (link: string) => {
    return pathName === link || pathName.startsWith(link);
  };

  const handleClose = (value: boolean) => {
    dispatch(setMenuOpen(value));
  };

  useEffect(() => {
    menus.forEach((menu) => {
      if (pathName.includes(menu.link)) {
        setOpenMenu(menu.id);
      }
    });
  }, [pathName]);

  return (
    <div>
      {isMenuOpen && !isDesktopOrLaptop && <div className="w-screen h-screen fixed z-30 bg-overlay bg-opacity-45"></div>}
      <div
        className={`${
          !isDesktopOrLaptop && !isMenuOpen ? "hidden" : "visible"
        } h-screen min-[1200px]:sticky top-0 2xl:w-[320px] lg:w-[280px] p-4 shadow-md overflow-y-auto flex flex-col fixed z-50 ${
          !isDesktopOrLaptop ? "bg-background-foreground" : " bg-background"
        }`}
      >
        <div className="flex justify-between gap-5">
          <Image src={"/gadget-grid-logo.png"} height={100} width={200} alt="logo" />
          {!isDesktopOrLaptop && (
            <Button onClick={() => handleClose(false)} variant={"icon"} className="border border-border-color">
              <MdOutlineClose />
            </Button>
          )}
        </div>

        <div className="pt-8 flex flex-col gap-3 flex-grow">
          {menus.map((item: TMenu) => {
            if (!item?.children) {
              return (
                <Link
                  className={`rounded-xl py-2 px-4 text-black flex items-center gap-2 ${isLinkActive(item.link) ? "bg-primary text-pure-white" : ""}`}
                  key={item.id}
                  href={item.link}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            } else {
              return (
                <div key={item.id} className={`${pathName.includes(item.link) && "bg-lavender-mist rounded-md"}`}>
                  <button
                    onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                    className={`text-black rounded-xl py-2 px-4 flex justify-between w-full items-center `}
                  >
                    <div className="flex gap-2 items-center">
                      {item.icon}
                      {item.title}
                    </div>

                    <FaChevronDown className={`${openMenu === item.id ? "rotate-180" : "rotate-0"} transition-all`} />
                  </button>
                  <div className={`px-3 flex flex-col gap-1 ${openMenu === item.id && "py-2"}`}>
                    {openMenu === item.id &&
                      item.children.map((child) => (
                        <Link
                          className={`rounded-xl py-2 px-4 flex items-center gap-2 ${
                            isLinkActive(child.link) ? "bg-primary  text-pure-white" : "text-black"
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
