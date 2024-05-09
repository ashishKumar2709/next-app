import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "next-app",
  description: "Discover and Share",
};

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <body className="bg-gray-200 font-sans">
        <div>
          <Provider>
            <main>
              <Nav />
              {children}
            </main>
          </Provider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
