/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = (req: Request) => ({ id: 'defaultUserId' });

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      console.log('test 1 ==========================================================================');

      return { userId: 'demoUserId' };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('test 2 ==========================================================================');
      console.log('Upload complete for userId:', metadata.userId);
      console.log(file);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { imageUrl: file.url, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
