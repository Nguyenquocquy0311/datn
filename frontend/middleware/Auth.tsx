import { routes } from '@/constant/routes';
import { getLoggedIn } from '@/slices/redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const router = useRouter();
  //const isLoggedIn = useSelector(getLoggedIn)
  

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isLoginPage = router.pathname === routes.login
    const isPublicPage = router.pathname === routes.home || routes.reset

    if (!token && !isLoginPage && !isPublicPage) {
      router.push(routes.login);
    }
  }, []);
};
