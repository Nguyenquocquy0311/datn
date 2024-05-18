import React, { useEffect } from 'react'
import Menubar from '../composite/common/Sidebar'
import Header from '../composite/header/Header'
import CreateAccountPage from './CreateAcc'
import ListUser from '../composite/ListUser'
import ListAssets from '../composite/ListAssets'
import {useState} from "react";
import ModalUser from '../composite/Modal/ModalUser'
import ListRequests from '../composite/ListRequest'
import SideBar from '../composite/common/Sidebar'
import MenuBar from '../composite/common/Sidebar'
import { useRouter } from 'next/router'
import { getAssetTab, getRequestTab, getUserTab, setActiveUserTab } from '@/slices/redux'
import { useDispatch, useSelector } from 'react-redux'

export default function Admin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const handleAddUser = () => {
    if (!router.pathname.includes('/admin/create-user')) {
      router.push('/admin/create-user')
    }
  }
  const isRequestTabActive = useSelector(getRequestTab)
  const isAssetTabActive = useSelector(getAssetTab)
  const isUserTabActive = useSelector(getUserTab)

  useEffect(() => {
    dispatch(setActiveUserTab(true));
  },[])
  
  return (
    <div className='bg-slate-200'>
      
      <div className='flex h-screen'>
        <MenuBar/>
        <div className='flex flex-col ml-24 w-full h-full'>
          <Header onClick={handleAddUser} title='Danh sách tài sản'/>
        {isUserTabActive && <ListUser/> }
        {isAssetTabActive && <ListAssets/>}
        {isRequestTabActive && <ListRequests/>}
        </div>
      </div>
    </div>
  )
}
