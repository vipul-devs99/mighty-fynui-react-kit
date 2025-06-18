
import React from 'react';
import { Settings, RotateCcw, Compass, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="bg-pink-100 shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg text-gray-700">
            🏠 Mighty War...
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Home Office
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            Mightywarners LLC...
          </span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
          <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              🇮🇳
            </span>
          </div>
          <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              9
            </span>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
