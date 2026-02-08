"use client";
import { useEffect, useState, useRef } from "react";

/* ===============================
   COUNT UP KOMPONENTA - KRENE NA SCROLL
================================ */
interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number; // trajanje u ms
}

function CountUp({ end, suffix = "", duration = 1500 }: CountUpProps) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 } // 50% elementa mora biti vidljivo
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const current = Math.min(Math.floor((progress / duration) * end), end);
      setValue(current);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ===============================
   COMPANY INFO
================================ */
export default function CompanyInfo() {
  return (
    <section
      className="
        pt-20
        pb-20
        bg-gradient-to-r
        from-[#BCCFE1]/80
        to-[#E6EFF7]
        dark:from-[#0F172A]
        dark:to-[#020617]
      "
    >
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-8">
        <div
          className="
            rounded-2xl
            bg-white/60
            dark:bg-white/5
            backdrop-blur-xl
            shadow-xl
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* 1 */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-12 border-b md:border-b-0 md:border-r border-white/20">
              <p className="text-[60px] leading-none font-bold text-slate-900 dark:text-white">
                <CountUp end={99} suffix="%" />
              </p>
              <p className="text-xl text-slate-700 dark:text-slate-300 text-center">
                Zadovoljnih klijenata
              </p>
            </div>

            {/* 2 */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-12 border-b md:border-b-0 md:border-r border-white/20">
              <p className="text-[60px] leading-none font-bold text-slate-900 dark:text-white">
                <CountUp end={24} suffix="/7" />
              </p>
              <p className="text-xl text-slate-700 dark:text-slate-300 text-center">
                Korisnička podrška
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 py-12">
              <p className="text-[60px] leading-none font-bold text-slate-900 dark:text-white">
                <CountUp end={100} suffix="%" />
              </p>
              <p className="text-xl text-slate-700 dark:text-slate-300 text-center">
                Posvećenost klijentima
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
