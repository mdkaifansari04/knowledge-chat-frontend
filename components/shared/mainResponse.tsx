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
import {
  Check,
  CirclePause,
  Copy,
  Volume,
  Volume1,
  Volume2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import '../../app/globals.css';
import { ArrowUpIcon } from '../icons';

interface MainResponseSectionProps {
  isDivisionOption: boolean;
}

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
    <main className="max-w-6xl mx-auto flex flex-1 flex-col justify-center">
      <div className={cn('flex-1 p-4 sm:p-6 !overflow-y-auto hide-scrollbar')}>
        <div
          className={cn('', {
            'max-w-3xl mx-auto': showEmptyActivity,
            'max-w-full': !showEmptyActivity,
          })}
        >
          <div className="mb-4 space-y-3 pt-14 pb-10 hide-scrollbar">
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
    <div className="w-full flex justify-center items-center">
      <div className="mt-36 flex flex-col justify-center items-center w-full">
        <Icon className="w-24" src="ai" />
        <span className="text-[#707070] text-xl font-medium mt-3">
          Hi, your blog assistant is here
        </span>
      </div>
    </div>
  );
}

const PromptCard = (props: { prompt: string; icon: string }) => {
  return (
    <div className="rounded-lg border p-3 cursor-pointer">
      <Icon src={props.icon} />
      <p className="mt-4 font-normal text-xs">{props.prompt}</p>
    </div>
  );
};

type PromptInputBoxProps = MainResponseSectionProps;

function PromptInputBox({ isDivisionOption }: PromptInputBoxProps) {
  const [prompt, setPrompt] = useState('');
  const ChatStore = useChatStore();
  const { mutate: requestChatWithPdf, isPending: isProcessing } =
    useChatWithBlog();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

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
    <div className="sticky bottom-7 md:bottom-1 bg-background px-4 py-2 shadow-sm sm:px-6">
      <div className="relative">
        <Textarea
          placeholder="Type your message..."
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          name="message"
          id="message"
          rows={3}
          onKeyDown={handleKeyDown}
          className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isProcessing}
          className="absolute w-8 h-8 top-3 right-3"
          onClick={handleSubmit}
        >
          {isProcessing ? (
            <Loader className="w-3 h-3" />
          ) : (
            <Fragment>
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Fragment>
          )}
        </Button>
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
      <div className="grid gap-1 items-start text-sm">
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
            className="text-slate-500 group hover:bg-muted cursor-pointer w-6 flex justify-center items-center rounded-md"
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
            className="text-slate-500 group hover:bg-muted cursor-pointer w-6 flex justify-center items-center rounded-md"
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
