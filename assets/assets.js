import user_image from './wisnu2.jpg';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo_wisnu.png';
import logo_dark from './logo_wisnu_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './wisnu.jpg';
import download_icon from './download-icon.png';
import download_icon_dark from './download-icon_dark.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './mobile.png';
import mobile_icon from './tutor.png';
import ui_icon from './web-design.png';
import graphics_icon from './api.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import send_icon_dark from './Random.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import robotiik_logo from './robotiik.png';
import bem_filkom_logo from './bem.png';
import raja_brawijaya_logo from './raja2.png';
import lotte_scholarship_logo from './lotte.png';
import filkom_logo from './fil-removebg-preview.png';
import lps from './lps.svg';
import sewaId from '../assets/Portofolio/sewa-id.png'
import quranApp from '../assets/Portofolio/quran-app.png';
import larana_app from '../assets/Portofolio/larana-app.png';
import saddam_app from '../assets/Portofolio/sadam.png';
import prediksi_cuaca from '../assets/Portofolio/Prediksi-cuaca.png';
import almatsurat from '../assets/Portofolio/almatsurat-api.png';
import taskManager from '../assets/Portofolio/task-manager.png';
import moneyTracker from '../assets/Portofolio/money-tracking.png';
import portfolio from '../assets/Portofolio/portofolio.png';
import smkn5 from '../assets/Portofolio/smkn5.png';
import simita from '../assets/Portofolio/simita.png';
import seniReligi from '../assets/SR.png';
import diskominfo from '../assets/diskominfo.png';
import ApiProject from '../assets/Portofolio/API-Project.png';
import FrondEnd from '../assets/Portofolio/Front-end.png';
import dafidea from '../assets/dafidea.webp';
import sekawanmedia from '../assets/sekawamedia.png';

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    download_icon_dark,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    send_icon_dark,
    right_arrow_bold,
    right_arrow_bold_dark,
    filkom_logo,
    robotiik_logo,  
    bem_filkom_logo,
    raja_brawijaya_logo,
    lotte_scholarship_logo,
    lps,
    sewaId,
    quranApp,
    saddam_app,
    prediksi_cuaca,
    almatsurat,
    larana_app,
    taskManager,
    moneyTracker,
    portfolio,
    smkn5,
    simita,
    seniReligi,
    diskominfo,
    ApiProject,
    FrondEnd,
    dafidea,
    sekawanmedia
};

export const workData = [
  {
    title: 'SIMITA',
    categories: 'Laravel - Filament',
    description: `SIMITA — Sistem Informasi Inventaris OPD (Project PKL Diskominfo Nganjuk). Aplikasi web ini digunakan untuk mengelola data inventaris barang pada setiap Dinas/OPD dengan konsep Role-Based Access Control (RBAC) sehingga setiap pengguna hanya dapat mengakses data sesuai kewenangannya. Fitur mencakup manajemen inventaris, scan QR Code, laporan PDF/Excel, grafik tren data, dan manajemen pengguna/admin. Dibangun menggunakan PHP, Laravel 10, Filament 3, Laravel Sanctum, MySQL.`,
    bgImage: simita,
    demoUrl: 'https://simita.nganjukkab.go.id/',
  },
  {
    title: 'SMKN5',
    categories: 'MERN STACK',
    description: `Capstone Project — Project Manager SMKN5 Malang (MERN Stack). Aplikasi ini memungkinkan manajemen workspace, project, dan task dengan autentikasi menggunakan email dan akun google, Role-Based Access Control (RBAC), filtering, pagination, dan analytics. Dibangun menggunakan MongoDB, Express.js, React.js, Node.js, Axios, dan TypeScript, serta dideploy di Vercel.`,
    bgImage: smkn5,
    demoUrl: 'https://smkn5-malang.vercel.app/',
  },
  {
    title: 'FinFlow App',
    categories: 'React Native',
    description: 'FinFlow (Financial Flow) is a personal finance tracking app that helps users track income and expenses to make financial management easier. Key features include daily transaction recording, category grouping (food, transportation, bills, entertainment), weekly or monthly report summaries, financial visualization charts, and a budgeting feature to limit spending by category. With a simple and informative interface, the Money Tracker App is a practical solution for managing finances efficiently and effectively.',
    bgImage: moneyTracker,
    demoUrl: 'https://github.com/WisnuIbnu',
  },
  {
    title: 'TaskOrganizer',
    categories: 'MERN Stack',
    description: 'TaskOrganizer is a private project built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing daily tasks efficiently. It features user authentication, CRUD operations for tasks, and a responsive UI. The app allows users to create, update, and delete tasks, set priorities, and track progress, making personal productivity management simple and effective. New feature: Sends H-1 task notifications via Gmail to remind users of upcoming tasks.',
    bgImage: taskManager,
    demoUrl: 'https://task-manager-app-orpin-eta.vercel.app/',
  },
];

export const workDataS = [
  {
    title: 'SIMITA',
    categories: 'Laravel - Filament',
    description: `SIMITA — Inventory Information System for Regional Apparatus Organizations (OPD) in Nganjuk Regency, East Java. This web application is used to manage inventory data for each Department/OPD using the Role-Based Access Control (RBAC) concept so that each user can only access data according to their authority. Features include inventory management, QR Code scanning, PDF/Excel reports, data trend graphs, and user/admin management. Built using PHP, Laravel 10, Filament 3, Laravel Sanctum, MySQL.`,
    bgImage: simita,
    demoUrl: 'https://simita.nganjukkab.go.id/',
  },
  {
    title: 'SMKN5',
    categories: 'MERN STACK',
    description: `Capstone Project — Project Manager SMKN5 Malang (MERN Stack). This application enables workspace, project, and task management with authentication using email and Google accounts, Role-Based Access Control (RBAC), filtering, pagination, and analytics. Built using MongoDB, Express.js, React.js, Node.js, Axios, and TypeScript, and deployed on Vercel.`,
    bgImage: smkn5,
    demoUrl: 'https://smkn5-malang.vercel.app/',
  },
  {
    title: 'FinFlow App',
    categories: 'React Native',
    description: 'FinFlow (Financial Flow) is a personal finance tracking app that helps users track income and expenses to make financial management easier. Key features include daily transaction recording, category grouping (food, transportation, bills, entertainment), weekly or monthly report summaries, financial visualization charts, and a budgeting feature to limit spending by category. With a simple and informative interface, the Money Tracker App is a practical solution for managing finances efficiently and effectively.',
    bgImage: moneyTracker,
    demoUrl: 'https://github.com/WisnuIbnu',
  },
  {
    title: 'TaskOrganizer',
    categories: 'MERN Stack',
    description: 'TaskOrganizer is a private project built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing daily tasks efficiently. It features user authentication, CRUD operations for tasks, and a responsive UI. The app allows users to create, update, and delete tasks, set priorities, and track progress, making personal productivity management simple and effective. New feature: Sends H-1 task notifications via Gmail to remind users of upcoming tasks.',
    bgImage: taskManager,
    demoUrl: 'https://task-manager-app-orpin-eta.vercel.app/',
  },
  {
    title: 'Larana Resto',
    categories: 'React Js',
    description: 'Larana Resto is a restaurant website developed as the final project for the Perancangan Antarmuka Pengguna (PAP) course. It allows users to browse menus, place orders, and view restaurant information. The site is designed for a seamless and visually appealing user experience, with responsive layouts and intuitive navigation. Features include menu browsing, order placement, and contact information.',
    bgImage: larana_app,
    demoUrl: 'https://larana-resto.vercel.app/',
  },
  {
    title: 'Al-Matsurat API',
    categories : 'API-Next.JS',
    description: 'Al-Matsurat API is a web service that provides access to the Al-Matsurat prayer book, which contains daily prayers and supplications for Muslims. This API allows developers to integrate Al-Matsurat content into their applications, enabling users to access and read the prayers conveniently.',
    bgImage: almatsurat,
    demoUrl: 'https://almatsurat-fawn.vercel.app/',
  },
  {
    title: 'Quran App',
    categories : 'Frond-End',
    description: 'A Quran application is a digital platform that provides access to the Quran, the holy book of Islam. It typically includes features such as text display, audio recitation, translation, and search functionality. The app aims to facilitate reading, understanding, and memorizing the Quran for users worldwide.',
    bgImage: quranApp,
    demoUrl: 'https://quran-app-navy.vercel.app/quran',
  },
  {
    title: 'Portofolio',
    categories : 'Frond-End',
    description: "This is a personal portfolio website I developed to showcase my work, experience, and development projects in the technology field. It's designed with a modern and responsive design using the React framework and a clean UI for ease of access across various devices. Through this site, visitors can learn more about my profile, view project results, and access various information related to web and app development work I have done.",
    bgImage: portfolio,
    demoUrl: 'https://wisnuibnu-dev.vercel.app/',
  },
  {
    title: 'SewaCar.id',
    categories : 'Frond-End',
    description: 'A final project of subject perancangan antarmuka pengguna is a car rental website that allows users to easily rent cars online. The website is designed to provide a user-friendly experience, with features such as car selection, booking, and payment processing. It aims to simplify the car rental process and enhance customer convenience.',
    bgImage: sewaId,
    demoUrl: 'https://sewa-car.vercel.app/',
  },
  {
    title: 'Prediksi-Cuaca',
    categories : 'Weather Current',
    description: 'This is a weather detector website using OpenWeather API equipped with features such as current weather information, weather predictions, location-based search, and real-time data such as temperature, humidity, and wind speed. Designed to provide ease and informative experience for users.',
    bgImage: prediksi_cuaca,
    demoUrl: 'https://prediksi-cuaca-yuuk.vercel.app/',
  },
  {
    title: 'Saddam-Store',
    categories : 'Web Design',
    description: 'My role in developing the Saddam Drum Band website was as a programmer using React JS. This website is designed to make it easier for customers to find and buy drum band equipment, such as uniforms, shoes, hats and other accessories, including dusters. With React JS technology, I ensure a responsive, fast and intuitive user experience',
    bgImage: saddam_app,
    demoUrl: 'https://saddam-drum-band.vercel.app/',
  },
  {
    title: 'TravelingYuk',
    categories : 'Front-End',
    description: 'I am responsible for designing an attractive, responsive, and aesthetic front-end. This is the final project of the PHP Website Programming course, with a focus on modern appearance and ease of navigation for users. I also ensure that the visual elements support the overall functionality of the site.',
    bgImage: ApiProject,
    demoUrl: 'https://github.com/AlViToo07/Hilinggg',
  },
  {
    title: 'FIA.ID',
    categories : 'API',
    description: 'My responsibility in this project is to develop API for two websites. This is the final assignment of the Integrated System Technology course. These APIs support various functions and ensure smooth communication between the front-end and back-end systems.',
    bgImage: FrondEnd,
    demoUrl: 'https://example.com/photography-portfolio',
  }
];

export const serviceData = [
    { icon: assets.web_icon, title: 'Web Development', description: 'Web development is the process of building, programming...', link: '' },
    { icon: assets.mobile_icon, title: 'Tutors', description: 'Coding tutors involve providing guidance and instruction in programming to ...', link: '' },
    { icon: assets.ui_icon, title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
    { icon: assets.graphics_icon, title: 'API Development', description: 'Creative API solutions to enhance share data...', link: '' },
]

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript, Php, Typescript, React Js, Next Js, Laravel' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'B.Tech in Computer Science' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 9 projects' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];

export const experienceData = [
    {
        title: 'Faculty Of Computer Science (FILKOM UB)',
        position: 'Practicum Assistant Of Java Basic Programming',
        duration: 'Aug 2024 - Nov 2024',
        description: [
            'Taught practicum sessions for courses Basic Programming',
            'Taught 38 students about Java basic programming',
            'Conducted practicum sessions and provided practicum feedback and assessment'
        ],
        logo: assets.filkom_logo 
    },
    {
        title: 'Faculty Of Computer Science (FILKOM UB)',
        position: 'FILKOM UB Community Service Team with the title AI-Based Digital Marketing Application (2024)',
        duration: 'Jul 2024 - Aug 2024',
        description: [
            'Creating an AI-Based Digital Marketing Application Module',
            'A total of 76 people took part in the AI-based digital marketing training webinar.'
        ],
        logo: assets.filkom_logo
    },
    {
        title: 'Raja Brawijaya UB Committee 2024',
        position: 'Staff Secretariat (Kestari)',
        duration: 'Jul 2024 - Aug 2024',
        description: [
            'Recap and manage attendance for Raja Brawijaya UB 2024, involving around 15,000 new students and the committee.',
            'Organize and document correspondence in an orderly manner, including recording incoming and outgoing letters',
        ],
        logo: assets.raja_brawijaya_logo
    },
    {
        title: 'BEM FILKOM UB 2023/2024',
        position: 'Staff Administration and Finance',
        duration: 'Feb 2024 - Dec 2024',
        description: [
            'Managed the administrative needs and maintained the organization\'s inventory',
            'Managed the submission of work program administration documents, including proposals, accountability reports, final activity reports, letters, etc.',
        ],
        logo: assets.bem_filkom_logo
    },
    {
        title: 'Lotte Mart Foundation',
        position: 'Scholarship Awardee',
        duration: 'Jan 2024 - Dec 2024',
        description: [
            'Financial Support: Helps fund tuition, research, and other academic needs.',
            'Networking Opportunities: Connect with a community of accomplished students, professional mentors, and collaboration opportunities.',
        ],
        logo: assets.lotte_scholarship_logo
    },
    {
        title: 'Faculty Of Computer Science (FILKOM UB)',
        position: 'Practicum Assistant Of Java Object Oriented Programming',
        duration: 'Feb 2025 - Jun 2025',
        description: [
            'Taught practicum sessions for courses Object Oriented Programming',
            'Taught 33 students about Java Object Oriented Programming',
            'Conducted practicum sessions and provided practicum feedback and assessment'
        ],
        logo: assets.filkom_logo
    },
    {
        title: 'ROBOTIIK 2025 (FILKOM UB)',
        position: 'General Secretary 2',
        duration: 'Feb 2025 - Dec 2025',
        description: [
            'Managed administrative needs including organizational inventory, documents, records, and archives',
            'Managed the submission of work program administration documents, including proposals, accountability reports, final activity reports, letters, etc'
        ],
        logo: assets.robotiik_logo
    },
        {
        title: 'LPS Scholarship Program',
        position: 'Scholarship Awardee',
        duration: 'Jan 2025 - Dec 2025',
        description: [
            'Financial Support: Helps fund tuition, research, and other academic needs.',
            'Networking Opportunities: Connect with a community of accomplished students, professional mentors, and collaboration opportunities.',
        ],
        logo: assets.lps
    },
    {
        title: 'Faculty Of Computer Science (FILKOM UB)',
        position: 'Practicum Assistant Of Web Programming',
        duration: 'Aug 2025 - Dec 2025',
        description: [
            'Taught practicum sessions for courses Web Programming',
            'Taught 32 students about Web Programming',
            'Conducted practicum sessions and provided practicum feedback and assessment'
        ],
        logo: assets.filkom_logo 
    },
    {
        title: 'Seni Religi UB 2026',
        position: 'General Secretary 1',
        duration: 'Januari 2026 - Present',
        description: [
            'Managed administrative needs including organizational inventory, documents, records, and archives',
            'Managed the submission of work program administration documents, including proposals, accountability reports, final activity reports, letters, etc'
        ],
        logo: assets.seniReligi
    },
    {
        title: 'Diskominfo Ngajuk',
        position: 'Web Development Intership',
        duration: 'Dec 2025 - Jan 2026',
        description: [
            'Developed SIMITA — OPD Inventory Information System using Laravel 10 and Filament 3.',
            ' Created features including inventory management, QR code scanning, PDF/Excel reports, data trend graphs, user/admin management, and product usage based on transaction'
        ],
        logo: assets.diskominfo
    },
    {
        title: 'Dafidea Kreasi Technology',
        position: 'Quality Assurance Intership',
        duration: 'Jan 2026 - Present',
        description: [
            'Conducted testing and quality assurance for web and mobile applications to ensure functionality, usability, and performance.',
            'Collaborated with development teams to identify and resolve issues, contributing to the improvement of product quality and user experience.'
        ],
        logo: assets.dafidea
    },
    {
        title: 'PT. Sekawan Media',
        position: 'Fullstack Developer Intership',
        duration: 'Jan 2026 - Present',
        description: [
            'Maintained and enhanced existing web applications, ensuring optimal performance and user experience. with Modullar & service pattern, and implemented new features based on client requirements.',
        ],
        logo: assets.sekawanmedia
    },
    {
        title: 'Faculty Of Computer Science (FILKOM UB)',
        position: 'Practicum Assistant Of User Interface Designing',
        duration: 'Jan 2026 - Present',
        description: [
            'Taught practicum sessions for courses User Interface Designing',
            'Taught 42 students about User Interface Designing',
            'Conducted practicum sessions and provided practicum feedback and assessment'
        ],
        logo: assets.filkom_logo 
    },
];

export const Tools = [
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Apache', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg' },
    { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
    { name: 'Intellij', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg' },
    { name: 'Composer', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/composer/composer-original.svg' },
    { name: 'Wordpress', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg' },
    { name: 'Ubuntu', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg' }
];

export const Skills = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'MySql', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'MariaDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original-wordmark.svg' },
    { name: 'dbeaver', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dbeaver/dbeaver-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg' },
    { name: 'Devicon', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg' },
    { name: 'Typescript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Javascript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
];

