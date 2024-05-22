import Image from 'next/image';
import { useRouter } from 'next/router';
import { routes } from '@/constant/routes';

export default function LandingPage() {
  const router = useRouter();

  // Function to handle login button click
  const handleLogin = () => {
    router.push(routes.login);
  };

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <Image
        src="/public/background.jpg" 
        // alt="Background Image"
        layout="fill"
        objectFit="cover"
      />

      {/* Dark overlay to improve text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Chào mừng đến với hệ thống quản lý tài sản doanh nghiệp !
        </h1>
        {/* Login Button */}
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}
