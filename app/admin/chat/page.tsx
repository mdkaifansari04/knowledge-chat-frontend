'use client';

import { ChatCardPendingView } from '@/components/loading-view';
import QueryWrapper from '@/components/shared/wrapper';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Query } from '@/data-access/responseType';
import { useGetQuery } from '@/hooks/query';
import { exportChatHistory, formatDateWithHours, isLongMessage } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, Clock, Download, Pin, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ChatHistory() {
  const [chatSessions, setChatSessions] = useState<Query[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Query[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedSessions, setExpandedSessions] = useState<Record<string, boolean>>({});
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({});

  const { data: queries, isPending: isFetchingQuery, isError, error, isFetched } = useGetQuery();

  useEffect(() => {
    if (isFetched && !isError && queries) {
      const sortedData = [...queries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Initialize expanded state for sessions with messages
      const initialExpandedSessions: Record<string, boolean> = {};
      sortedData.forEach((session) => {
        if (session.messages.length > 0) {
          initialExpandedSessions[session._id] = true;
        }
      });

      setChatSessions(sortedData);
      setFilteredSessions(sortedData);
      setExpandedSessions(initialExpandedSessions);
    }
  }, [isFetched]);

  // Filter and sort sessions based on search query and sort order
  useEffect(() => {
    let filtered = [...chatSessions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((session) => session.messages.some((message) => message.text.toLowerCase().includes(searchQuery.toLowerCase())));
    }

    // Sort by date
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    setFilteredSessions(filtered);
  }, [chatSessions, searchQuery, sortOrder]);

  // Toggle session expansion
  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  // Toggle message expansion for long messages
  const toggleMessage = (messageId: string) => {
    setExpandedMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  };

  // Format date for display

  return (
    <div className={`min-h-screen`}>
      <div className="container min-h-screen px-4 py-8 mx-auto">
        <header className="mb-8">
          <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
            <h1 className="mb-4 text-3xl font-bold text-primary dark:text-white md:mb-0">Chat History</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => exportChatHistory(chatSessions!)}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-grow">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <div className="w-full md:w-48">
              <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Chat Sessions */}
        <main>
          <QueryWrapper
            data={chatSessions}
            error={error}
            isError={isError}
            isPending={isFetchingQuery}
            pendingView={<ChatCardPendingView />}
            emptyDataView={<ExmptyDataView searchQuery={searchQuery ?? ''} />}
            view={
              <>
                {filteredSessions.map((session) => (
                  <Card key={session._id} className="mb-6 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between py-6 cursor-pointer" onClick={() => toggleSession(session._id)}>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-medium">Session {formatDateWithHours(session.createdAt)}</h3>
                        <Badge variant="outline" className="ml-2">
                          {session.messages.length} messages
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* <Button variant="ghost" size="icon">
                          <Pin className="w-4 h-4" />
                        </Button> */}
                        {expandedSessions[session._id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </CardHeader>

                    {expandedSessions[session._id] && (
                      <CardContent>
                        {session.messages.length === 0 ? (
                          <p className="py-4 text-center text-muted-foreground">No messages in this session</p>
                        ) : (
                          <div className="space-y-4">
                            {session.messages.map((message) => (
                              <div key={message._id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[80%]`}>
                                  <Avatar className={`h-8 w-8 ${message.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`}>{message.sender === 'user' ? 'U' : 'AI'}</Avatar>
                                  <div>
                                    <div className={`rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                                      {isLongMessage(message.text) && !expandedMessages[message._id] ? (
                                        <>
                                          <p className="whitespace-pre-line">{message.text.substring(0, 300)}...</p>
                                          <Button
                                            variant="link"
                                            className="h-auto p-0 mt-1 text-xs"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleMessage(message._id);
                                            }}
                                          >
                                            Read More
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <p className="whitespace-pre-line">{message.text}</p>
                                          {isLongMessage(message.text) && (
                                            <Button
                                              variant="link"
                                              className="h-auto p-0 mt-1 text-xs"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleMessage(message._id);
                                              }}
                                            >
                                              Show Less
                                            </Button>
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <div className={`text-xs text-muted-foreground mt-1 flex items-center ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                      <Clock className="w-3 h-3 mr-1" />
                                      {formatDistanceToNow(new Date(message.timestamps), { addSuffix: true })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </>
            }
          />
        </main>
      </div>
    </div>
  );
}

const ExmptyDataView = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <div className="py-12 text-center">
      <p className="text-lg text-muted-foreground">No chat sessions found</p>
      {searchQuery && <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search query</p>}
    </div>
  );
};
