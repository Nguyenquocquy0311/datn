import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  meta?: {
    title: string;
    description: string;
  };
  customMeta?: JSX.Element;
  children?: React.ReactNode;
  noindex?: boolean;
}

const Layout = ({ children, customMeta, meta, noindex = false }: Props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta
          name="robots"
          content={
            noindex ? 'noindex, nofollow' : 'index, follow'
          }
        />
        <meta charSet="UTF-8" />
        <meta name="google" content="notranslate" />
        <meta name="yandex-verification" content="556d2c4c4767a8f1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="trustpilot-one-time-domain-verification-id"
          content="515d7219-47ec-487c-9435-4cb246d54d86"
        />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="revisit-after" content="1 days" />
        <meta itemProp="name" content={meta?.title} />
        <meta name="author" content="SnapTeam" />
        <meta itemProp="image" content="/preview.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta name="twitter:image:src" content="/preview.jpg" />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:site_name" content={meta?.title} />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
