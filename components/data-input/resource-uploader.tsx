'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useUploadDocument, useUploadYTVideo } from '@/hooks/mutation';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage, isValidYouTubeUrl } from '@/lib/utils';
import { FileAudio, FileVideo, Loader, LoaderCircle } from 'lucide-react';
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
  const [fileName, setFileName] = useState('');
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [resourceName, setResourceName] = useState<string>('');
  const { toast } = useToast();

  const { mutate: uploadDocument, isPending: isUploadingDocuemnt } = useUploadDocument();
  const { mutate: uploadYtVideo, isPending: isUploadingYtVideos } = useUploadYTVideo();

  const simulateUpload = (type: string) => {
    const id = `upload-${Date.now()}`;
    setUploadProgress({ ...uploadProgress, [id]: 0 });

    const interval = setInterval(() => {
      // setUploadProgress((prev) => {
      //   const newProgress = Math.min((prev[id] || 0) + 10, 100);
      //   if (newProgress === 100) {
      //     clearInterval(interval);
      //     setTimeout(() => {
      //       setIsUploading((prev) => ({ ...prev, [id]: false }));
      //       // Add the new resource
      //       const newResource: Resource = {
      //         _id: `new-${Date.now()}`,
      //         name: fileName || `New ${type} resource`,
      //         resourceType: type,
      //         resource: type === 'ytVideo' ? youtubeLink : type === 'text' ? textContent : `https://example.com/${fileName || 'file'}`,
      //       };
      //   //     setKnowledgeBase((prev) => {
      //   //       if (!prev) return prev;
      //   //       return {
      //   //         ...prev,
      //   //         resources: [...prev.resources, newResource],
      //   //       };
      //   //     });
      //   //     setFileName('');
      //   //     setYoutubeLink('');
      //   //     setTextContent('');
      //   //   }, 500);
      //   // }
      //   return { ...prev, [id]: newProgress };
      // });
    }, 300);
  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      simulateUpload(type);
    }
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

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textContent) {
      simulateUpload('text');
    }
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
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="text-name" placeholder="Enter resource name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="text-content" className="text-sm font-medium">
                    Text Content
                  </label>
                  <Textarea id="text-content" placeholder="Enter your text content here..." className="min-h-[150px]" value={textContent} onChange={(e) => setTextContent(e.target.value)} />
                </div>

                <Button type="submit" className="w-full">
                  Add Text Resource
                </Button>
              </form>
            </TabsContent>

            {/* Audio & Video Tab */}
            <TabsContent value="media" className="mt-4">
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="media-name" className="text-sm font-medium">
                    Resource Name
                  </label>
                  <Input id="media-name" placeholder="Enter resource name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Upload Audio or Video</label>
                  <div className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <input
                      type="file"
                      id="media-upload"
                      className="hidden"
                      accept="audio/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const type = file.type.startsWith('audio/') ? 'audio' : 'video';
                          handleFileChange(e, type);
                        }
                      }}
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <div className="flex justify-center space-x-4">
                        <FileAudio className="w-10 h-10 text-gray-400" />
                        <FileVideo className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag and drop your file here or click to browse</p>
                      <p className="mt-1 text-xs text-gray-400">Supports MP3, WAV, MP4, MOV (Max 50MB)</p>
                    </label>
                  </div>
                </div>

                <Button className="w-full" onClick={() => simulateUpload('media')}>
                  Upload Media
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Upload Progress */}
          {/* {Object.keys(isUploading).map(
            (id) =>
              isUploading[id] && (
                <div key={id} className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress[id]}%</span>
                  </div>
                  <Progress value={uploadProgress[id]} className="h-2" />
                </div>
              ),
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceUploader;
