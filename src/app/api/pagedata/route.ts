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
  title: "Vrhunsko iskustvo",
  description:
    "Klijentima pružamo pouzdanu i profesionalnu uslugu u svakom koraku kupovine, prodaje ili izdavanja nekretnina."
},
{
  id: 2,
  imgSrc: "/images/features/Give-Women's-Rights.svg",
  title: "Sigurnost i poverenje",
  description:
    "Radimo isključivo sa proverenim nekretninama i pravno čistom dokumentacijom radi potpune sigurnosti."
},
{
  id: 3,
  imgSrc: "/images/features/live-chat.svg",
  title: "Stalna podrška",
  description:
    "Naš tim vam je uvek na raspolaganju za sva pitanja, savete i pomoć tokom celog procesa."
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
  { value: "Stari Grad", label: "Stari Grad" },
  { value: "Dorćol", label: "Dorćol" },
  { value: "Vračar", label: "Vračar" },
  { value: "Savski Venac", label: "Savski Venac" },
  { value: "Palilula", label: "Palilula" },
  { value: "Zemun", label: "Zemun" },
  { value: "Novi Beograd", label: "Novi Beograd" },
  { value: "Bežanijska Kosa", label: "Bežanijska Kosa" },
  { value: "Voždovac", label: "Voždovac" },
  { value: "Kanarevo Brdo", label: "Kanarevo Brdo" },
  { value: "Banjica", label: "Banjica" },
  { value: "Zvezdara", label: "Zvezdara" },
  { value: "Konjarnik", label: "Konjarnik" },
  { value: "Rakovica", label: "Rakovica" },
  { value: "Vidikovac", label: "Vidikovac" },
  { value: "Čukarica", label: "Čukarica" },
  { value: "Banovo Brdo", label: "Banovo Brdo" },
  { value: "Grocka", label: "Grocka" },
  { value: "Mladenovac", label: "Mladenovac" },
  { value: "Obrenovac", label: "Obrenovac" },
  { value: "Barajevo", label: "Barajevo" },
  { value: "Sopot", label: "Sopot" },
  { value: "Lazarevac", label: "Lazarevac" },
  ],

    category : [
        { value:'', label: 'Kategorija' },
        { value:'Stan', label: 'Stan' },
        { value:'Vila', label: 'Vila' },
        { value:'Kancelarija', label: 'Kancelarija' },
        { value:'Lokal', label: 'Lokal' },
        { value:'Kuća', label: 'Kuća' },
        { value:'Hala', label: 'Hala' },
    ],
      beds: [
        { value: '', label: ' sobe' },
        { value: '1', label: '1 soba' },
        { value: '2', label: '2 sobe' },
        { value: '3', label: '3 sobe' },
        { value: '4', label: '4 sobe' },
        { value: '5', label: '5 soba' },
        { value: '1.5', label: '1.5 soba' },
        { value: '2.5', label: '2.5 sobe' },
        { value: '3.5', label: '3.5 sobe' },
        { value: '4.5', label: '4.5 sobe' },
        { value: '5.5', label: '5.5 soba' },
    ],
    garages: [
        { value: '', label: 'Garages' },
        { value: '1', label: '1 Garage' },
        { value: '2', label: '2 Garages' },
        { value: '3', label: '3 Garages' },
        { value: '4', label: '4 Garages' },


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