'use client';
import useStore from '@/store/app';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import QueryWrapper from '../shared/wrapper';
import { LinkPendingSkeleton } from '../skeleton/linkSkeleton';
import { Button } from '../ui/button';
import CategoryItem from './categoryItem';

export default function DivisionSidebar() {
  const { selectedCategory, setSelectedCategory } = useStore();

  const data = ['Standard 7th'];
  const isError = false;
  const isPending = false;
  const error = false;

  return (
    <nav className="hidden w-56 flex-col h-full border-r bg-background py-8 pb-20 p-4 sm:flex ">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="mb-4 text-lg font-medium">Division</div>
          <QueryWrapper
            data={data}
            isError={isError}
            isPending={isPending}
            error={error}
            view={
              <div className="space-y-2 overflow-y-auto">
                <CategoryItem
                  setSelected={setSelectedCategory}
                  href="#"
                  selected={selectedCategory}
                  id={''}
                  code="CMNSW7"
                  notDeletable
                >
                  Standard 7th
                </CategoryItem>
              </div>
            }
            pendingView={<LinkPendingSkeleton />}
          />
        </div>
        <Link href={'/dashboard'}>
          <Button className="w-full flex " variant={'outline'}>
            <ArrowLeftCircle className="w-5 h-5 text-slate-700 mr-3" /> Back
          </Button>
        </Link>
      </div>
    </nav>
  );
}
