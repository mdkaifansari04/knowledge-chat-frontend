export const chatWithBlog = async (value: { userPrompt: string }) => {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_URL}/blogs/chat/BLOGDB`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userPrompt: value.userPrompt,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch chat response');
  }

  console.log(response);

  return response;
};
