import Link from "next/link";
import PageTransition from "./pagetransition";


export default function AppLayout({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: "home" | "tester" | "dashboard" | "live";
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b0036] via-[#12001a] to-black text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-black/30">
      <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
          <div>
            <div className="font-bold text-lg">Sentinel AI</div>
            <div className="text-xs text-white/60">LLM SAFETY GATEWAY</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/80">
          <NavLink href="/" label="Home" active={active === "home"} />
          <NavLink href="/tester" label="Tester" active={active === "tester"} />
          <NavLink href="/live" label="Live Traffic" active={active === "live"} />
          <NavLink href="/dashboard" label="Dashboard" active={active === "dashboard"} />

          <button className="px-3 py-1 rounded-full border border-white/20 text-xs">
            Dark
          </button>
        </div>
      </nav>
    <PageTransition>
        {children}
    </PageTransition>
    </div>
  );
}

function NavLink({
    href,
    label,
    active,
  }: {
    href: string;
    label: string;
    active?: boolean;
  }) {
    return (
      <Link
        href={href}
        className="relative group px-1 transition"
      >
        <span
          className={`transition ${
            active ? "text-white font-medium" : "text-white/80 group-hover:text-white"
          }`}
        >
          {label}
        </span>
  
        {/* underline */}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-pink-500 to-violet-500 transition-transform duration-300 ${
            active ? "scale-x-100" : "group-hover:scale-x-100"
          }`}
        />
      </Link>
    );
}
