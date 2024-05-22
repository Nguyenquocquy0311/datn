import React from 'react'

import LoginPage from '@/components/page/LoginPage'
import Admin from '@/components/page/Admin'
import Layout from '@/components/Layout'
import User from '@/components/page/User'
import Manager from '@/components/page/Manager'

const RemoveBackgroundPage = () => {
    return (
        <Layout
            meta={{
                title: 'Login',
                description: 'Đăng nhập để tiếp tục đến với dịch vụ của chúng tôi',
            }}
        >
            <Manager />
        </Layout>
    )
}

const Page = () => {
    return <Manager />
}

// export async function getStaticProps(ctx: NextPageContext) {
//   return {
//     props: {
//       ...(await serverSideTranslations(ctx.locale, [
//         TranslationFileKey.Home,
//         TranslationFileKey.Common,
//         TranslationFileKey.RemoveBgHomePage,
//         TranslationFileKey.SubPage,
//       ])),
//     },
//   }
// }

export default Page
