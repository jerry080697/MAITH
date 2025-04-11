"use client";

import { useState, useEffect } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { getStrapiClient } from "@/lib/api";
  
export default function ProblemList() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [sortType, setSortType] = useState("recent");

  // 문제 정렬 함수
  useEffect(() => {
    const strapi = getStrapiClient();
  
    strapi.find('questions', {
      sort: sortType === 'recent' ? 'createdAt:desc' : 'difficulty',
    })
      .then((response) => {
        console.log("문제 데이터:", response);
        setProblems(response.data.map(problem => ({
          id: problem.id,
          title: problem.title,
          createdAt: new Date(problem.createdAt).toLocaleDateString('ko-KR'),
          content: problem.content,
          difficulty: problem.difficulty,
          question: problem.question,
          answer: problem.answer
        })));
      })
      .catch((error) => {
        console.error("문제 정보를 가져오는 중 오류 발생:", error);
      });
  }, []);

  const sortProblems = (type) => {  
    let sorted;
    if (type === "recent") {
      sorted = [...problems].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      sorted = [...problems].sort((a, b) => a.difficulty - b.difficulty);
    }
    setProblems(sorted);
    setSortType(type);
  };

  return (
    <div className="flex h-screen p-6">
      {/* 문제 목록 왼쪽 */}
      <div className="w-1/4 p-4 bg-secondary border-r border-gray-300 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <h1 className="text-2xl font-bold mb-4">문제 모음</h1>

        {/* 정렬 버튼 */}
        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => sortProblems("recent")} 
            className={sortType === "recent" ? "bg-blue-600 text-white p-2 rounded" : "bg-gray-400 text-black p-2 rounded"}
          >
            최근순 정렬
          </button>
          <button 
            onClick={() => sortProblems("difficulty")} 
            className={sortType === "difficulty" ? "bg-blue-600 text-white p-2 rounded" : "bg-gray-400 text-black p-2 rounded"}
          >
            난이도순 정렬
          </button>
        </div>

        {/* 문제 목록 (왼쪽에서 클릭하면 중앙에 표시됨) */}
        <div className="space-y-2">
          {problems.map((problem) => (
            <button
              key={problem.id}
              className="w-full text-left p-4 rounded-lg shadow-md"
              onClick={() => setSelectedProblem(problem)}
            >
              <div className="font-semibold">문제 {problem.id}: </div>
              <div className="text-secondary">{problem.question}</div>
              {/* <div className="text-gray-600">{problem.answer}</div> */}
            </button>
          ))}
        </div>
      </div>

      {/* 문제 내용 오른쪽 */}
      <div className="flex-1 p-6 bg-secondary rounded-lg shadow-lg ml-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {selectedProblem ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">문제 {selectedProblem.id}</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">문제:</h3>
                <Latex className="text-black">{`$${selectedProblem.question}$`}</Latex>
            </div>
            <div className="mb-4">
                <p className="font-semibold">정답:</p>
                <Latex className="text-black">{`$${selectedProblem.answer}$`}</Latex>
            </div>


            <div className="text-sm text-gray-500">
              <p>난이도: {selectedProblem.difficulty} / 생성일: {new Date(selectedProblem.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-lg">문제를 선택하세요.</p>
        )}
      </div>
    </div>
  );
}
