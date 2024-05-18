import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoginPage = router.pathname === '/login';
    const isPublicPage = router.pathname === '/';

    if (!token && !isLoginPage && !isPublicPage) {
      router.push('/login');
    }
  }, []);

  return null;
};
