import Head from 'next/head';
import "@styles/global.css";
import { ReactNode } from 'react';
import dynamic from "next/dynamic";
import NavSkeleton from '@components/NavSkeleton';
import Provider from '@components/Provider';
import { getServerSession } from "next-auth/next"

const Nav = dynamic(() => import("@components/Nav"), {
  loading: () => <NavSkeleton/>,
})

export const metadata = {
  title: "next-app",
  description: "Learn and Share",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async({ children }) => {
  const session:any = await getServerSession()
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-200 font-sans">
        <Provider session={session}>
          <header>
            <Nav />
          </header>
          <main>
            {children}
          </main>
          <footer>
            <p className='flex justify-center text-base light p-4 mb-2'>
              Learn & Share &copy; 2024
            </p>
          </footer>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;