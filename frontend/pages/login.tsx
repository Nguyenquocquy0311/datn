
import Layout from '../components/Layout'
import React from 'react'

import LoginPage from '@/components/page/LoginPage'

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
      <LoginPage/>
    </Layout>
  )
}

const Page = () => {
  return <LoginPage />
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
