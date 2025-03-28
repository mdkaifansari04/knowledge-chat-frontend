export const chatWithKnowledgebase = async (body: { userPrompt: string; indexName: string; sessionId: string; userId: string }) => {
  const response: Response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/knowledge-base/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userPrompt: body.userPrompt,
      indexName: body.indexName,
      sessionId: body.sessionId,
      userId: body.userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }

  console.log(response);

  return response;
};
