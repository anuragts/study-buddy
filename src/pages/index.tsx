import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <main>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </>
  );
}
