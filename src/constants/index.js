import { asset } from "../utils/asset";

/* =======================
   NAVIGATION
======================= */
const navLinks = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 3, name: "Contact", type: "contact" },
  { id: 4, name: "Resume", type: "resume" },
];

const navIcons = [
  { id: 1, img: asset("icons/wifi.svg") },
  { id: 2, img: asset("icons/search.svg") },
  { id: 3, img: asset("icons/user.svg") },
  { id: 4, img: asset("icons/mode.svg") },
];

/* =======================
   DOCK
======================= */
const dockApps = [
  { id: "finder", name: "Portfolio", icon: asset("images/finder.png"), canOpen: true },
  { id: "safari", name: "Articles", icon: asset("images/safari.png"), canOpen: true },
  { id: "photos", name: "Gallery", icon: asset("images/photos.png"), canOpen: true },
  { id: "contact", name: "Contact", icon: asset("images/contact.png"), canOpen: true },
  { id: "terminal", name: "Skills", icon: asset("images/terminal.png"), canOpen: true },
  { id: "trash", name: "Archive", icon: asset("images/trash.png"), canOpen: false },
];

/* =======================
   BLOG
======================= */
const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title: "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: asset("images/blog1.png"),
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: asset("images/blog2.png"),
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: asset("images/blog3.png"),
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

/* =======================
   TECH STACK
======================= */
const techStack = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS", "Hono"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "Docker"] },
];

/* =======================
   SOCIALS
======================= */
const socials = [
  { id: 1, text: "Github", icon: asset("icons/github.svg"), bg: "#f4656b", link: "https://github.com/dyonaat" },
  { id: 2, text: "Platform", icon: asset("icons/whatsapp1.svg"), bg: "#4bcb63", link: "https://wa.me/6281383674048/" },
  { id: 3, text: "Twitter/X", icon: asset("icons/twitter.svg"), bg: "#ff866b", link: "#" },
  { id: 4, text: "LinkedIn", icon: asset("icons/linkedin.svg"), bg: "#05b6f6", link: "#" },
];

/* =======================
   PHOTOS & GALLERY
======================= */
const photosLinks = [
  { id: 1, icon: asset("icons/gicon1.svg"), title: "Library" },
  { id: 2, icon: asset("icons/gicon2.svg"), title: "Memories" },
  { id: 3, icon: asset("icons/file.svg"), title: "Places" },
  { id: 4, icon: asset("icons/gicon4.svg"), title: "People" },
  { id: 5, icon: asset("icons/gicon5.svg"), title: "Favorites" },
];

const gallery = [
  { id: 1, img: asset("images/gal1v.png") },
  { id: 2, img: asset("images/gal2v.png") },
  { id: 3, img: asset("images/gal3v.png") },
  { id: 4, img: asset("images/gal4v.png") },
];

/* =======================
   LOCATIONS
======================= */

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: asset("icons/work.svg"),
  kind: "folder",
  children: [
    // ======================
    // PROJECT 1 — NIKE
    // ======================
    {
      id: "nike",
      name: "Nike Ecommerce",
      icon: asset("images/folder.png"),
      kind: "folder",
      position: "",
      children: [
        {
          id: "nike-txt",
          name: "Nike Project.txt",
          icon: asset("images/txt.png"),
          kind: "file",
          fileType: "txt",
          description: [
            "Nike eCommerce website with modern UI.",
            "Built using Next.js and Tailwind CSS.",
          ],
        },
        {
          id: "nike-url",
          name: "nike.com",
          icon: asset("images/safari.png"),
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/fZdTYswuZjU",
        },
        {
          id: "nike-img",
          name: "nike.png",
          icon: asset("images/image.png"),
          kind: "file",
          fileType: "image",
          imageURL: asset("images/project-1.png"),
        },
      ],
    },

    // ======================
    // PROJECT 2 — AI RESUME
    // ======================
    {
      id: "ai",
      name: "AI Resume Analyzer",
      icon: asset("images/folder.png"),
      kind: "folder",
      position: "",
      children: [
        {
          id: "ai-txt",
          name: "AI Resume.txt",
          icon: asset("images/txt.png"),
          kind: "file",
          fileType: "txt",
          description: [
            "AI-powered resume analyzer.",
            "Gives feedback on ATS & keywords.",
          ],
        },
        {
          id: "ai-url",
          name: "ai-resume.com",
          icon: asset("images/safari.png"),
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/iYOz165wGkQ",
        },
        {
          id: "ai-img",
          name: "ai.png",
          icon: asset("images/image.png"),
          kind: "file",
          fileType: "image",
          imageURL: asset("images/project-2.png"),
        },
      ],
    },

    // ======================
    // PROJECT 3 — FOOD APP
    // ======================
    {
      id: "food",
      name: "Food Delivery App",
      icon: asset("images/folder.png"),
      kind: "folder",
      position: "",
      children: [
        {
          id: "food-txt",
          name: "Food App.txt",
          icon: asset("images/txt.png"),
          kind: "file",
          fileType: "txt",
          description: [
            "Mobile food delivery app.",
            "Built using React Native.",
          ],
        },
        {
          id: "food-url",
          name: "food-app.com",
          icon: asset("images/safari.png"),
          kind: "file",
          fileType: "url",
          href: "https://youtu.be/LKrX390fJMw",
        },
        {
          id: "food-img",
          name: "food.png",
          icon: asset("images/image.png"),
          kind: "file",
          fileType: "image",
          imageURL: asset("images/project-3.png"),
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "Profile",
  icon: asset("icons/info.svg"),
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: asset("images/image.png"),
      kind: "file",
      fileType: "image",
      imageURL: asset("images/alfath.jpg"),
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: asset("images/txt.png"),
      kind: "file",
      fileType: "txt",
      description: [
        "Hey! I’m Alfath 👋, a web developer who loves building interactive experiences.",
        "Specialized in React, Next.js, and modern UI.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: asset("icons/file.svg"),
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: asset("images/pdf.png"),
      kind: "file",
      fileType: "pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: asset("icons/trash.svg"),
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash.png",
      icon: asset("images/image.png"),
      kind: "file",
      fileType: "image",
      imageURL: asset("images/trash-1.png"),
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};



/* =======================
   EXPORTS
======================= */
export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

/* =======================
   WINDOW CONFIG
======================= */
const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imagefile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
