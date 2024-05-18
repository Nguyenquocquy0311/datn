import React from "react";
import HeaderLayout from "./HeaderLayout";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { CirclePlusIcon } from "../common/icon/CirclePlucIcon";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import SearchInput from "../common/SearchInput";
import UserMenu from "../common/AvaUser";

const Header = ({onClick, title}) => {
  const router = useRouter()

    const GoToHome = () => {
      if (!router.pathname.includes('/')) {
        router.push('/')
      }
    }
  return (
    <HeaderLayout>
      <div className="px-2 tlg:px-6 flex items-center justify-between">
        {/* <Logo onClick={GoToHome} /> */}
        <div className="mx-4 text-blue-500 hover:text-blue-700" onClick={onClick}><CirclePlusIcon/></div>
        <p className="text-[16px] font-semibold">{title}</p>
        <SearchInput/>
        <UserMenu/>
      </div>
    </HeaderLayout>
  );
};

export default Header;
