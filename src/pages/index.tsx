import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [question, setQuestion] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<string>("Nothing here now !");
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
    <main className="flex flex-col h-screen">
    <div className="flex-1 overflow-y-auto p-4">
      {loading ? <div>Loading...</div> : <div className="text-xl">{data}</div>}
    </div>
    <div className="flex-none">
      <form onSubmit={handleSubmit} className="flex items-center p-4 bg-gray-100">
        <select
          className="flex-1 p-2 mr-2 text-lg border border-gray-300 rounded-lg"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Explain to 7 year old">Explain to 7 year old</option>
          <option value="Summarize">Summarize</option>
        </select>
        <textarea
          className="flex-1 p-2 mr-2 text-lg border border-gray-300 rounded-lg resize-none"
          autoComplete="off"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Enter your prompt"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  </main>
  );
}
