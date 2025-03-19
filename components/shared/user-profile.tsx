'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Profile01 from '../kokonutui/profile-01';
function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Image
          src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
          alt="User avatar"
          width={28}
          height={28}
          className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
      >
        <Profile01 avatar="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
