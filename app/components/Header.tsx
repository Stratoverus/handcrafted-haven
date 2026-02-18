'use client';

import { useState } from 'react';
import Logo from './logo';
import SearchNav from './search';
import UserActions from './userActions';
import NavMenu from './NavMenu';
import LeftNavMenu from './LeftNavMenu';

export default function Header() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <header id='header'>

        {/* TOP ROW */}
        <div className="px-4 bg-white/45">
          <div className="flex items-center justify-center sm:justify-between gap-4 text-black">

            {/* Logo */}
            <div className="flex items-center gap-4 shrink-0">
              <Logo />
            </div>

            {/* Search Nav */}
            <SearchNav className="hidden sm:block flex-1 max-w-xl "/>

            {/* User actions */}
            <UserActions className="hidden sm:flex items-center gap-4 shrink-0"/>
            
          </div>
        </div>

        {/* BOTTOM BAR */}
        <NavMenu />
        
      </header>
    </>
  );
}
