'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { UserProfile } from '@clerk/nextjs';
import { PlusCircle } from 'lucide-react';
export default function ProfileDialog(props: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'rounded-md w-full px-3 py-2 cursor-pointer hover:bg-muted text-slate-500 group-hover:block hover:text-slate-600 flex justify-start items-center duration-150 ease-in-out',
          )}
        >
          <PlusCircle className="w-6 h-6 rounded-full p-1" />
          Add New
        </Button>
        {/* <Fragment>{props.trigger}</Fragment> */}
      </DialogTrigger>
      <DialogContent className="w-auto h-auto bg-transparent">
        <UserProfile />
      </DialogContent>
    </Dialog>
  );
}
