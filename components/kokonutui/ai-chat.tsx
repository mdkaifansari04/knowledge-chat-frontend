'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { MultimodalInput } from '@/components/kokonutui/multimodal-input';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:bg-gradient-to-br dark:to-black dark:from-black dark:via-zinc-800/40 ">
      <div className="flex flex-col items-center justify-center w-full h-screen p-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn('text-center mb-10', 'opacity-100 scale-100')}
        >
          <h1 className="mb-4 text-5xl font-medium tracking-tighter text-black md:text-6xl bg-clip-text bg-gradient-to-b from-gray-800 to-gray-600 dark:text-white dark:bg-gradient-to-b dark:from-black dark:to-black/70">
            Welcome to Knowledge Chat
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400">
            What can I do for you today?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn(
            'w-full rounded-2xl relative overflow-hidden',
            'h-0 overflow-hidden',
          )}
        >
          <div className="relative p-6">
            <div className="flex flex-col gap-4">{/* Put messages here */}</div>
            <div className="shrink-0 min-w-[24px] min-h-[24px]" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl px-4 mt-6 md:px-0"
        >
          <div className="relative backdrop-blur-xl rounded-xl">
            <MultimodalInput />
          </div>
        </motion.form>
      </div>
    </div>
  );
}
