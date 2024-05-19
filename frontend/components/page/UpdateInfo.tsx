import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserInfo } from "@/slices/redux";
import { useSelector } from "react-redux";

const UpdateInfoPage = () => {
    const router = useRouter();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [department, setDepartment] = useState("")
    const [position, setPosition] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("user")
    const [error, setError] = useState("")

    const userInfo = useSelector(getUserInfo)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Create user object
        const updatedUser = {
            name,
            email,
            department,
            position,
            password,
            role
        }

        try {
            const response = await fetch(`http://localhost:4000/users/${userInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            })

            if (!response.ok) {
                throw new Error('Failed to update user')
            }

            // Show success toast
            toast.success('User updated successfully!', {
                autoClose: 2000, 
                onClose: () => {
                    router.push("/user");
                }
            })
        } catch (error) {
            // Hiển thị toast thông báo lỗi
            toast.error('Failed to update user. Please try again.');
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <ToastContainer />
                    <h2 className="text-3xl mb-4 text-center font-bold">Cập nhật thông tin</h2>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Họ tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={userInfo.name}
                            // onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập họ tên của bạn"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Địa chỉ email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="department"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Phòng ban
                        </label>
                        <input
                            type="text"
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your department"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="position"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Vị trí
                        </label>
                        <input
                            type="text"
                            id="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your position"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="role"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Role
                        </label>
                        <input
                            id="role"
                            value={role}
                            //   onChange={(e) => setRole(e.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Cập nhật thông tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfoPage
