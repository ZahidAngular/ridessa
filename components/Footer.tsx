"use client";
import Link from "next/link";

const r = (n: number) => Math.round(n * 1000) / 1000;

function WheelClassic() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-wheel footer-wheel--1">
      <circle cx="100" cy="100" r="90" stroke="var(--accent)" strokeWidth="5" opacity="0.9" />
      <circle cx="100" cy="100" r="70" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="100" r="12" fill="var(--accent)" opacity="0.9" />
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1="100" y1="100" x2={r(100+88*Math.sin(rad))} y2={r(100-88*Math.cos(rad))} stroke="var(--accent)" strokeWidth="2.5" opacity="0.7" />
            <circle cx={r(100+90*Math.sin(rad))} cy={r(100-90*Math.cos(rad))} r="7" fill="var(--accent)" opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

function WheelNeon() {
  return (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-wheel footer-wheel--2">
      <circle cx="90" cy="90" r="80" stroke="var(--brand)" strokeWidth="6" opacity="0.9" strokeDasharray="12 6" />
      <circle cx="90" cy="90" r="55" stroke="var(--brand)" strokeWidth="3" opacity="0.5" />
      <circle cx="90" cy="90" r="30" stroke="var(--brand)" strokeWidth="2" opacity="0.3" />
      <circle cx="90" cy="90" r="10" fill="var(--brand)" opacity="0.9" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x2 = r(90+78*Math.sin(rad)); const y2 = r(90-78*Math.cos(rad));
        const rx = r(90+54*Math.sin(rad)); const ry = r(90-54*Math.cos(rad));
        return (
          <g key={i}>
            <line x1="90" y1="90" x2={x2} y2={y2} stroke="var(--brand)" strokeWidth="3" opacity="0.6" />
            <rect x={r(rx-5)} y={r(ry-7)} width="10" height="14" rx="3" fill="var(--brand)" opacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}

function WheelStarburst() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-wheel footer-wheel--3">
      <circle cx="80" cy="80" r="72" stroke="var(--accent)" strokeWidth="3" opacity="0.6" />
      <circle cx="80" cy="80" r="50" stroke="var(--brand)" strokeWidth="2" opacity="0.4" />
      <circle cx="80" cy="80" r="8" fill="var(--brand)" opacity="1" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const isLong = i % 2 === 0;
        const len = isLong ? 70 : 48;
        const color = isLong ? "var(--accent)" : "var(--brand)";
        return (
          <g key={i}>
            <line x1="80" y1="80" x2={r(80+len*Math.sin(rad))} y2={r(80-len*Math.cos(rad))} stroke={color} strokeWidth={isLong ? 2.5 : 1.5} opacity="0.7" />
            {isLong && <circle cx={r(80+72*Math.sin(rad))} cy={r(80-72*Math.cos(rad))} r="5" fill={color} opacity="0.85" />}
          </g>
        );
      })}
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-deep)] pt-32 pb-10 px-10 border-t border-[var(--border-faint)] relative overflow-hidden">
      <WheelClassic />
      <WheelNeon />
      <WheelStarburst />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">

          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <a href="/">
              <img
                src="https://ridessa.com.au/img/Newlogo.png"
                alt="Carnival Rides Logo"
                className="h-24 w-auto object-contain mb-8 hover:scale-105 transition-transform"
              />
            </a>
            <p className="text-[var(--text-soft)] leading-relaxed italic font-medium">
              Bringing the joy and excitement of a professional carnival to your backyard, school, or corporate event across South Australia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="footer-heading uppercase mb-8 tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-[var(--text)] font-bold uppercase text-sm">
              <li><Link href="/" className="hover:text-[var(--brand)] transition-colors">Home</Link></li>
              <li><Link href="/all-rides" className="hover:text-[var(--brand)] transition-colors">All Rides</Link></li>
              <li><Link href="/all-rides" className="hover:text-[var(--brand)] transition-colors">Carnival Games</Link></li>
              <li><Link href="/all-rides" className="hover:text-[var(--brand)] transition-colors">Food &amp; Treats</Link></li>
            </ul>
          </div>

          {/* Event Hire */}
          <div>
            <h4 className="footer-heading uppercase mb-8 tracking-widest">Event Hire</h4>
            <ul className="space-y-4 text-[var(--text)] font-bold uppercase text-sm">
              <li><Link href="/booking" className="hover:text-[var(--brand)] transition-colors">School Fairs</Link></li>
              <li><Link href="/booking" className="hover:text-[var(--brand)] transition-colors">Corporate Events</Link></li>
              <li><Link href="/booking" className="hover:text-[var(--brand)] transition-colors">Birthday Parties</Link></li>
              <li><Link href="/booking" className="hover:text-[var(--brand)] transition-colors">Wedding Fun</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="footer-heading uppercase mb-8 tracking-widest">Contact Us</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase text-[var(--text-soft)] font-black">Direct Line</p>
                <a href="tel:0408817628" className="text-xl font-black text-[var(--brand)] hover:underline">0408 817 628</a>
              </div>
              <div>
                <p className="text-[10px] uppercase text-[var(--text-soft)] font-black">Email Support</p>
                <a href="mailto:info@ridessa.com.au" className="font-bold text-[var(--text)] hover:text-[var(--brand)] transition-colors">info@ridessa.com.au</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border-faint)] pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-widest text-[var(--text-dim)]">
          <p>© 2024 CARNIVAL RIDES OF SA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="mailto:info@ridessa.com.au?subject=Privacy%20Policy" className="hover:text-[var(--text)] transition-colors">Privacy Policy</a>
            <a href="mailto:info@ridessa.com.au?subject=Terms%20of%20Hire" className="hover:text-[var(--text)] transition-colors">Terms of Hire</a>
            <a href="mailto:info@ridessa.com.au?subject=Safety%20Certificates" className="hover:text-[var(--text)] transition-colors">Safety Certs</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
