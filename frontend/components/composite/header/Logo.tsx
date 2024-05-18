import { useRouter } from 'next/router';
import React from 'react';

const Logo = ({onClick}) => {
    const router = useRouter()

    const GoToHome = () => {
        if (!router.pathname.includes('/')) {
            router.push('/')
        }
    }
  return (
    <img
      // src="asset/Logo.png"
      src='https://atherosclerosis.gr/wp-content/uploads/2017/03/Asset-logo.png'
      alt="Logo"
      className="w-20 h-18"
      onClick={onClick}
    />
  );
}

export default Logo;
