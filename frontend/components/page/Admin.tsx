import React, { useEffect } from 'react'
import Menubar from '../composite/common/Sidebar'
import Header from '../composite/header/Header'
import CreateAccountPage from './CreateAcc'
import ListUser from '../composite/ListUser'
import ListAssets from '../composite/ListAssets'
import {useState} from "react";
import ModalUser from '../composite/Modal/user/ModalEditUser'
import ListRequests from '../composite/ListRequest'
import SideBar from '../composite/common/Sidebar'
import MenuBar from '../composite/common/Sidebar'
import { useRouter } from 'next/router'
import { getAssetTab, getDashboardTab, getPlanTab, getRequestTab, getUserTab, setActiveAssetTab, setActiveDashboardTab, setActiveUserTab } from '@/slices/redux'
import { useDispatch, useSelector } from 'react-redux'
import LineChart from '../composite/common/LineChart'
import { routes } from '@/constant/routes'
import { ShoppingPlan } from '../composite/ShoppingPlan'

export default function Admin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleAddUser = () => {
    if (!router.pathname.includes(routes.createUser)) {
      router.push(routes.createUser)
    }
  }

  const handleAddAsset = () => {
    console.log('add asset')
  }
  const isRequestTabActive = useSelector(getRequestTab)
  const isAssetTabActive = useSelector(getAssetTab)
  const isUserTabActive = useSelector(getUserTab)
  const isDashboardTabActive = useSelector(getDashboardTab)
  const isPlanTabActive = useSelector(getPlanTab)

  let title = 'Dashboard'
  if (isUserTabActive) title = 'Danh sách người dùng';
  if (isAssetTabActive) title = 'Danh sách tài sản';
  if (isRequestTabActive) title = 'Danh sách yêu cầu';
  if (isDashboardTabActive) title = 'Dashboard';

  useEffect(() => {
    dispatch(setActiveDashboardTab(true));
    dispatch(setActiveUserTab(false));
    dispatch(setActiveAssetTab(false));
  },[])
  
  return (
    <div className='bg-slate-200'>
      <div className='flex h-screen'>
        <MenuBar/>
        <div className='flex flex-col ml-24 w-full h-full'>
          <Header onClick={handleAddUser} title={title}/>
          {isUserTabActive && <ListUser/> }
          {isAssetTabActive && <ListAssets/>}
          {isRequestTabActive && <ListRequests/>}
          {isDashboardTabActive && <LineChart />}
        </div>
      </div>
    </div>
  )
}
