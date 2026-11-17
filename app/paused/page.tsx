import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Offline — Administrative Hold',
  description: 'This website is temporarily offline pending final administrative approval.',
  robots: { index: false, follow: false }, // Prevents Google from indexing this page
};

export default function PausedPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 overflow-hidden relative selection:bg-red-500/30">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Subtle Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-widest mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          System Status: Offline
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-[#1a1a1a] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
          Website Offline
        </h1>

        {/* Message */}
        <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
          <p>
            This website is temporarily offline pending final administrative approval and account settlement.
          </p>
          <p>
            The system will automatically reactivate once the pending handover process is completed.
          </p>
          <p className="text-gray-300 font-medium">
            For inquiries regarding this status, please reach out to the developer directly.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Footer / Action */}
        <div className="flex flex-col items-center gap-4">
          <a
            href="mailto:admin@example.com" // Change this to your actual email
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-200 text-black font-bold text-sm transition-all shadow-lg hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Developer
          </a>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
            Administrative Hold &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  );
}