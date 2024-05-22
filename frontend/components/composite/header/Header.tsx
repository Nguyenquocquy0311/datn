import React from "react";
import HeaderLayout from "./HeaderLayout";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { CirclePlusIcon } from "../common/icon/CirclePlucIcon";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Tooltip } from "@nextui-org/react";
import SearchInput from "../common/SearchInput";
import UserMenu from "../common/AvaUser";
import { useSelector } from "react-redux";
import { getAssetTab, getUserInfo, getUserTab } from "@/slices/redux";

const Header = ({onClick, title}) => {
  const router = useRouter()
  const userInfo = useSelector(getUserInfo)

  const isAssetTabActive = useSelector(getAssetTab)
  const isUserTabActive = useSelector(getUserTab)

  let content = ''
  if (isAssetTabActive) content = 'Thêm mới tài sản'
  if (isUserTabActive) content = 'Thêm mới nguời dùng'

    const GoToHome = () => {
      if (!router.pathname.includes('/')) {
        router.push('/')
      }
    }
  return (
    <HeaderLayout>
      <div className="px-2 tlg:px-6 flex items-center justify-between">
        {/* <Logo onClick={GoToHome} /> */}
        {userInfo.role !== 'user' && (isAssetTabActive || isUserTabActive) && <Tooltip content={content} className='bg-blue-500 text-white p-2 rounded-lg'>
          <div className="ml-4 text-blue-500 hover:text-blue-700" onClick={onClick}><CirclePlusIcon /></div>
        </Tooltip>}
        <p className="text-[20px] font-semibold mx-4">{title}</p>
        <SearchInput/>
        <UserMenu />
      </div>
    </HeaderLayout>
  );
};

export default Header;
