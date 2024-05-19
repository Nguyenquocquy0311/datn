import { routes } from '@/constant/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoginPage = router.pathname === routes.login
    const isPublicPage = router.pathname === routes.home || routes.reset

    if (!token && !isLoginPage && !isPublicPage) {
      router.push(routes.login);
    }
  }, []);

  return null;
};
