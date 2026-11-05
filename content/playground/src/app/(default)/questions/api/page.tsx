import { redirect } from 'next/navigation';

/** The previous attempt API was replaced by the contract response renderer. */
export default function QuestionApiPage() {
  redirect('/questions');
}
