'use client';
import { Loader } from '@/components/shared/loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useChatWithBlog } from '@/hooks/mutation';
import { cn, getUserShortName } from '@/lib/utils';
import useChatStore from '@/store/chat';
import { motion } from 'framer-motion';
import {
  Check,
  CirclePause,
  Copy,
  LineChart,
  SendIcon,
  ShieldCheck,
  User,
  Volume2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import '../../app/globals.css';
interface MainResponseSectionProps {
  isDivisionOption: boolean;
}

const QuickActions = [
  {
    action: 'Market Data',
    icon: LineChart,
    gradient: 'from-zinc-900/50 to-black/50',
    hoverGradient: 'hover:from-zinc-800/50 hover:to-zinc-900/50',
  },
  {
    action: 'Cybersecurity',
    icon: ShieldCheck,
    gradient: 'from-zinc-900/50 to-black/50',
    hoverGradient: 'hover:from-zinc-800/50 hover:to-zinc-900/50',
  },
  {
    action: 'AppnologyJames',
    icon: User,
    gradient: 'from-zinc-900/50 to-black/50',
    hoverGradient: 'hover:from-zinc-800/50 hover:to-zinc-900/50',
  },
];

export default function MainResponseSection({
  isDivisionOption,
}: MainResponseSectionProps) {
  const { chat, resetChat, streamText, resetStream } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const showEmptyActivity = chat.length === 0;
  const router = useRouter();
  useEffect(() => {
    resetChat();
  }, [router, resetChat, resetStream]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
    console.log(streamText);
  }, [streamText]);
  return (
    <main className="flex flex-col justify-center flex-1 max-w-6xl mx-auto ">
      <div className={cn('flex-1 p-4 sm:p-6 !overflow-y-auto hide-scrollbar')}>
        <div
          className={cn('', {
            'max-w-3xl mx-auto': showEmptyActivity,
            'max-w-full': !showEmptyActivity,
          })}
        >
          <div className="pb-10 mb-4 space-y-3 pt-14 hide-scrollbar">
            {chat.map((i, k) => (
              <ChatMessage
                key={k}
                type={i.sender}
                userName={i.sender === 'user' ? 'You' : 'AI Model'}
                message={i.message}
              />
            ))}
            {streamText.length !== 0 ? (
              <ChatMessage
                type="model"
                userName="AI Model"
                message={streamText!}
              />
            ) : null}

            {showEmptyActivity && <EmptyActivity />}
            <div ref={messageEndRef} />
          </div>
        </div>
      </div>
      <PromptInputBox isDivisionOption={isDivisionOption} />
    </main>
  );
}

function EmptyActivity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={cn(
        'relative z-30 pt-32 text-center pb-20',
        'opacity-100 scale-100',
      )}
    >
      <h1 className="relative z-30 mb-4 text-5xl font-medium tracking-tighter text-black md:text-6xl bg-clip-text bg-gradient-to-b from-gray-800 to-gray-600 dark:text-white dark:bg-gradient-to-b dark:from-black dark:to-black/70">
        Welcome to Knowledge Chat
      </h1>
      <p className="relative z-30 text-xl text-gray-600 dark:text-zinc-400">
        What can I do for you today?
      </p>
    </motion.div>
  );
}

const PromptCard = (props: { prompt: string; icon: string }) => {
  return (
    <div className="p-3 border rounded-lg cursor-pointer">
      <Icon src={props.icon} />
      <p className="mt-4 text-xs font-normal">{props.prompt}</p>
    </div>
  );
};

type PromptInputBoxProps = MainResponseSectionProps;

function PromptInputBox({ isDivisionOption }: PromptInputBoxProps) {
  const [prompt, setPrompt] = useState('');
  const ChatStore = useChatStore();
  const { mutate: requestChatWithPdf, isPending: isProcessing } =
    useChatWithBlog();

  const handleStream = async (response: Response) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          ChatStore.resetStream();
          ChatStore.setChat({ sender: 'model', message: result });
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        ChatStore.setStreamText(chunk);
      }
    } else {
      toast('Something went wrong, try again');
    }
  };

  const handleSubmit = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (prompt.length === 0) return;
    setPrompt('');
    ChatStore.setChat({ sender: 'user', message: prompt });
    requestChatWithPdf(
      {
        userPrompt: prompt,
      },
      {
        onSuccess: (response) => {
          handleStream(response);
        },
        onError: (error) => {
          if (error.message) {
            return toast.error(error.message);
          }
          toast.error('Something went wrong');
        },
      },
    );
  };
  return (
    <div className="sticky px-4 py-2 shadow-sm bottom-7 md:bottom-8 sm:px-6">
      <div className="flex flex-col w-full max-w-3xl gap-4 mx-auto">
        <div className="relative bg-white border-none dark:bg-zinc-900 rounded-xl">
          <Textarea
            placeholder="What would you like to do?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            className={cn(
              'w-full px-4 py-3',
              'resize-none',
              'bg-transparent',
              'border-none',
              'text-gray-800 dark:text-zinc-100 text-base',
              'focus:outline-none',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'placeholder:text-gray-500 dark:placeholder:text-zinc-500 placeholder:text-base',
              'min-h-[60px]',
            )}
          />
          <div className="flex items-center justify-end p-3">
            <Button
              className={cn(
                'px-1.5 py-1.5 h-6 rounded-lg text-sm transition-colors hover:bg-gray-200 dark:hover:bg-zinc-800 flex items-center justify-between gap-1',
                'text-gray-800 dark:text-zinc-100',
                'disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-zinc-900',
              )}
              disabled={prompt.length === 0}
              onClick={() => {
                console.log('Sending message:', prompt);
              }}
            >
              {isProcessing ? (
                <Loader className="w-3 h-3" />
              ) : (
                <Fragment>
                  <SendIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Fragment>
              )}
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3">
          {QuickActions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.1 * index,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                key={index}
                className={`${index > 1 ? 'hidden sm:block' : 'block'} h-full`}
              >
                <button
                  type="button"
                  className="group w-full h-full text-left rounded-lg p-2.5
                                    bg-white dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800
                                    border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700
                                    transition-colors duration-300
                                    flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700">
                      <Icon
                        size={14}
                        className="text-gray-800 dark:text-zinc-100"
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-800 dark:text-zinc-100">
                      {item.action}
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ChatMessage(props: {
  userName: string | undefined;
  message: string;
  type: 'model' | 'user';
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar
        className={cn('w-8 h-8 border', { 'p-1': props.type === 'model' })}
      >
        <AvatarImage
          src={
            props.type === 'user'
              ? '/images/placeholder-user.jpg'
              : '/images/ai-profile.svg'
          }
        />
        <AvatarFallback>{getUserShortName(props.userName)}</AvatarFallback>
      </Avatar>
      <div className="grid items-start gap-1 text-sm">
        <div className="flex items-center gap-2">
          <div className="font-medium">{props.userName}</div>
        </div>
        <div>
          {props.type === 'user' ? (
            <p>{props.message}</p>
          ) : (
            <Markdown>{props.message}</Markdown>
          )}
        </div>
        <div className="flex gap-1">
          {props.type === 'model' && <CopyToClipboard text={props.message} />}
          {props.type === 'model' && <ReadAloud text={props.message} />}
        </div>
      </div>
    </div>
  );
}

function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="flex items-center justify-center w-6 rounded-md cursor-pointer text-slate-500 group hover:bg-muted"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-3" /> : <Copy className="w-3" />}
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={1}>
          <p>{copied ? 'Copied' : 'Copy'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ReadAloud({ text }: { text: string }) {
  const [isReading, setIsReading] = useState(false);
  let utterance: SpeechSynthesisUtterance;

  const handleReadAloud = () => {
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="flex items-center justify-center w-6 rounded-md cursor-pointer text-slate-500 group hover:bg-muted"
            onClick={handleReadAloud}
          >
            {isReading ? (
              <CirclePause className="w-3" />
            ) : (
              <Volume2 className="w-3" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={1}>
          <p>{isReading ? 'Stop' : 'Read Aloud'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
