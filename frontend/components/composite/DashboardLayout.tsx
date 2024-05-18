import React from 'react'
import Menubar from './common/Sidebar'
import Header from './header/Header'

export default function DashboardLayout({children}) {
  return (
    <>
      <Header/>
      <div className='flex'>
        <Menubar/>
        <div className='w-full'>{children}</div>
      </div>
    </>
  )
}
