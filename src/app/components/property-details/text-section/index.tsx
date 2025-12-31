import React from 'react';

interface TextSectionProps {
  description?: string;
}

export default function TextSection({ description }: TextSectionProps) {
  if (!description) return null;

  return (
<section className="pt-4 pb-8 dark:bg-darkmode">
      <div className="max-w-4xl mx-auto text-center text-gray px-4" data-aos="fade-up">
        <p className="text-base sm:text-lg md:text-xl leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
