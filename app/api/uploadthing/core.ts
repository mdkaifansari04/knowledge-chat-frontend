/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const uploadthing = createUploadthing();

export const ourFileRouter = {
  documentUploader: uploadthing({ 'application/pdf': { maxFileSize: '16MB' }, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { maxFileSize: '16MB' } })
    .middleware(async ({ req }) => {
      console.log('middleware', req);
      return { userId: 'demoUserID' };
    })
    .onUploadComplete(({ metadata, file }) => {
      return { fileUrl: file.ufsUrl };
    }),

  mediaUploader: uploadthing(['audio/mpeg', 'audio/mp4', 'video/mp4', 'video/mpeg'])
    .middleware(async ({ req }) => {
      console.log('middleware', req);
      return { userId: 'demoUserID' };
    })
    .onUploadComplete(({ metadata, file }) => {
      return { fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
