


"use client"
import Image from "next/image"
import nextImg from "/public/images/documentation/Categories=Nextjs.svg"
import reactImg from "/public/images/documentation/Categories=React.svg"
import tailwindImg from "/public/images/documentation/Categories=Tailwind.svg"
import nextauthImg from "/public/images/documentation/nextauth.png"
import typescriptImg from "/public/images/documentation/Categories=Typescript.svg"
import axiosImg from "/public/images/documentation/axios.svg"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { DocNavigation } from "./DocNavigation"

export const Introduction = () => {
    const [docNavbarOpen, setDocNavbarOpen] = useState(false)
   
    
    return (
        <>
         <div id="version" className="md:scroll-m-[180px] scroll-m-28">
            
         {docNavbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" onClick={() => setDocNavbarOpen(false)} />
        )}

            <div className="flex item-center justify-between">
            <h3 className=" text-black text-2xl mt-4 font-semibold mb-6 dark:text-white" >KOLIKI JE POREZ NA PRENOS APSOLUTNIH PRAVA I KO GA PLAĆA?</h3>
            <button onClick={() => setDocNavbarOpen(true)} className="p-0"> <Icon icon="gg:menu-right" className="text-3xl lg:hidden block" /></button>
            </div>
            
             
              <div className="mt-5">
               <p className="text-base font-medium text-midnight_text dark:text-gray">Porez na prenos apsolutnih prava iznosi **🇷🇸 2,5 % od vrednosti nepokretnosti ili druge imovine koja se prenosi (npr. prava svojine na stan ili kuću)</p>
               <p className="text-base font-medium text-midnight_text dark:text-gray">Ta vrednost je uglavnom ugovorena cena u kupoprodajnom ugovoru,</p>
               <p className="text-base font-medium text-midnight_text dark:text-gray">ali ako Poreska uprava smatra da je ta cena preniska, može da utvrdi osnovicu na osnovu tržišne vrednosti.</p>
               </div>

         </div>

         <div
          className={`lg:hidden block fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${docNavbarOpen ? "translate-x-0" : "translate-x-full"} z-50`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold text-midnight_text dark:text-white">Docs Menu</h2>
            <button onClick={() => setDocNavbarOpen(false)} aria-label="Close mobile menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="dark:text-white">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="px-4" >
        <DocNavigation/>
          </nav>
        </div>
        </>
    )
}