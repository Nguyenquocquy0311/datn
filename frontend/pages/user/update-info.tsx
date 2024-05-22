import Admin from "@/components/page/Admin";
import LoginPage from "@/components/page/LoginPage";
import UpdateInfoPage from "@/components/page/UpdateInfo";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  return (
    <UpdateInfoPage/>
  );
}
