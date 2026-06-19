import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import FloatingWheels from "@/components/FloatingWheels";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "Carnival Rides of SA — Premier Carnival Hire | South Australia",
    template: "%s | Carnival Rides of SA",
  },
  description:
    "South Australia's premier carnival hire company. Rides, games and food stalls for school fairs, birthdays, corporate events and weddings — delivered and set up anywhere in SA. Call 0408 817 628.",
  keywords: [
    "carnival hire", "amusement rides", "South Australia", "Adelaide",
    "school fair rides", "birthday party rides", "corporate event entertainment",
    "carnival games hire", "fairy floss", "jumping castle hire",
  ],
  openGraph: {
    title: "Carnival Rides of SA — Premier Carnival Hire",
    description:
      "We bring the magic and fun directly to you. Rides, games and treats for every event across South Australia.",
    url: "https://ridessa.com.au",
    siteName: "Carnival Rides of SA",
    images: [{ url: "https://ridessa.com.au/img/Newlogo.png", width: 800, height: 600, alt: "Carnival Rides of SA" }],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnival Rides of SA — Premier Carnival Hire",
    description: "Rides, games and treats for every event across South Australia.",
  },
  robots: { index: true, follow: true },
};

// Runs before React hydrates — prevents flash of wrong theme.
const themeInitScript = `
(function(){
  try {
    var saved = localStorage.getItem('ridessa-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'dark'); // default dark
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <CustomCursor />
        <FloatingWheels />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
