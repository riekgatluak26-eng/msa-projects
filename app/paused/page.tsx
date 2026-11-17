import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Offline — Administrative Hold',
  description: 'This website is temporarily offline pending final administrative approval.',
  robots: { index: false, follow: false }, // Prevents Google from indexing this page
};

export default function PausedPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative selection:bg-red-500/30 font-sans">
      
      {/* ── Background Decor ── */}
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* Radial Red Glow behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Top/Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none"></div>

      {/* ── Main Card ── */}
      <div className="relative z-10 w-full max-w-[520px]">
        
        {/* Card Glow Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-b from-red-500/30 via-white/5 to-transparent rounded-[2rem] blur-sm opacity-50"></div>

        <div className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 sm:p-12 shadow-2xl text-center overflow-hidden">
          
          {/* Top Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            System Status: Offline
          </div>

          {/* Lock Icon with Rings */}
          <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-2 rounded-full border border-dashed border-white/10 animate-[spin_8s_linear_infinite_reverse]"></div>
            <div className="w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] z-10 relative">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-tight">
            Website Offline
          </h1>

          {/* Message */}
          <div className="space-y-4 text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-10">
            <p>
              This website is temporarily offline pending final administrative approval and account settlement.
            </p>
            <p>
              The system will automatically reactivate once the pending handover process is completed.
            </p>
            <div className="p-4 bg-white/[0.03] border border-white/5 rounded-xl mt-6">
              <p className="text-gray-300 font-medium text-xs sm:text-sm">
                For inquiries regarding this status, please reach out to the developer directly.
              </p>
            </div>
          </div>

                   {/* Action Button (Static) */}
          <div
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-white text-black font-bold text-sm cursor-default shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] opacity-90"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Developer
          </div>

          {/* Footer */}
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mt-8">
            Administrative Hold &copy; {new Date().getFullYear()}
          </p>

        </div>
      </div>
    </div>
  );
}