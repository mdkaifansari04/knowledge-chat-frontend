'use client';
import useTestStore from '@/store/test';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import DifficultyBadge from './badge';

interface SectionCardProps {
  heading: string;
  description: string;
  chapter: number;
  href: string;
  isComingSoon?: boolean;
  difficulty?: string;
  btnText: string;
  standard?: string;
}

export default function SectionCard({
  heading,
  description,
  chapter,
  href,
  isComingSoon,
  difficulty,
  btnText,
  standard,
}: SectionCardProps) {
  const router = useRouter();
  const { setStandard, setChapter } = useTestStore();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!difficulty) return router.push(href);
    console.log(chapter);

    setChapter(chapter);
    setStandard(standard ? standard : '');
    router.push(href);
  };
  return (
    <article
      className={`border border-border p-5 rounded-md cursor-pointer hover:shadow-md transition-shadow duration-300 ${
        isComingSoon ? 'opacity-50 cursor-not-allowed hover:shadow-none' : ''
      }`}
    >
      <h4 className="font-medium text-lg mb-2">{heading}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        {isComingSoon ? (
          <span className="text-primary text-sm font-semibold">
            Coming Soon
          </span>
        ) : (
          <Fragment>
            <button
              onClick={(e) => handleClick(e)}
              className="bg-primary text-white py-1 px-3 rounded-md text-sm hover:bg-primary-dark transition-colors duration-300"
            >
              {btnText}
            </button>
            {difficulty ? (
              <DifficultyBadge difficulty={difficulty} />
            ) : (
              <span className="text-xs text-gray-500">
                {chapter} chapters available
              </span>
            )}
          </Fragment>
        )}
      </div>
    </article>
  );
}
