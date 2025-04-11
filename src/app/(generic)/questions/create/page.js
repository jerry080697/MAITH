"use client";

import { useEffect, useState } from "react";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import axios from "axios";
import { getAuthenticatedMaithAPI } from "@/lib/api";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) {
      alert("프롬프트를 입력해주세요.");
      return;
    }
  
    setLoading(true);
    setResponseText(""); // 이전 응답 초기화

    try {
      const axios = getAuthenticatedMaithAPI();
      const response = await axios.post(
        "/api/problems/generate",
        { prompt },
        {
          responseType: "text", // 'stream' 대신 'text' 사용
        }
      );
  
      console.log("서버 응답 성공:", response.data);
      setResponseText(response.data); // 응답 데이터를 직접 사용
    } catch (error) {
      console.error("서버 응답 실패:", error.response?.data || error.message);
      alert(`문제 생성에 실패했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <>
      <div className="my-4">
        <label htmlFor="prompt" className="block text-lg font-medium">
          생성하고 싶은 문제를 입력해주세요:
        </label>
        <input
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="예: 간단한 수학 문제를 생성해줘"
          className="mt-2 p-2 border rounded w-full text-black placeholder-gray-500"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "생성 중..." : "문제 생성"}
        </button>
      </div>

      {responseText && (
        <div className="my-4">
          <h2 className="text-lg font-medium">생성된 문제:</h2>
          <div className="mt-2 p-4 border rounded bg-white text-black">
            <Latex>{responseText}</Latex>
          </div>
        </div>
      )}
    </>
  );
}

