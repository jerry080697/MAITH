"use client";

import { useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

// 더미 데이터 (기존에 생성된 문제 목록)
const dummyProblems = [
    { 
      id: 1, 
      question: "1 + 1은 무엇인가?", 
      answer: "2", 
      difficulty: 1, 
      createdAt: "2024-03-10T14:00:00Z" 
    },
    { 
      id: 2, 
    //   question: "미분 \\( f(x) = x^2 \\)의 도함수는?", 
    question: "미분(f(x) = x^2)의 도함수는?", 
      answer: "2x", 
      difficulty: 2, 
      createdAt: "2024-03-12T10:30:00Z" 
    },
    { 
      id: 3, 
      question: "정사각형의 넓이를 구하는 공식은?", 
    //   answer: "\\( s^2 \\)", 
    answer: "(s^2)", 
      difficulty: 1, 
      createdAt: "2024-03-15T08:45:00Z" 
    },
    { 
      id: 4, 
    //   question: "적분 \\( \\int x dx \\)의 결과는?", 
    //   answer: "\\( \\frac{x^2}{2} + C \\)", 
    question: "적분(int  x dx)의 결과는?", 
      answer: "(frac {x^2}{2} + C)", 
      difficulty: 3, 
      createdAt: "2024-03-18T16:20:00Z" 
    },
    { 
      id: 5, 
      question: "삼각형의 넓이 공식은?", 
      answer: "\\( \\frac{1}{2} \\times 밑변 \\times 높이 \\)", 
      difficulty: 2, 
      createdAt: "2024-03-20T13:00:00Z"
    },
    { 
      id: 6, 
      question: "자연수의 합 구하는 공식은?", 
      answer: "\\( \\frac{n(n+1)}{2} \\)", 
      difficulty: 1, 
      createdAt: "2024-03-22T09:15:00Z"
    },
    { 
      id: 7, 
      question: "로그의 성질 \\( \\log(ab) = \\log(a) + \\log(b) \\)에서, a와 b의 곱의 로그는 무엇인가?", 
      answer: "\\log(a) + \\log(b)", 
      difficulty: 2, 
      createdAt: "2024-03-23T11:30:00Z" 
    },
    { 
      id: 8, 
      question: "삼각 함수 \\( \\sin^2(x) + \\cos^2(x) = 1 \\)의 증명 방법은?", 
      answer: "피타고라스 정리", 
      difficulty: 3, 
      createdAt: "2024-03-25T14:20:00Z" 
    },
    { 
      id: 9, 
      question: "복소수 \\( i^2 \\)의 값은?", 
      answer: "-1", 
      difficulty: 2, 
      createdAt: "2024-03-26T17:10:00Z"
    },
    { 
      id: 10, 
      question: "이차방정식 \\( ax^2 + bx + c = 0 \\)의 해는 무엇으로 구할 수 있는가?", 
      answer: "근의 공식", 
      difficulty: 1, 
      createdAt: "2024-03-27T08:40:00Z"
    }
  ];
  
  
export default function ProblemList() {
  const [problems, setProblems] = useState(dummyProblems);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [sortType, setSortType] = useState("recent");

  // 문제 정렬 함수
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
      <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <h1 className="text-2xl font-bold text-black mb-4">문제 모음</h1>

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
              className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:bg-gray-200"
              onClick={() => setSelectedProblem(problem)}
            >
              <div className="font-semibold text-black">문제 {problem.id}: </div>
              <div className="text-black">{problem.question}</div>
              {/* <div className="text-gray-600">{problem.answer}</div> */}
            </button>
          ))}
        </div>
      </div>

      {/* 문제 내용 오른쪽 */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg ml-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {selectedProblem ? (
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">문제 {selectedProblem.id}</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold text-black">문제:</h3>
                <Latex className="text-black">{`$${selectedProblem.question}$`}</Latex>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-black">정답:</p>
                <Latex className="text-black">{`$${selectedProblem.answer}$`}</Latex>
            </div>


            <div className="text-sm text-gray-500">
              <p>난이도: {selectedProblem.difficulty} / 생성일: {new Date(selectedProblem.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-black">문제를 선택하세요.</p>
        )}
      </div>
    </div>
  );
}
