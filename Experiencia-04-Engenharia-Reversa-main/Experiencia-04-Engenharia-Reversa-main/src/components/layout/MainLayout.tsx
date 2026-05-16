import React from 'react';
import { AuthStatus } from '../auth/AuthComponents';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  preview: React.ReactNode;
  controls: React.ReactNode;
  explanation: React.ReactNode;
  examples: React.ReactNode;
}

export const MainLayout = ({ preview, controls, explanation, examples }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-10 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-slate-800 hover:opacity-80 transition-opacity">neumorphism.io</Link>
        <div className="flex items-center gap-6">
          <button className="neu-convex bg-base px-4 py-2 rounded-lg font-semibold text-xs transition-transform active:scale-95 cursor-pointer">
            Share Design
          </button>
          <AuthStatus />
        </div>
      </header>

      <main className="flex-grow px-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Side: Preview */}
        <section className="flex justify-center items-center rounded-3xl">
          {preview}
        </section>

        {/* Right Side: Controls */}
        <section className="neu-concave bg-base p-8 rounded-[32px] flex flex-col gap-5">
          {controls}
        </section>
      </main>

      {/* Bottom Section */}
      <footer className="px-10 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section>
          {explanation}
        </section>
        <section className="flex flex-col gap-4">
          {examples}
        </section>
      </footer>
    </div>
  );
};
