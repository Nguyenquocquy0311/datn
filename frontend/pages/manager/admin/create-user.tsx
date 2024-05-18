import React from 'react'

import LoginPage from '@/components/page/LoginPage'
import Admin from '@/components/page/Admin'
import Layout from '@/components/Layout'
import CreateAccountPage from '@/components/page/CreateAcc'

const RemoveBackgroundPage = () => {
    //const router = useRouter()
    //const { t: tSub } = useTranslationWithHTMLParser(TranslationFileKey.SubPage)
    //const { t: tSchema } = useTranslationWithHTMLParser(
    // TranslationFileKey.FAQSchema
    //)

    return (
        <Layout
            meta={{
                title: 'Login',
                description: 'Đăng nhập để tiếp tục đến với dịch vụ của chúng tôi',
            }}
        >
            <CreateAccountPage />
        </Layout>
    )
}

const Page = () => {
    return <CreateAccountPage />
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
