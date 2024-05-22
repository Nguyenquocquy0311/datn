
import Layout from '../components/Layout'
import React, { useEffect } from 'react'

import LoginPage from '@/components/page/LoginPage'

const MainPage = () => {

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      localStorage.removeItem('authToken')
    }
  },[])

  return (
    <Layout
      meta={{
        title: 'Login',
        description: 'Đăng nhập để tiếp tục đến với dịch vụ của chúng tôi',
      }}
    >
      <LoginPage/>
    </Layout>
  )
}

const Page = () => {
  return <LoginPage />
}

export default Page
