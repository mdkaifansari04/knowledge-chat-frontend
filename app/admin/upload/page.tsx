'use client';

import { withAdminAuth } from '@/app/provider/adminAuthProvider';
import { KnowledgebaseLoadingView } from '@/components/loading-view';
import QueryWrapper from '@/components/shared/wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetKnowledgebase } from '@/hooks/query';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Box, Calendar, Database, ExternalLink, FileText, Server } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page: React.FC = () => {
  const { data: knowledgeBases, isError, error, isPending } = useGetKnowledgebase();

  return (
    <div className="min-h-screen">
      <div className="container px-4 py-8 mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Bases</h1>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your vector databases and resources</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="w-full">
          {/* Knowledge Base Cards */}
          <QueryWrapper
            data={knowledgeBases}
            isError={isError}
            error={error}
            isPending={isPending}
            pendingView={<KnowledgebaseLoadingView />}
            view={
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {(Array.isArray(knowledgeBases) ? knowledgeBases : []).map((kb) => (
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
                          <Link href={`/admin/upload/${kb._id}`}>
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
            }
          />
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Page);

{
  /* Create New Knowledge Base Card */
}
{
  /* <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
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
          </motion.div> */
}
