'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Search,
  BookOpen,
  Activity,
  Layers,
  Newspaper,
  Compass,
  Briefcase,
  Shield,
  Menu,
  X,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { SearchModal } from '../common/SearchModal';
import { MOCK_INDICES } from '@/data/mockMarket';
import { formatPercent } from '@/lib/utils';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: <Activity className="w-4 h-4" /> },
    { name: 'Market', href: '/market', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Analysis', href: '/analysis/BBCA', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { name: 'Screener', href: '/screener', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { name: 'Advisor', href: '/advisor', icon: <Compass className="w-4 h-4 text-cyan-400" /> },
    { name: 'Brokers', href: '/brokers', icon: <Layers className="w-4 h-4 text-indigo-400" /> },
    { name: 'News', href: '/news', icon: <Newspaper className="w-4 h-4" /> },
    { name: 'Learn', href: '/learn', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Dictionary', href: '/dictionary', icon: <Layers className="w-4 h-4" /> },
    { name: 'Tools', href: '/tools', icon: <Compass className="w-4 h-4" /> },
    { name: 'Portfolio', href: '/portfolio', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        {/* Top Mini Ticker Bar */}
        <div className="hidden md:flex items-center justify-between border-b border-slate-800/50 px-4 py-1 text-[11px] bg-slate-900/60">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            <span className="flex items-center gap-1.5 font-semibold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              GLOBAL MARKETS (MOCK):
            </span>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-400">🇺🇸</span>
              <span className="font-semibold text-white">S&P 500</span>
              <span className="text-slate-300 font-mono">5,635.80</span>
              <span className="font-semibold text-emerald-400">+0.72%</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-400">🇺🇸</span>
              <span className="font-semibold text-white">NASDAQ</span>
              <span className="text-slate-300 font-mono">17,820.50</span>
              <span className="font-semibold text-emerald-400">+1.15%</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-400">🇮🇩</span>
              <span className="font-semibold text-white">IHSG</span>
              <span className="text-slate-300 font-mono">7,812.13</span>
              <span className="font-semibold text-emerald-400">+0.45%</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-400">🇯🇵</span>
              <span className="font-semibold text-white">Nikkei 225</span>
              <span className="text-slate-300 font-mono">36,581.76</span>
              <span className="font-semibold text-rose-400">-0.24%</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-slate-400">🇭🇰</span>
              <span className="font-semibold text-white">Hang Seng</span>
              <span className="text-slate-300 font-mono">17,422.12</span>
              <span className="font-semibold text-emerald-400">+1.37%</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Multi-Exchange 24/5</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400/90 font-medium">Multi-Market Engine</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-emerald-500 shadow-md shadow-cyan-900/30 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  StockAI
                </span>
                <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                  Global
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href) || (link.name === 'Analysis' && pathname.startsWith('/analysis'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:border-cyan-500/50 hover:text-white transition-all shadow-inner"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Cari Saham & Edukasi...</span>
              <kbd className="hidden sm:inline rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/analysis/BBCA"
              className="hidden sm:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-cyan-950/40 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Analysis</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href) || (link.name === 'Analysis' && pathname.startsWith('/analysis'));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
