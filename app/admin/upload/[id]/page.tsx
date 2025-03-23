'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { FileText, Youtube, Type, FileAudio, FileVideo, Trash2, ChevronDown, ChevronUp, File, Upload, ArrowLeft } from 'lucide-react';
import { withAdminAuth } from '@/app/provider/adminAuthProvider';

// Sample data from the provided JSON
const knowledgeBasesData = {
  success: true,
  message: 'Knowledgebases',
  data: [
    {
      _id: '67dbbf070a0c919e07a79f04',
      name: 'appnologyjames',
      dimension: 3072,
      metric: 'cosine',
      host: 'appnologyjames-yjbrs4f.svc.aped-4627-b74a.pinecone.io',
      resources: [],
      createdAt: '2025-03-20T07:08:55.147Z',
      updatedAt: '2025-03-20T07:08:55.147Z',
      __v: 0,
    },
    {
      _id: '67dbbf200a0c919e07a79f08',
      name: 'cybersecurity',
      dimension: 3072,
      metric: 'cosine',
      host: 'cybersecurity-yjbrs4f.svc.aped-4627-b74a.pinecone.io',
      resources: [],
      createdAt: '2025-03-20T07:09:20.169Z',
      updatedAt: '2025-03-20T07:09:20.169Z',
      __v: 0,
    },
    {
      _id: '67dbbf2e0a0c919e07a79f0c',
      name: 'marketdata',
      dimension: 3072,
      metric: 'cosine',
      host: 'marketdata-yjbrs4f.svc.aped-4627-b74a.pinecone.io',
      resources: [],
      createdAt: '2025-03-20T07:09:34.451Z',
      updatedAt: '2025-03-20T07:09:34.451Z',
      __v: 0,
    },
    {
      _id: '67dbbf330a0c919e07a79f10',
      name: 'demo',
      dimension: 3072,
      metric: 'cosine',
      host: 'demo-yjbrs4f.svc.aped-4627-b74a.pinecone.io',
      resources: [
        {
          name: 'kaif',
          resourceType: 'pdf',
          resource: 'https://ffkqpchu5z.ufs.sh/f/XqUzB92xh3mIva13zu6nikfL8n7wTsHAyS9gF6NYV2Gzr0CK',
          _id: '67de65d264fa10d934dbdaa2',
        },
        {
          name: 'yt-video',
          resourceType: 'ytVideo',
          resource: 'https://youtu.be/z7WtUctYjlc?si=nbpVQlgRR29AGthe',
          _id: '67de65fc64fa10d934dbdaaa',
        },
        {
          name: 'text-file',
          resourceType: 'text',
          resource: 'hello',
          _id: '67de663564fa10d934dbdab4',
        },
        {
          name: 'audio-file',
          resourceType: 'audio',
          resource: 'https://ffkqpchu5z.ufs.sh/f/XqUzB92xh3mIFD8Xu7iTBl4AszVpgYG5RSmjyiq9C8Qx6Ik2',
          _id: '67de665d64fa10d934dbdabb',
        },
        {
          name: 'video-file',
          resourceType: 'video',
          resource: 'https://ffkqpchu5z.ufs.sh/f/XqUzB92xh3mI5zicMJGrpAqwCusWdvN5BcFQzfIXk68o1JVb',
          _id: '67de66e064fa10d934dbdac4',
        },
      ],
      createdAt: '2025-03-20T07:09:39.843Z',
      updatedAt: '2025-03-22T07:29:36.384Z',
      __v: 5,
    },
  ],
};

type Resource = {
  name: string;
  resourceType: string;
  resource: string;
  _id: string;
};

type KnowledgeBase = {
  _id: string;
  name: string;
  dimension: number;
  metric: string;
  host: string;
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const KnowledgeBasePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({});
  const [youtubeLink, setYoutubeLink] = useState('');
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Find the knowledge base with the matching ID
    const kb = knowledgeBasesData.data.find((kb) => kb._id === params.id);
    if (kb) {
      setKnowledgeBase(kb);
    }
  }, [params.id]);

  if (!knowledgeBase) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Knowledge Base Not Found</h1>
          <Button onClick={() => router.push('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Bases
          </Button>
        </div>
      </div>
    );
  }

  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'ytVideo':
        return <Youtube className="w-5 h-5" />;
      case 'text':
        return <Type className="w-5 h-5" />;
      case 'audio':
        return <FileAudio className="w-5 h-5" />;
      case 'video':
        return <FileVideo className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleDelete = (id: string) => {
    setKnowledgeBase((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        resources: prev.resources.filter((resource) => resource._id !== id),
      };
    });
  };

  const simulateUpload = (type: string) => {
    const id = `upload-${Date.now()}`;
    setIsUploading({ ...isUploading, [id]: true });
    setUploadProgress({ ...uploadProgress, [id]: 0 });

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = Math.min((prev[id] || 0) + 10, 100);

        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading((prev) => ({ ...prev, [id]: false }));

            // Add the new resource
            const newResource: Resource = {
              _id: `new-${Date.now()}`,
              name: fileName || `New ${type} resource`,
              resourceType: type,
              resource: type === 'ytVideo' ? youtubeLink : type === 'text' ? textContent : `https://example.com/${fileName || 'file'}`,
            };

            setKnowledgeBase((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                resources: [...prev.resources, newResource],
              };
            });

            setFileName('');
            setYoutubeLink('');
            setTextContent('');
          }, 500);
        }

        return { ...prev, [id]: newProgress };
      });
    }, 300);
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
    if (youtubeLink) {
      simulateUpload('ytVideo');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textContent) {
      simulateUpload('text');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 capitalize dark:text-white">{knowledgeBase.name} Knowledge Base</h1>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Resources</div>
                  <div className="text-2xl font-bold">{knowledgeBase.resources.length}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Dimension</div>
                  <div className="text-2xl font-bold">{knowledgeBase.dimension}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Metric</div>
                  <div className="text-2xl font-bold capitalize">{knowledgeBase.metric}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Created</div>
                  <div className="text-lg font-medium">{formatDate(knowledgeBase.createdAt)}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 truncate max-w-[600px]">Host: {knowledgeBase.host}</p>
              <p className="text-gray-500 dark:text-gray-400">ID: {knowledgeBase._id}</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Upload className="w-4 h-4 mr-2" />
              Add New Resource
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Resource Display Section */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Resources</h2>
            {knowledgeBase.resources.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-4 mb-4 rounded-full bg-primary/10">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">No Resources Yet</h3>
                  <p className="mb-4 text-gray-500 dark:text-gray-400">Start by adding resources to your knowledge base</p>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Add First Resource
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {knowledgeBase.resources.map((resource) => (
                  <Card key={resource._id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">{getResourceIcon(resource.resourceType)}</div>
                          <div>
                            <CardTitle className="text-lg">{resource.name}</CardTitle>
                            <p className="text-sm text-gray-500 capitalize dark:text-gray-400">{resource.resourceType === 'ytVideo' ? 'YouTube Video' : resource.resourceType}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(resource._id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20">
                            <Trash2 className="w-5 h-5" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toggleCard(resource._id)}>
                            {expandedCard === resource._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedCard === resource._id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                          <CardContent className="p-4 border-t">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Resource Link:</span>
                                <a href={resource.resource} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate max-w-[300px]">
                                  {resource.resource}
                                </a>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Resource ID:</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{resource._id}</span>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Upload Resources</h2>
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="pdf" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-2">
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
                        <Input id="pdf-name" placeholder="Enter resource name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">Upload PDF or Document</label>
                        <div className="p-6 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <input type="file" id="pdf-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'pdf')} />
                          <label htmlFor="pdf-upload" className="cursor-pointer">
                            <FileText className="w-10 h-10 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag and drop your file here or click to browse</p>
                            <p className="mt-1 text-xs text-gray-400">Supports PDF, DOC, DOCX (Max 10MB)</p>
                          </label>
                        </div>
                      </div>

                      <Button className="w-full" onClick={() => simulateUpload('pdf')}>
                        Upload Document
                      </Button>
                    </div>
                  </TabsContent>

                  {/* YouTube Tab */}
                  <TabsContent value="youtube" className="mt-4">
                    <form onSubmit={handleYoutubeSubmit} className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <label htmlFor="youtube-name" className="text-sm font-medium">
                          Resource Name
                        </label>
                        <Input id="youtube-name" placeholder="Enter resource name" value={fileName} onChange={(e) => setFileName(e.target.value)} />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label htmlFor="youtube-link" className="text-sm font-medium">
                          YouTube Link
                        </label>
                        <Input id="youtube-link" placeholder="https://youtube.com/watch?v=..." value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                      </div>

                      <Button type="submit" className="w-full">
                        Add YouTube Video
                      </Button>
                    </form>
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
                {Object.keys(isUploading).map(
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
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(KnowledgeBasePage);
