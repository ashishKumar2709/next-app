import Head from 'next/head';
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "next-app",
  description: "Learn and Share",
};

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-200 font-sans">
        <Provider>
          <header>
            <Nav />
          </header>
          <main>
            {children}
          </main>
          <footer>
            <p className='flex justify-center text-base, light p-4 mb-2'>
              Learn & Share &copy; 2024
            </p>
          </footer>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;