// app/(site)/properties/properties-list/[slug]/layout.tsx
export default function PropertyDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-darkmode min-h-screen">
      {children} {/* ovde će se renderovati page.tsx */}
    </div>
  );
}
