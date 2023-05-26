import { Inter } from "next/font/google";
import { useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/get", { question, prompt });
      let data = response.data;
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
    <div className="max-w-md bg-gray-100 rounded-lg p-4 shadow-md">
      <form onSubmit={handleSubmit}>
        <input
          className="p-5 m-5 text-2xl font-bold text-center bg-gray-100 rounded-xl text-black focus:outline-none"
          type="text"
          autoComplete="off"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Type your question..."
        />
        <input
          className="p-5 m-5 text-2xl font-bold text-center bg-gray-100 rounded-xl text-black focus:outline-none"
          type="text"
          autoComplete="off"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Type your prompt..."
        />
        <button className="p-4 bg-blue-500 text-white font-bold rounded-xl" type="submit">
          Send
        </button>
      </form>
  
      {loading ? (
        <div className="text-center mt-4">Loading...</div>
      ) : (
        <div>{data}</div>
      )}
    </div>
  </main>
  
  );
}
