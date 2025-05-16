import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ThemeContextProvider } from "./context/ThemeContext";
import ThemeWrapper from "./providers/ThemeWrapper";
import 'aos/dist/aos.css';
import './globals.css';
config.autoAddCss = false


const outfit = Outfit({
  subsets: ["latin"], weight : ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight : ["400"]
});

export const metadata = {
  title: "Wisnu Ibnu's Portofolio",
  description: "A Frontend Developer Based in Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden`}
      >
      <ThemeContextProvider>
        <ThemeWrapper>
          <Navbar />
          {children}
          <Footer />
        </ThemeWrapper>
      </ThemeContextProvider>
      </body>
    </html>
  );
}
