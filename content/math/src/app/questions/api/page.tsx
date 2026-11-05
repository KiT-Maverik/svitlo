import { redirect } from 'next/navigation';

/** The retired attempt API is no longer a textbook feature. */
export default function QuestionApiPage() {
  redirect('/');
}
