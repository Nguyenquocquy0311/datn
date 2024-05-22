import React, { useState } from 'react'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react"
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '@/slices/redux';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { routes } from '@/constant/routes';
import ModalDetailUser from '../Modal/user/ModalDetailUser';

export default function UserMenu() {
    const dispatch = useDispatch()
    const userInfo = useSelector(getUserInfo)
    const router = useRouter()
    const [isOpenDetail, setIsOpenDetail] = useState(false)

    const handleShowInfo = () => {
        setIsOpenDetail(true)
    }

    const handleCloseInfo = () => {
        setIsOpenDetail(false)
    }

    const handleUpdateInfo = () => {
        if (!router.pathname.includes(routes.updateInfo)) {
            router.push(routes.updateInfo)
        }
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken'); // Lấy token từ localStorage (hoặc từ nơi bạn lưu trữ token)
        if (!token) {
            toast.error('No token found, please log in.');
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/users/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Logout failed');
                console.log('logout failed')
            }
            localStorage.removeItem('authToken');
            router.push(routes.login)
        } catch (error) {
            toast.error('Failed to log out. Please try again.')
        }
    };

    return (
        <>
            <Dropdown placement="bottom-end">
            <DropdownTrigger className='fixed right-6'>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform bg-slate-500 hover:bg-slate-400 text-white rounded-full"
                    color="secondary"
                    name={userInfo.name}
                    size="sm"
                    // src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className='bg-white rounded-lg shadow-xl p-2'>
                <DropdownItem key="profile" className="h-16 gap-2">
                    <p className="text-[16px] font-semibold">Hi, {userInfo.name}</p>
                    <p className="font-semibold">Đã đăng nhập bằng {userInfo.email}</p>
                    {/* <p className="font-semibold"></p> */}
                </DropdownItem>
                <DropdownItem key="update-info" color="danger" className='hover:bg-blue-400 hover:text-white rounded-md' onClick={handleShowInfo}>
                    My Profile
                </DropdownItem>
                <DropdownItem key="update-info" color="danger" className='hover:bg-blue-400 hover:text-white rounded-md' onClick={handleUpdateInfo}>
                    Cập nhật thông tin
                </DropdownItem>
                <DropdownItem key="logout" color="danger" className='hover:bg-blue-400 hover:text-white rounded-md' onClick={handleLogout}>
                    Đăng xuất
                </DropdownItem>
            </DropdownMenu>
            <ToastContainer />
        </Dropdown>
        <ModalDetailUser
        isOpen={isOpenDetail}
        onClose={handleCloseInfo}
        userId={userInfo._id}
      />
        </>
    )
}
