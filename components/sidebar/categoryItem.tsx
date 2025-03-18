'use client';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';

function CategoryItem(props: {
  href: string;
  selected: string;
  children: string;
  id: string;
  code?: string;
  notDeletable?: boolean;
  setSelected: (value: string) => void;
}) {
  return (
    <Link
      onClick={() =>
        props.setSelected(props.code ? props.code : props.children)
      }
      href={props.href}
      className={cn(
        'group rounded-md px-3 py-2 hover:bg-muted flex justify-between items-center duration-150 ease-in-out',
        {
          'bg-muted':
            props.selected === props.code ? props.code : props.children,
        },
      )}
      prefetch={false}
    >
      {props.children}
      {!props.notDeletable && (
        <X
          // onClick={() => handleDeleteItem(props.id)}
          className="w-6 h-6 hidden text-slate-500 group-hover:block hover:text-slate-600 hover:bg-slate-300 rounded-full p-1"
        />
      )}
    </Link>
  );
}

export default CategoryItem;
