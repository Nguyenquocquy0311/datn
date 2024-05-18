import { useRouter } from 'next/router';
import React, { useState } from 'react';
import classnames from 'classnames';
import { ListIcon } from './icon/ListIcon';
import { HomeIcon } from './icon/HomeIcon';
import { UserIcon } from './icon/UserIcon';
import { ArrowIcon } from './icon/ArrowIcon';
import { CartIcon } from './icon/CartIcon';
import { AssetIcon } from './icon/AssetIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveRequestTab,
  getRequestTab,
  getAssetTab,
  getUserTab,
  setActiveAssetTab,
  setActiveUserTab,
} from '../../../slices/redux';

const MenuBar = () => {
  const router = useRouter();
  const [narrow, setNarrow] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const isRequestTabActive = useSelector(getRequestTab)
  const isAssetTabActive = useSelector(getAssetTab)
  const isUserTabActive = useSelector(getUserTab)

  const handleToggleRequestTab = () => {
    dispatch(setActiveRequestTab(true));
    dispatch(setActiveAssetTab(false));
    dispatch(setActiveUserTab(false));
  };

  const handleToggleAssetTab = () => {
    dispatch(setActiveAssetTab(true));
    dispatch(setActiveUserTab(false));
    dispatch(setActiveRequestTab(false));
  };

  const handleToggleUserTab = () => {
    dispatch(setActiveUserTab(true));
    dispatch(setActiveRequestTab(false));
    dispatch(setActiveAssetTab(false));
  };

  return (
    <div className={classnames("fixed h-screen p-2 tlg:flex flex-col z-50 bg-slate-200", !narrow ? 'w-24' : 'w-60 shadow-md')}>
      {/*Header*/}
      <div className='flex justify-center cursor-pointer mt-3' onClick={() => setNarrow(!narrow)}>
        <ListIcon />
        {narrow && <p className='pl-4'>Logo system</p>}
      </div>
      {/* body */}
      <div className='justify-center'>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isActive && 'bg-blue-400 text-white')} onClick={() => setIsActive(true)}>
          <div className={classnames('mx-6 my-2', isActive && 'hover:text-blue-600')}>
            <HomeIcon />
          </div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Dashboard</p>
        </div>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isAssetTabActive && 'bg-blue-400 text-white')} onClick={handleToggleAssetTab}>
          <div className={classnames('mx-6 my-2')}><AssetIcon /></div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Tài sản</p>
        </div>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isRequestTabActive && 'bg-blue-400 text-white')} onClick={handleToggleRequestTab}>
          <div className={classnames('mx-6 my-2')}><ArrowIcon /></div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Yêu cầu</p>
        </div>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isUserTabActive && 'bg-blue-400 text-white')} onClick={handleToggleUserTab}>
          <div className={classnames('mx-6 my-2')}><UserIcon /></div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Người dùng</p>
        </div>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isActive && 'bg-blue-400 text-white')} onClick={() => setIsActive(true)}>
          <div className={classnames('mx-6 my-2')}><HomeIcon /></div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Bảo trì</p>
        </div>
        <div className={classnames('my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg', narrow && 'flex',  isActive && 'bg-blue-400 text-white')} onClick={() => setIsActive(true)}>
          <div className={classnames('mx-6 my-2')}><CartIcon /></div>
          <p className={classnames('mt-2 text-[12px] text-center', narrow && 'text-[16px]')}>Mua sắm</p>
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
