'use client';

import type React from 'react';

import { withAdminAuth } from '@/app/provider/adminAuthProvider';
import ResourceUploader from '@/components/data-input/resource-uploader';
import { KnowledgebaseCardLoadingView, ResourceGroupLoadingView } from '@/components/loading-view';
import QueryWrapper from '@/components/shared/wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetKnowledgebaseById } from '@/hooks/query';
import { formatDate } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, File, FileAudio, FileText, FileVideo, Trash2, Type, Youtube } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const KnowledgeBasePage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const { data: knowledgeBase, isPending, error, isError } = useGetKnowledgebaseById(params.id as string);

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

  const handleDelete = (id: string) => {};

  return (
    <div className="min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 capitalize dark:text-white">{knowledgeBase.name} Knowledge Base</h1>
          </div>

          <QueryWrapper
            data={knowledgeBase}
            isError={isError}
            error={error}
            isPending={isPending}
            pendingView={<KnowledgebaseCardLoadingView />}
            view={
              <>
                <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Resources</div>
                        <div className="text-2xl font-bold">{knowledgeBase.resources?.length ?? 0}</div>
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
              </>
            }
          />

          <div className="flex flex-col mt-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 truncate max-w-[600px]">Host: {knowledgeBase.host}</p>
              <p className="text-gray-500 dark:text-gray-400">ID: {knowledgeBase._id}</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Resources</h2>
            <QueryWrapper
              data={knowledgeBase}
              isPending={isPending}
              pendingView={<ResourceGroupLoadingView />}
              isError={isError}
              error={error}
              view={
                <>
                  {knowledgeBase.resources?.length === 0 ? (
                    <Card className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-4 mb-4 rounded-full bg-primary/10">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">No Resources Yet</h3>
                        <p className="mb-4 text-gray-500 dark:text-gray-400">Start by adding resources to your knowledge base</p>
                      </div>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {(Array.isArray(knowledgeBase.resources) ? knowledgeBase.resources : []).map((resource) => (
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
                </>
              }
            />
          </div>

          {/* Upload Section */}
          <ResourceUploader indexName={knowledgeBase.name} knowledgebaseId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(KnowledgeBasePage);
