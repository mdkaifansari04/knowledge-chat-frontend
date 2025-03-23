'use client';
import { FadeImg } from '@/components/ui/fade-image';
import { Progress } from '@/components/ui/progress';
import { UploadButton } from '@/lib/uploadthing';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface PrimaryUploadButtonProps {
  setProblemImage: (value: string) => void;
}

function PrimaryUploadButton({ setProblemImage }: PrimaryUploadButtonProps) {
  const [loaderProgress, setLoaderProgress] = useState<number | undefined>();
  const showProgressbar = loaderProgress !== undefined;

  return (
    <div className="relative w-full">
      <FadeImg src="/images/upload-docs.svg" className="absolute top-2 left-[45%] z-20" />
      <UploadButton
        onUploadProgress={(progress) => {
          setLoaderProgress(progress);
        }}
        endpoint="imageUploader"
        className="relative w-full z-10 !text-black border  border-dashed rounded-xs ut-button:bg-red-500 cursor-pointer bg-background"
        onClientUploadComplete={(response) => {
          setProblemImage(response[0].appUrl);
        }}
        onUploadError={(error) => {
          toast.error('Something went wrong!');
          console.log('Error', error);
        }}
        appearance={{
          button({ ready, isUploading }) {
            return {
              fontSize: '0.9rem',
              color: 'black',
              ...(ready && { color: '#67737D' }),
              ...(isUploading && { color: '#d1d5db' }),
            };
          },
          container: {
            paddingTop: '3rem',
            paddingBottom: '3rem',
          },
          allowedContent: {
            color: '#a1a1aa',
          },
        }}
        content={{
          button({ ready }) {
            if (ready)
              return (
                <span className="relative text-xs py-11 top-3">
                  Drag & Drop to upload photo or&nbsp;
                  <span className="underline text-primary">Choose Files</span>
                </span>
              );
            return <span className="relative z-30 text-xs text-primary-foreground top-3 py-7">Getting ready ...</span>;
          },
        }}
      />
      {showProgressbar && <Progress className="absolute bg-primary bottom-4 w-[60%] h-1 z-20 left-[20%]" value={loaderProgress} />}
    </div>
  );
}

export default PrimaryUploadButton;
