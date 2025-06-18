
import React from 'react';
import { 
  LayoutDashboard, 
  Building, 
  Receipt, 
  TrendingUp, 
  Package, 
  BarChart3 
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, text: 'Dashboard', active: false },
  { icon: Building, text: 'Assets', active: false },
  { icon: Building, text: 'Liabilities', active: false },
  { icon: Receipt, text: 'Transactions', active: true },
  { icon: TrendingUp, text: 'Sales & Orders', active: false },
  { icon: Package, text: 'Inventory', active: false },
  { icon: BarChart3, text: 'Reports', active: false },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold text-red-600">
          MIGHTY WARNERS
        </h2>
      </div>
      
      <nav className="px-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 cursor-pointer ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={item.active ? 'text-blue-600' : 'text-gray-700'}>
                {item.text}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
