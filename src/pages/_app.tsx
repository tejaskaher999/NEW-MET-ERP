import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Add a type for the NextPage with a custom layout property
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleLinkClick = (href: string) => {
        if (router.asPath !== href) {
            router.push(href);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Or your loading component
    }

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

    return (
        <AnimatePresence mode="wait">
            {getLayout(<Component {...pageProps} handleLinkClick={handleLinkClick} />)}
        </AnimatePresence>
    )
}