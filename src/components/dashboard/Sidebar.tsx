'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Handshake,
  Eye,
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { SignOutButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { InvLogo } from '../InvLogo';

const sidebarItems = [
  {
    label: 'Compte',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Alertes',
    href: '/dashboard/alerts',
    icon: LayoutDashboard,
  },
  {
    label: 'Screening',
    href: '/dashboard/screening',
    icon: ShieldCheck,
  },
  {
    label: 'Match',
    href: '/dashboard/match',
    icon: Handshake,
  },
  {
    label: 'Monitoring',
    href: '/dashboard/monitoring',
    icon: Eye,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative flex flex-col h-screen bg-white border-r border-gray-200 shadow-sm z-20"
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center h-20 px-4',
          isCollapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <InvLogo className={`max-h-[30px] sm:max-h-[30px] w-auto text-green-500`} />
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={cn(
            'p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500',
            isCollapsed ? '' : 'ml-auto'
          )}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-gray-100 text-green-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                isCollapsed ? 'justify-center' : ''
              )}
            >
              <item.icon
                size={22}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-green-800' : 'text-gray-500 group-hover:text-gray-900'
                )}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / User / Logout */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <SignOutButton redirectUrl="/dashboard/login">
          <button
            className={cn(
              'flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Se déconnecter</span>}
          </button>
        </SignOutButton>
      </div>
    </motion.div>
  );
}
