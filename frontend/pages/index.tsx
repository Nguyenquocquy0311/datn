import Admin from "@/components/page/Admin";
import LoginPage from "@/components/page/LoginPage";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  return (
    <Admin/>
    // <button onClick={() => router.push('/login')} className="bg-blue-500 p-1 rounded-md text-white">Đăng nhập</button>
  );
}
