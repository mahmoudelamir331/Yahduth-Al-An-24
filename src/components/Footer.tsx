import React from "react";
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-foreground/10 mt-10">
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand / Copy */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-bold text-primary mb-2">يحدث الآن 24</h3>
          <p className="text-sm font-medium text-foreground/70">
            أحدث الأخبار العاجلة والتقارير الصحفية الموثوقة لحظة بلحظة.
          </p>
          <p className="text-xs text-foreground/60 mt-4">
            يحدث الآن 24 &copy; {new Date().getFullYear() || 2026}. جميع الحقوق محفوظة للصحفي محمد الأمين.
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <Link href="#" className="p-2 rounded-full bg-foreground/10 hover:bg-primary hover:text-white transition-colors duration-300">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full bg-foreground/10 hover:bg-primary hover:text-white transition-colors duration-300">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full bg-foreground/10 hover:bg-primary hover:text-white transition-colors duration-300">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full bg-foreground/10 hover:bg-urgent hover:text-white transition-colors duration-300">
            <Youtube className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
