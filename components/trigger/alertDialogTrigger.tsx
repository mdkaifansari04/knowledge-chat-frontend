import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import React, { Fragment, useEffect, useState } from 'react';
import useTestStore from '@/store/test';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTitleAndDescription } from '@/lib/utils';
import { Loader } from '../shared/loader';

export function ResultAlertDialog(props: {
  handleSubmit: (e: React.MouseEvent) => void;
  answer: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const {
    resetSubmittedAnswer,
    submittedAnswers,
    questions,
    resetCurrentQuestion,
    resetQuestion,
  } = useTestStore();

  useEffect(() => {
    setIsLoading(true);
    submittedAnswers.map((i) => {
      console.log('u', i.userAnswer);
      console.log('a', i.answer);

      if (i.answer === i.userAnswer) {
        console.log('correct');
        setScore((prev) => prev + 1);
      }
    });
    setIsLoading(false);
  }, [submittedAnswers]);

  const { title, description } = getTitleAndDescription(score, questions);
  return (
    <AlertDialog open={props.isDialogOpen} onOpenChange={props.setIsDialogOpen}>
      <AlertDialogTrigger>
        <Button
          disabled={false}
          onClick={(e) => props.handleSubmit(e)}
          className="mt-10 w-32 py-6"
          variant={'secondary'}
        >
          Submit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-10">
        <AlertDialogHeader className="flex justify-center items-center gap-4 md:gap-6">
          {isLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <AlertDialogTitle className="text-4xl md:text-6xl">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                {description}
              </AlertDialogDescription>
            </Fragment>
          )}
          <Button
            disabled={isLoading}
            onClick={() => {
              resetSubmittedAnswer();
              resetCurrentQuestion();
              resetQuestion();
              router.push('/tests/standard-7/chapters');
            }}
          >
            Back To Home
          </Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
