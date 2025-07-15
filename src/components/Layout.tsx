import React from 'react';
import LiverpoolLogo from './LiverpoolLogo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-darkGray text-white font-sans">
      <header className="bg-lfcRed py-4 px-6 shadow-md">
        <div className="flex items-center gap-4">
          <LiverpoolLogo className="w-12 h-12" />
          <h1 className="text-3xl font-bold text-white">LFC Pub Finder 🍺</h1>
        </div>
      </header>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
      <footer className="bg-lfcRed text-center py-4 mt-12">
        <p className="text-sm">You&apos;ll Never Drink Alone &copy; 2025</p>
      </footer>
    </div>
  );
}
