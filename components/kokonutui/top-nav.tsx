'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import UserProfile from '../shared/user-profile';
import { ThemeToggle } from '../theme-toggle';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'chatbotme', href: '#' },
    { label: 'dashboard', href: '#' },
  ];

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-gray-500 dark:text-gray-400" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 transition-colors dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto sm:gap-4 sm:ml-0">
        {/* <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="w-4 h-4 text-gray-600 sm:h-5 sm:w-5 dark:text-gray-300" />
        </button> */}
        <ThemeToggle />
        <UserProfile />
      </div>
    </nav>
  );
}
