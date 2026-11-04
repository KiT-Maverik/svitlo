import { redirect } from 'next/navigation';

/** The obsolete demo lesson is superseded by the server-assembled lesson. */
export default function DemoTopic() {
  redirect('/topics/light');
}
