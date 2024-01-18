import Link from "next/link";
import postgres from "postgres";
import QuizForm from "./quiz-form";

const sql = postgres(process.env.DATABASE_URL!);

type Quiz = {
  quiz_id: number;
  title: string;
};

async function Quizzes() {
  const quizzes: Quiz[] = await sql`
    SELECT * FROM quizzez`;

  return (
    <ul>
      {quizzes.map((quiz) => (
        <li className="underline" key={quiz.quiz_id}>
          <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title} </Link>
        </li>
      ))}
    </ul>
  )
}

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-bold text-blue-700">Welcome to the Quizpage!</h1>
      <br></br>
      <Quizzes />
      <QuizForm />
    </section>
  );
}