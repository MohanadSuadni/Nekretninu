import { NextResponse } from "next/server";

const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "/#blog" },
];

const features = [
    {
        id: 1,
        imgSrc: "/images/features/rating.svg",
        title: "Great Experience",
        description: "Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
    },
    {
        id: 2,
        imgSrc: "/images/features/Give-Women's-Rights.svg",
        title: "Great Experience",
        description: "Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
    },
    {
        id: 3,
        imgSrc: "/images/features/live-chat.svg",
        title: "Great Experience",
        description: "Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing Variou"
    }
];

const searchOptions = {
    keywords: [
        { value: '', label: 'Keyword', placeholder: 'Keyword' },
        // Add more keyword options as needed
    ],
 tag: [
        { value: '', label: 'Tip oglasa' },
        { value: 'prodaja', label: 'prodaja' },
        { value: 'Izdavanje', label: 'Izdavanje' },
    ],

 locations: [
  { value: '', label: 'Lokacija' },
  { value: 'Beograd', label: 'Beograd' },
  { value: 'Novi Sad', label: 'Novi Sad' },
  { value: 'Niš', label: 'Niš' }, 
  { value: 'Dedinje', label: 'Dedinje' },

],
    category : [
        { value:'', label: 'Kategorija' },
        { value:'Stan', label: 'Stan' },
        { value:'Vila', label: 'Vila' },
        { value:'Kancelarija', label: 'Kancelarija' },
        { value:'Lokal', label: 'Lokal' },
        { value:'Kuća', label: 'Kuća' },
        { value:'Magacin', label: 'Magacin' },
    ],
      beds: [
        { value: '', label: 'Spavaće sobe' },
        { value: '1', label: '1 soba' },
        { value: '2', label: '2 sobe' },
        { value: '3', label: '3 sobe' },
        { value: '4', label: '4 sobe' },
        { value: '5', label: '5 soba' },
    ],
    garages: [
        { value: '', label: 'Garages' },
        { value: '1', label: '1 Garage' },
        { value: '2', label: '2 Garages' },
        // Add more garage options as needed
    ],
    // Define other options similarly
};

const data = [
    {
        src: "https://svgshare.com/i/187L.svg",
        src1: "https://svgshare.com/i/183P.svg",
        alt: "Image 1",
        name: "Apartment",
        count: 35,
    },
    {
        src: "https://svgshare.com/i/188i.svg",
        src1: "https://svgshare.com/i/185B.svg",
        alt: "Image 2",
        name: "Villa",
        count: 15,
    },
    {
        src: "https://svgshare.com/i/186r.svg",
        src1: "https://svgshare.com/i/185n.svg",
        alt: "Image 3",
        name: "Office",
        count: 26,
    },
    {
        src: "https://svgshare.com/i/187Z.svg",
        src1: "https://svgshare.com/i/184b.svg",
        alt: "Image 4",
        name: "Shop",
        count: 43,
    },
    {
        src: "https://svgshare.com/i/1881.svg",
        src1: "https://svgshare.com/i/183k.svg",
        alt: "Image 5",
        name: "House",
        count: 95,
    },
    {
        src: "https://svgshare.com/i/188C.svg",
        src1: "https://svgshare.com/i/184d.svg",
        alt: "Image 6",
        name: "Warehouse",
        count: 18,
    },
];

export const GET = async () => {
  return NextResponse.json({
    menuItems,
    features,
    searchOptions,
    data
  });
};