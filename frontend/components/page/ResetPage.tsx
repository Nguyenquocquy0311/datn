import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from "@/constant/routes";

const ResetPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [showBtnLogIn, setShowBtnLogIn] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/users/forgot-password/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send reset password email');
      }

      // Hiển thị thông báo thành công
      toast.success('Reset password email sent successfully!', {
        autoClose: 1000, // Đóng sau 2 giây
        onClose: () => {
          // Chuyển hướng người dùng đến trang đăng nhập hoặc trang khác nếu cần
          router.push(routes.login);
        }
      });
      setShowBtnLogIn(true)
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error('Failed to send reset password email. Please try again.');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 mr-4">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full h-auto"
            alt="Sample image"
          />
        </div>
        <div className="w-1/2">
          <ToastContainer/>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-[80vh]"
          >
            <h2 className="text-3xl mb-4 text-center font-bold text-blue-600">Reset password</h2>
            {/* <h3 className="text-2xl mb-4 text-center font-bold">TO YOUR ACCOUNT</h3> */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Gửi email
              </button>
              {showBtnLogIn && <button onClick={() => router.push(routes.login)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đăng nhập</button>}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPage;
