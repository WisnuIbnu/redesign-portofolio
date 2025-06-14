'use client'
import { useState, useEffect, useContext } from 'react';
import { assets, workData, workDataS } from '@/assets/assets'
import Image from 'next/image'
import { ThemeContext } from '../context/ThemeContext';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [bgImage, setBgImage] = useState(null);
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    setBgImage(project.bgImage);
  }, [project.bgImage]);

  if (!bgImage) return null; 

  const bgModal = theme === 'dark' ? 'bg-[#1F2A44]' : 'bg-white'
  const liveDemo = theme === 'dark' ? ' bg-slate-800 text-sky-600 border-2 hover:bg-white border-sky-600' : 'text-sky-600 border-sky-600 border-2 hover:bg-slate-800 hover:text-white'

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Background overlay dengan transparansi 50% */}
      <div 
        className="absolute inset-0 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />
      
      {/* Modal container dengan animasi scale */}
      <div className={`relative w-full max-w-lg ${bgModal} rounded-xl overflow-hidden shadow-2xl font-Ovo transform transition-all duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        {/* Header dengan efek parallax */}
        <div className="relative h-64 bg-gray-100 overflow-hidden group">
          <Image
            src={bgImage}
            alt={project.title || 'Project image'}
            fill
            className="p-8 sm:px-14 sm:py-5"
          />
          <button
            onClick={onClose}
            className="group absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
          >
            {/* svg tetap seperti di atas */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black transition-transform duration-200 hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Konten dengan efek fade-in */}
        <div className="p-6 md:p-8">
          <div className=" space-y-4">
            <h2 className="text-3xl font-bold mb-2 animate-fadeIn ">
              {project.title}
            </h2>
            <p className=" mb-2 animate-fadeIn delay-100 ">
              {project.categories}
            </p>
            <p className="mb-6 text-xs sm:text-sm animate-fadeIn delay-100 ">
              {project.description}
            </p>
          </div>
          <div className=" flex flex-row gap-4 animate-fadeIn delay-400">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 font-bold  rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${liveDemo}`}
                >
                  Live Demo 
                </a>
              )}
                <button
                onClick={onClose}
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-white bg-red-500 bor font-medium rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                  Close
                </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portofolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

    const { theme } = useContext(ThemeContext)

    const iconRight = theme === 'dark' ? assets.right_arrow_bold_dark : assets.right_arrow_bold
  return (
    <div id="portofolio" className='w-full px-[12%] py-12 scroll-m-20'>
      <h4 className='text-center mb-2 text-lg font-Ovo mt-20'>Portofolio</h4>
      <h2 className='text-center text-5xl font-Ovo'>My Latest Project</h2>

      <p className='text-center max-w-2xl mx-auto text-lg mt-5 mb-12 font-Ovo'>
        During my time at the college, I have worked on several projects that are interesting and relevant to my field of study.
      </p>

     <div className='grid grid-cols-1 sm:grid-cols-4 gap-5'>
         {workDataS.map((project, index) => {
           const sendIcon = theme === 'dark' ? assets.send_icon_dark : assets.send_icon;
           const bgCard = theme === 'dark' ? 'bg-[#1F2A44]' : 'bg-white';
           const bgSendIcon = theme === 'dark'
             ? 'border-white shadow-[2px_2px_0_#fff] group-hover:shadow-[3px_3px_0_#fff]'
             : 'border-black shadow-[2px_2px_0_#000] group-hover:shadow-[3px_3px_0_#000]';
 
           return (
             <div 
               className='aspect-square relative rounded-lg overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]'
               key={index}
               onClick={() => openModal(project)}
             >
               {/* Gambar background */}
               <Image
                 src={project.bgImage}
                 alt={project.title || 'Project image'}
                 fill
                 className="object-cover object-center"
                 priority
               />
 
               {/* Gradient overlay */}
               <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
 
               {/* Content card */}
               <div className={`${bgCard} w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 transition-all hover:shadow-xl`}>
                 <div>
                   <h2 className='font-semibold group-hover:text-lime-600 transition-colors duration-300'>{project.title}</h2>
                   <p className='text-sm transition-colors duration-300'>{project.categories}</p>
                 </div>
                 <div className={`border rounded-full w-8 aspect-square flex items-center justify-center group-hover:bg-lime-500 group-hover:-translate-y-0.5 transition-all duration-300 ${bgSendIcon}`}> 
                   <Image src={sendIcon} alt='' className='w-5 group-hover:rotate-12 transition-transform duration-300' />
                 </div>
               </div>
             </div>
           );
           })}
      </div>

      <a href="/">
        <button className={`w-max flex items-center justify-center gap-2 border-[0.5px] rounded-full py-3 px-6 mx-auto my-20 lightHover-background transition duration-500 cursor-pointer ${theme === 'dark' ? ' text-white hover:text-slate-900' : ' text-black'}`}>
          Back To Main<Image src={iconRight} alt='' className='w-4' />
        </button>
      </a>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default Portofolio;
