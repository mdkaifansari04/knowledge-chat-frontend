'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useUploadDocument, useUploadText, useUploadYTVideo, useMediaUpload } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage, isValidYouTubeUrl } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import PrimaryUploadButton from '../action/primary-upload-button';

interface ResourceUploaderProps {
  knowledgebaseId: string;
  indexName: string;
}
const ResourceUploader: React.FC<ResourceUploaderProps> = ({ knowledgebaseId, indexName }) => {
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [youtubeLink, setYoutubeLink] = useState('');
  const [textContent, setTextContent] = useState('');
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [resourceName, setResourceName] = useState<string>('');
  const { toast } = useToast();

  const { mutate: uploadDocument, isPending: isUploadingDocuemnt } = useUploadDocument();
  const { mutate: uploadYtVideo, isPending: isUploadingYtVideos } = useUploadYTVideo();
  const { mutate: uploadText, isPending: isUploadingText } = useUploadText();
  const { mutate: uploadMedia, isPending: isUploadingMedia } = useMediaUpload();

  const handleUploadDocument = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!documentUrl)
      return toast({
        title: 'Please upload the document',
        variant: 'destructive',
      });

    uploadDocument(
      { fileName: resourceName, fileUrl: documentUrl!, indexName, knowledgebaseId },
      {
        onSuccess: () => {
          toast({
            title: 'Document uploaded successfully',
          });
        },
        onError: (error) => {
          toast({
            title: getErrorMessage(error),
            variant: 'destructive',
          });
        },
        onSettled: () => {
          setResourceName('');
          setDocumentUrl(null);
        },
      },
    );
  };
  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!resourceName || !isValidYouTubeUrl(youtubeLink)) {
      toast({
        variant: 'destructive',
        title: 'Please enter valid youtube url',
      });
    }
    uploadYtVideo(
      { fileName: resourceName, fileUrl: youtubeLink, indexName, knowledgebaseId },
      {
        onSuccess: () => {
          toast({
            title: 'Resource uploaded successfully',
          });
        },
        onError: (error) => {
          toast({
            title: getErrorMessage(error),
            variant: 'destructive',
          });
        },
        onSettled: () => {
          setResourceName('');
          setYoutubeLink('');
        },
      },
    );
  };

  const handleTextUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    uploadText(
      { fileName: resourceName, indexName, knowledgebaseId, text: textContent },
      {
        onSuccess: () => {
          toast({
            title: 'Resource uploaded successfully',
          });
        },
        onError: (error) => {
          toast({
            title: getErrorMessage(error),
            variant: 'destructive',
          });
        },
        onSettled: () => {
          setResourceName('');
          setTextContent('');
        },
      },
    );
  };

  const handleMediaUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    uploadMedia(
      { fileName: resourceName, indexName, knowledgebaseId, fileUrl: mediaUrl },
      {
        onSuccess: () => {
          toast({
            title: 'Media uploaded successfully!',
          });
        },
        onError: (error) => {
          toast({
            title: getErrorMessage(error),
            variant: 'destructive',
          });
        },
        onSettled: () => {
          setResourceName('');
          setMediaUrl('');
        },
      },
    );
  };

  return (
    <div className="lg:col-span-2">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Upload Resources</h2>
      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="pdf" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="pdf">PDF & Docs</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="media">Audio & Video</TabsTrigger>
            </TabsList>

            {/* PDF & Docs Tab */}
            <TabsContent value="pdf" className="mt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pdf-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="pdf-name" placeholder="Enter resource name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Upload PDF or Document</label>
                  <PrimaryUploadButton endPoint="documentUploader" setResourceUrl={setDocumentUrl} />
                </div>

                <Button disabled={!resourceName || !documentUrl || isUploadingDocuemnt} className="w-full" onClick={(e) => handleUploadDocument(e)}>
                  {isUploadingDocuemnt ? <LoaderCircle className="w-5 h-5 animate-spin" /> : 'Upload Document'}
                </Button>
              </div>
            </TabsContent>

            {/* YouTube Tab */}
            <TabsContent value="youtube" className="mt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="youtube-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="youtube-name" placeholder="Enter resource name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="youtube-link" className="text-sm font-medium">
                    YouTube Link
                  </label>
                  <Input id="youtube-link" placeholder="https://youtube.com/watch?v=..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                </div>

                <Button onClick={(e) => handleYoutubeSubmit(e)} disabled={!resourceName || !youtubeLink || isUploadingYtVideos} className="w-full">
                  {isUploadingYtVideos ? <LoaderCircle className="w-5 h-5 animate-spin" /> : 'Add YouTube Video'}
                </Button>
              </div>
            </TabsContent>

            {/* Text Tab */}
            <TabsContent value="text" className="mt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="text-name" placeholder="Enter resource name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-content" className="text-sm font-medium">
                    Text Content
                  </label>
                  <Textarea id="text-content" placeholder="Enter your text content here..." className="min-h-[150px]" value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                </div>

                <Button onClick={(e) => handleTextUpload(e)} disabled={!resourceName || !textContent || isUploadingText} className="w-full">
                  {isUploadingText ? <LoaderCircle className="w-5 h-5 animate-spin" /> : 'Add Text Resource'}
                </Button>
              </div>
            </TabsContent>

            {/* Audio & Video Tab */}
            <TabsContent value="media" className="mt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="media-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="media-name" placeholder="Enter resource name" value={resourceName} onChange={(e) => setResourceName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Upload Audio or Video</label>
                  <PrimaryUploadButton endPoint="mediaUploader" setResourceUrl={setMediaUrl} />
                </div>

                <Button onClick={(e) => handleMediaUpload(e)} disabled={!resourceName || !mediaUrl || isUploadingMedia} className="w-full">
                  {isUploadingMedia ? <LoaderCircle className="w-5 h-5 animate-spin" /> : 'Upload Media'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceUploader;
