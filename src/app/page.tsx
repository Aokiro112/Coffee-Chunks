"use client";

import { useState } from "react";
import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import { Compass, ShieldCheck, PenTool, Zap, Activity, Clock, CheckCircle } from "lucide-react";

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white">
      {/* Scroll-linked Canvas Scrollytelling Section */}
      <ScrollytellingCanvas />

      {/* Main Content Area (Reveals after scroll-linked animation) */}
      <main className="relative z-20 bg-black">
        {/* Specifications Section */}
        <section id="specifications" className="py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-20">
            <div>
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 block mb-3 font-mono">
                Technical Data
              </span>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white/90">
                ENGINEERED TO SPECIFICATION
              </h2>
            </div>
            <p className="text-sm sm:text-base text-white/50 max-w-md font-light leading-relaxed">
              Every detail is calibrated to micron-level tolerance. The AETHER Caliber 119 represents a fusion of traditional haute horlogerie and aerospace materials science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {/* Spec 1 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <Clock className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">POWER RESERVE</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">72 Hours</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Twin barrel system operating in series to distribute uniform torque across the escapement.
              </p>
            </div>

            {/* Spec 2 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <Zap className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">FREQUENCY</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">18,800 BPH</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Slow beat oscillation selected specifically to optimize friction reduction and wear resistance.
              </p>
            </div>

            {/* Spec 3 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <Compass className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">TOURBILLON</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">Dual-Axis Cage</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                360-degree rotation completed every 60 seconds inside a lightweight titanium cage.
              </p>
            </div>

            {/* Spec 4 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <ShieldCheck className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">CHASSIS</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">Titanium Grade 5</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Aerospace-grade body sandblasted and micro-peened with carbon-composite finish.
              </p>
            </div>

            {/* Spec 5 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <Activity className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">PRECISION</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">±2 sec/day</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Rigorous testing across 6 positions and 3 temperature ranges ensures absolute chronometric rate.
              </p>
            </div>

            {/* Spec 6 */}
            <div className="bg-black p-8 sm:p-10 hover:bg-white/[0.01] transition-colors duration-300">
              <PenTool className="w-5 h-5 text-white/40 mb-6" />
              <span className="text-[10px] tracking-widest text-white/40 font-mono block mb-2">JEWELS</span>
              <h3 className="text-2xl font-light text-white/90 mb-3">37 Rubies</h3>
              <p className="text-xs text-white/50 font-light leading-relaxed">
                Synthetic ruby bearings positioned strategically to minimize friction across pivot axes.
              </p>
            </div>
          </div>
        </section>

        {/* Reservation Form Section */}
        <section id="reserve" className="py-32 px-6 sm:px-12 max-w-4xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 block mb-3 font-mono">
              Commissions Open
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white/90 mb-4">
              ACQUIRE CALIBER 119
            </h2>
            <p className="text-sm text-white/50 max-w-md mx-auto font-light leading-relaxed">
              Price starts at $48,500 USD. Each commission includes visual styling configuration and personalized balance calibration.
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-950/40 p-8 sm:p-12 rounded-3xl border border-white/5 backdrop-blur-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-white/50 font-mono">FULL NAME</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alexander Mercer"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest uppercase text-white/50 font-mono">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@domain.com"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase text-white/50 font-mono">PREFERRED CONFIGURATION</label>
                <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-white/30 transition-colors">
                  <option value="stealth">Stealth Black (Grade 5 Titanium & Carbon)</option>
                  <option value="raw">Brushed Platinum (Raw Micro-peened Finish)</option>
                  <option value="gold">Rose Gold (PVD Carbon & 18K Gold)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase text-white/50 font-mono">SPECIAL REQUESTS / MEASUREMENTS</label>
                <textarea 
                  rows={4}
                  placeholder="Specify wrist dimensions or unique engravements..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-full bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:scale-[1.01] cursor-pointer"
              >
                Submit Commission Inquiry
              </button>
            </form>
          ) : (
            <div className="bg-neutral-950/40 p-12 sm:p-20 rounded-3xl border border-white/10 backdrop-blur-md text-center max-w-2xl mx-auto flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
              <CheckCircle className="w-16 h-16 text-white/95 animate-[pulse_2s_infinite]" />
              <div>
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-2">COMMISSION REQUEST RECEIVED</h3>
                <p className="text-[10px] tracking-[0.2em] text-white/40 font-mono uppercase mb-4">INQUIRY REF: C119-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Thank you, <span className="text-white font-medium">{name}</span>. Our concierge team has logged your reservation request for the AETHER Caliber 119. A horological specialist will contact you at <span className="text-white font-medium">{email}</span> within 24 hours to review allocations and configure your edition.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6 sm:px-12 text-center text-white/30 text-[10px] tracking-widest font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
            <span className="uppercase">© 2026 AETHER HOROLOGY. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white/60 transition-colors">PRIVACY</a>
              <a href="#terms" className="hover:text-white/60 transition-colors">TERMS OF USE</a>
              <a href="#contact" className="hover:text-white/60 transition-colors">CONTACT</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

