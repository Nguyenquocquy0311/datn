import classnames from 'classnames';
import React, { ReactNode } from 'react';
import Logo from './Logo'; // Import component Logo
import { PromoteBanner } from './PromoteBanner';
import { useRouter } from 'next/router';

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      {/* <PromoteBanner /> */}
      <div
        className={classnames(
          'z-40 left-0 top-0 w-full h-[72px]',
          'bg-white',
          'flex items-center',
        )}
      >

        {/* Hết phần sử dụng component Logo */}
        <div className="flex items-center justify-between flex-auto">
          {children}
        </div>
        {/* {router.pathname.includes('/editor') && (
          <div className="mr-4">
            <LoginComponent />
          </div>
        )} */}
        {/*<LoginComponent />*/}
      </div>
    </>
  );
}

export default HeaderLayout;
