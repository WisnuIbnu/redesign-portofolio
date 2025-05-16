'use client'
import About from "./components/About";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";
import Header from "./components/Header";
import Portofolio from "./components/Portofolio";
import Servise from "./components/Services";
import Skill from "./components/Skill";


export default function Home() {
  return (
    <>
    <Header />
    <About />
    <Experiences />
    <Skill />
    <Servise />
    <Portofolio />
    <Contact />
    </>
  );
}
