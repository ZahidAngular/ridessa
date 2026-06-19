"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RideModal, { type RideData } from "@/components/RideModal";
import Tilt3D from "@/components/Tilt3D";

const ridesData: RideData[] = [
  {
    id: 1, title: "Royal Wheel", category: "Rides",
    desc: "The crowning jewel of the midway. The Royal Wheel is our signature attraction — a towering Ferris wheel that lifts you above the lights, the crowds, and the music for a breathtaking view of the entire showground.",
    imgs: [
      "/royal-wheel/royal-wheel-1.png",
      "/royal-wheel/royal-wheel-2.png",
      "/royal-wheel/royal-wheel-3.png",
      "/royal-wheel/royal-wheel-4.png",
      "/royal-wheel/royal-wheel-5.png",
      "/royal-wheel/royal-wheel-6.png",
    ],
  },
  {
    id: 2, title: "Riptide", category: "Rides",
    desc: "Spin, sweep, soar — pure family thrill. Get ready for an adrenaline-pumping experience on the Riptide! This thrilling family ride delivers fast-paced excitement as riders spin and sweep through powerful, sweeping turns.",
    imgs: [
      "/riptide/riptide-1.png",
      "/riptide/riptide-2.png",
      "/riptide/riptide-3.png",
      "/riptide/riptide-4.png",
      "/riptide/riptide-5.png",
      "/riptide/riptide-6.png",
    ],
  },
  {
    id: 3, title: "Bumper Cars", category: "Rides",
    desc: "Buckle up — bumper-to-bumper chaos. Grab the wheel, hit the throttle, and chase your friends around the arena. Spin, swerve, and bump your way to bragging rights as the lights flash and the music thumps. A classic that never gets old.",
    imgs: [
      "/bumper-cars/bumper-cars-1.png",
      "/bumper-cars/bumper-cars-2.png",
      "/bumper-cars/bumper-cars-3.png",
    ],
  },
  {
    id: 4, title: "Crazy Dance", category: "Rides",
    desc: "Spin one way, then the other — keep up if you can. The Crazy Dance is a relentless spinner that whips you in one direction, then snaps the other way without warning. Equal parts disorienting and hilarious, this one keeps the whole crowd coming back for more.",
    imgs: [
      "/crazy-dance/crazy-dance-1.png",
    ],
  },
  {
    id: 5, title: "Top Gun", category: "Rides",
    desc: "Take to the skies. Push the limits. Top Gun launches you into a high-speed flight pattern — soaring, banking, and looping through the air. Pure adrenaline for thrill-seekers who want a taste of carnival flight at its wildest.",
    imgs: [
      "/top-gun/top-gun-1.png",
      "/top-gun/top-gun-2.png",
      "/top-gun/top-gun-3.png",
    ],
  },
  {
    id: 6, title: "Trippa", category: "Rides",
    desc: "A trippy spin you won't forget. Trippa is a kaleidoscope of lights, motion, and colour — a smooth spinner that tilts, rises, and twirls in patterns that keep your head guessing. A crowd favourite for the visual spectacle and the smooth, dizzying ride.",
    imgs: [
      "/trippa/trippa-1.png",
      "/trippa/trippa-2.png",
      "/trippa/trippa-3.png",
    ],
  },
  {
    id: 7, title: "Sizzler", category: "Rides",
    desc: "Twist, spin, and laugh your head off. Hold on tight — the Sizzler starts slow and sweet before cranking up the speed and tossing you in dizzy circles. Just when you catch your breath, it changes direction. Bright lights, big music, and non-stop laughs all the way.",
    imgs: [
      "/sizzler/sizzler-1.png",
      "/sizzler/sizzler-2.png",
    ],
  },
  {
    id: 8, title: "Fun Slide", category: "Rides",
    desc: "Climb up. Whoosh down. Do it again. The Fun Slide is a multi-lane giant slide built for laughter — climb to the top with your hessian mat, push off, and feel the rush as you race friends and family to the bottom. Endless fun, for all ages.",
    imgs: [
      "/fun-slide/fun-slide-1.png",
      "/fun-slide/fun-slide-2.png",
    ],
  },
  {
    id: 9, title: "Carnival Express", category: "Rides",
    desc: "All aboard the brightest train in town. The Carnival Express is a colourful, kid-sized train that takes our youngest guests on a smooth loop through the heart of the midway. With bright lights, friendly carriages, and a cheerful whistle, it's a favourite for the little ones.",
    imgs: [
      "/carnival-express/carnival-express-1.png",
    ],
  },
  {
    id: 10, title: "Safari Coaster", category: "Rides",
    desc: "A pint-sized adventure on the rails. The Safari Coaster is our junior coaster — a gentle, swooping circuit themed for our young explorers. Big enough to feel like a real ride, friendly enough for first-timers.",
    imgs: [
      "/safari-coaster/safari-coaster-1.png",
      "/safari-coaster/safari-coaster-2.png",
    ],
  },
  {
    id: 11, title: "Groovy Buses", category: "Rides",
    desc: "A mini bus tour, junior-sized. Groovy Buses are a slow, sweet circuit ride for our youngest guests — kid-sized buses on a friendly track. Perfect for first rides, big smiles and a hundred photos worth keeping.",
    imgs: [
      "/groovy-buses/groovy-buses-1.png",
    ],
  },
  {
    id: 12, title: "Tea Cups", category: "Rides",
    desc: "A teapot brewing the wildest storm of fun. Climb into a giant Tea Cup and grab the wheel — spin as fast or as slow as you like and let the laughter take over. A whirling sweet treat that's just as fun to watch as it is to ride.",
    imgs: [
      "/tea-cups/tea-cups-1.png",
      "/tea-cups/tea-cups-2.png",
      "/tea-cups/tea-cups-3.png",
      "/tea-cups/tea-cups-4.png",
    ],
  },
  {
    id: 13, title: "Flying Cars", category: "Rides",
    desc: "Pint-sized motors. Sky-high fun. Flying Cars lifts our littlest riders off the ground in their very own pretend racer — gentle, smooth and full of personality. The kind of ride that turns first-timers into lifelong carnival fans.",
    imgs: [
      "/flying-cars/flying-cars-1.png",
      "/flying-cars/flying-cars-2.png",
      "/flying-cars/flying-cars-3.png",
      "/flying-cars/flying-cars-4.png",
    ],
  },
  {
    id: 14, title: "Candy Swing", category: "Rides",
    desc: "A sweet little swing for the whole family. The Candy Swing is a candy-coloured chair swing that lifts riders off the ground and sails them in gentle arcs above the midway. Bright, breezy, and big enough for mum or dad to join in.",
    imgs: [
      "/candy-swing/candy-swing.png",
    ],
  },
  {
    id: 15, title: "Bungee Jump", category: "Rides",
    desc: "Free-fall — then bounce, bounce, bounce. Strap in for a bungee experience built for the carnival crowd — the rush of the drop, the surprise of the rebound, the giggles all the way down. A bucket-list moment in the middle of the midway.",
    imgs: [
      "/bungee-jump/bungee-jump-1.png",
      "/bungee-jump/bungee-jump-2.png",
    ],
  },
  {
    id: 16, title: "Bumper Boats", category: "Rides",
    desc: "Bumper cars — now with a splash zone. All the chaos of the Bumper Cars, on water. Climb into your own little boat, take the wheel, and chase your friends around the pond — gentle bumps, bigger splashes, and endless laughs.",
    imgs: [
      "/bumper-boats/bumper-boats-1.png",
    ],
  },
  {
    id: 17, title: "Jumping Castles", category: "Rides",
    desc: "Bounce, bounce, bounce — repeat. A rotating selection of inflatable castles — themed, colourful, and built for kids to burn through energy non-stop. Always a safe, monitored corner of the showground where parents can relax.",
    imgs: [
      "/jumping-castles/jumping-castles-1.png",
      "/jumping-castles/jumping-castles-2.png",
      "/jumping-castles/jumping-castles-3.png",
      "/jumping-castles/jumping-castles-4.png",
      "/jumping-castles/jumping-castles-5.png",
    ],
  },
  {
    id: 18, title: "Fishing Game / Catch A Duck", category: "Games",
    desc: "Cast the line — or pick a duck. A timeless sideshow favourite. Choose your weapon — cast the magnetic fishing line or scoop a floating duck from the pond. Every fish caught and every duck picked carries a prize.",
    imgs: [
      "/fishing-game-catch-a-duck/fishing-game-catch-a-duck.png",
    ],
  },
  {
    id: 19, title: "Catch A Frog", category: "Games",
    desc: "Launch the frog. Land the lily pad. Whack the lever and send your plastic frog flying — the goal is to land it cleanly on one of the floating lily pads. Easy to play, surprisingly tactical, and packed with laughter when the whole family joins in.",
    imgs: [
      "/catch-a-frog/catch-a-frog-1.png",
      "/catch-a-frog/catch-a-frog-2.png",
    ],
  },
  {
    id: 20, title: "Laughing Clowns", category: "Games",
    desc: "Feed the clowns. Win big. An Australian carnival icon. Drop the balls into the laughing clowns' mouths as their heads sway side to side — every ball scores, and the higher your total, the bigger the prize.",
    imgs: [
      "/laughing-clowns/laughing-clowns-1.png",
      "/laughing-clowns/laughing-clowns-2.png",
    ],
  },
  {
    id: 21, title: "Balloon Bust", category: "Games",
    desc: "Pop a balloon, claim a prize. Steady your hand and let the darts fly. Pop a balloon and take home a prize — bigger pops, bigger prizes. The crack of the burst and the cheer from the crowd make Balloon Bust a true sideshow classic.",
    imgs: [
      "/balloon-bust/balloon-bust-1.png",
      "/balloon-bust/balloon-bust-2.png",
    ],
  },
];

const categories = ["Rides", "Games"];

export default function AllRidesPage() {
  const [activeTab, setActiveTab] = useState("Rides");
  const [selectedRide, setSelectedRide] = useState<RideData | null>(null);

  const filteredRides = ridesData.filter(ride => ride.category === activeTab);

  return (
    <main className="min-h-screen bg-[var(--bg-page-alt)] text-[var(--text)] mt-20">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-14 px-5 sm:px-8 text-center">
        <p className="text-[var(--accent)] font-black uppercase tracking-[0.3em] text-[10px] mb-4">World Class Entertainment</p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase leading-none">
          Choose Your <span className="text-[var(--brand)]">Adventure</span>
        </h1>

        {/* TABS */}
        <div className="flex justify-center mt-10 px-2">
          <div className="bg-[var(--glass)] p-1.5 rounded-full border border-[var(--border)] flex gap-1 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 sm:px-8 py-2.5 rounded-full text-[11px] sm:text-[12px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                  ? "bg-[var(--brand)] text-white shadow-[0_0_20px_var(--tint-brand-glow)]"
                  : "text-[var(--text-faint)] hover:text-[var(--text)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-[1600px] mx-auto px-5 sm:px-6 pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRides.map((ride) => (
              <motion.div
                key={ride.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedRide(ride)}
              >
              <Tilt3D max={11} className="group relative bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--border-faint)] hover:border-[var(--brand)]/50 transition-[border-color,box-shadow] duration-500 shadow-lg hover:shadow-[0_30px_60px_-18px_rgba(var(--brand-rgb),0.45)] cursor-pointer h-full">
                {/* Image */}
                <div className="relative h-80 sm:h-[26rem] overflow-hidden">
                  <img src={ride.imgs[0]} alt={ride.title} className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]" />
                  {/* Hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-[var(--accent)] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    {ride.category}
                  </div>
                  {/* Image count badge */}
                  {ride.imgs.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:bg-[var(--brand)] group-hover:scale-105">
                      📷 {ride.imgs.length} photos
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative p-8">
                  <h3 className="text-2xl sm:text-[1.7rem] font-black italic uppercase mb-3 text-[var(--text)] transition-colors duration-300 group-hover:text-[var(--accent)]">{ride.title}</h3>
                  <p className="text-[var(--text-soft)] text-sm leading-relaxed mb-6 line-clamp-2">
                    {ride.desc}
                  </p>
                  <button className="text-[var(--brand)] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3.5 transition-all duration-300">
                    View Details
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  {/* Animated bottom accent line */}
                  <span className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--brand)] rounded-full group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_18px_var(--brand)]" />
                </div>

                {/* Inner brand glow on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_70px_rgba(var(--brand-rgb),0.18)]" />
              </Tilt3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />

      {/* Modal */}
      <RideModal ride={selectedRide} onClose={() => setSelectedRide(null)} />
    </main>
  );
}
