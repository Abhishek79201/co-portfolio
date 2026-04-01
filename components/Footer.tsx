export default function Footer() {
  return (
    <footer className="mt-32 pt-6 border-t border-[var(--line)]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[10px] text-[var(--text-muted)] dev-mono">
            &copy; {new Date().getFullYear()} Abhishek Vaghela &amp; Vatsal Zinzuvadiya
          </p>
          <p className="text-[10px] text-[var(--text-muted)] dev-mono">
            Next.js + GSAP + late nights
          </p>
        </div>
      </div>
    </footer>
  );
}
