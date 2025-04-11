"use client";

import { useState, useEffect } from "react";
import { getStrapiClient } from "@/lib/api";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function NoticePage() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    const strapi = getStrapiClient();
  
    strapi.find('announcements', {
      sort: 'createdAt:desc',
    })
      .then((response) => {
        console.log("공지사항 데이터:", response);
        setNotices(response.data.map(announcement => ({
          id: announcement.id,
          title: announcement.title,
          date: new Date(announcement.createdAt).toLocaleDateString('ko-KR'),
          content: announcement.content
        })));
      })
      .catch((error) => {
        console.error("공지사항을 가져오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div className="flex flex-col mx-auto max-w-screen-xl h-full p-6 gap-6">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold">공지사항</h1>
      </div>

      <div className="flex flex-col gap-4">
        {notices.map((notice, i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer"
            onClick={() => setSelectedNotice(notice)}
          >
            <h2 className="text-2xl font-semibold">{notice.title}</h2>
            <p className="text-sm text-gray-500">{notice.date}</p>
          </div>
        ))}
      </div>

      {selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-secondary max-w-lg w-full p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedNotice(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedNotice.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{selectedNotice.date}</p>

            <BlocksRenderer content={selectedNotice.content} />
          </div>
        </div>
      )}
    </div>
  );
}

