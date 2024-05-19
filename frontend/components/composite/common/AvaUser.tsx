import React from 'react'
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react"
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '@/slices/redux';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { routes } from '@/constant/routes';

export default function UserMenu() {
    const dispatch = useDispatch()
    const userInfo = useSelector(getUserInfo)
    const router = useRouter()

    const handleUpdateInfo = () => {
        if (!router.pathname.includes(routes.updateInfo)) {
            router.push(routes.updateInfo)
        }
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage (hoặc từ nơi bạn lưu trữ token)
        console.log(1)
        // if (!token) {
        //     toast.error('No token found, please log in.');
        //     return;
        // }
        console.log(2)
        try {
            const response = await fetch('http://localhost:4000/users/me/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(3)
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            // Xóa token khỏi localStorage sau khi logout thành công
            localStorage.removeItem('token');
            console.log(4)
            // Hiển thị thông báo thành công
            toast.success('Logged out successfully!', {
                autoClose: 2000, // Đóng sau 2 giây
                onClose: () => {
                    // Chuyển hướng người dùng đến trang đăng nhập sau khi logout thành công
                    router.push(routes.login)
                }
            })
            router.push(routes.login)
        } catch (error) {
            toast.error('Failed to log out. Please try again.')
        }
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger className='fixed right-6'>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className='bg-white rounded-lg shadow-md p-2'>
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userInfo.email}</p>
                </DropdownItem>
                <DropdownItem key="update-info" color="danger" className='hover:bg-blue-400 hover:text-white rounded-md' onClick={handleUpdateInfo}>
                    Cập nhật thông tin
                </DropdownItem>
                <DropdownItem key="logout" color="danger" className='hover:bg-blue-400 hover:text-white rounded-md' onClick={handleLogout}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
            <ToastContainer />
        </Dropdown>
    )
}
