'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Plus, ExternalLink, Calendar, Server, Box, FileText } from 'lucide-react';

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
          name: 'text-file',
          resourceType: 'audio',
          resource: 'https://ffkqpchu5z.ufs.sh/f/XqUzB92xh3mIFD8Xu7iTBl4AszVpgYG5RSmjyiq9C8Qx6Ik2',
          _id: '67de665d64fa10d934dbdabb',
        },
        {
          name: 'text-file',
          resourceType: 'audio',
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

type KnowledgeBase = {
  _id: string;
  name: string;
  dimension: number;
  metric: string;
  host: string;
  resources: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function KnowledgeBaseIndexPage() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>(knowledgeBasesData.data);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-8 mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Bases</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your vector databases and resources</p>
            </div>
            <Button className="mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Create New Knowledge Base
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Create New Knowledge Base Card */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="h-full transition-colors bg-transparent border-2 border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="p-4 mb-4 rounded-full bg-primary/10">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Create New Knowledge Base</h3>
                <p className="mb-4 text-gray-500 dark:text-gray-400">Set up a new vector database for your AI applications</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Knowledge Base
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Knowledge Base Cards */}
          {knowledgeBases.map((kb) => (
            <motion.div key={kb._id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Card className="h-full overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Database className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl capitalize">{kb.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {kb.metric}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">Created: {formatDate(kb.createdAt)}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Server className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400 truncate max-w-[250px]" title={kb.host}>
                        {kb.host}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <Box className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">Dimension: {kb.dimension}</span>
                    </div>

                    <div className="flex items-center text-sm">
                      <FileText className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400">
                        {kb.resources.length} {kb.resources.length === 1 ? 'Resource' : 'Resources'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-gray-400 truncate max-w-[150px]" title={kb._id}>
                      ID: {kb._id}
                    </span>
                    <Link href={`/knowledge-base/${kb._id}`}>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
