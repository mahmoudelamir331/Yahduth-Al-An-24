"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Categroies = [
  { name: "أخبار عاجلة", href: "/urgent" },
  { name: "سياسة", href: "/politics" },
  { name: "اقتصاد", href: "/economy" },
  { name: "رياضة", href: "/sports" },
  { name: "تكنولوجيا", href: "/tech" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Right: Logo */}
        <div className="flex-shrink-0 flex gap-4 items-center">
          <Link href="/" className="text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-2">
            <span className="bg-urgent text-white px-2 py-1 rounded-md text-sm md:text-lg">يحدث الآن 24</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 lg:gap-8 font-semibold text-foreground/80">
            {Categroies.map((cat) => (
              <li key={cat.name}>
                <Link href={cat.href} className="hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Left: Actions (Dark mode, Search, Mobile Menu) */}
        <div className="flex items-center gap-3 md:gap-5 mr-auto md:mr-0">
          <button className="text-foreground/80 hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-foreground/80 hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/5"
            aria-label="Toggle Dark Mode"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Moon className="w-5 h-5 md:w-6 md:h-6" />
              )
            ) : (
              <div className="w-5 h-5 md:w-6 md:h-6 opacity-0" />
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-foreground/80 hover:text-primary p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-foreground/10 bg-background absolute w-full left-0 shadow-lg">
          <ul className="flex flex-col py-4 px-4 space-y-4 font-semibold text-foreground/80 border-b border-foreground/10">
            {Categroies.map((cat) => (
              <li key={cat.name}>
                <Link 
                  href={cat.href} 
                  className="block hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
