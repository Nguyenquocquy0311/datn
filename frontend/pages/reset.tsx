
import Layout from '../components/Layout'
import React from 'react'

import ResetPage from '@/components/page/ResetPage'

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
      <ResetPage/>
    </Layout>
  )
}

const Page = () => {
  return <ResetPage />
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
