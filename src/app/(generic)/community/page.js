'use client';

import { getStrapiAuthenticatedClient, getStrapiClient } from "@/lib/api";
import { use, useEffect, useState } from "react";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    fetchPosts();

    return () => {};
  });

  const fetchPosts = async () => {
    const strapi = getStrapiClient();
    strapi.find('posts', {
      sort: 'createdAt:desc',
    })
      .then((response) => {
        console.log("커뮤니티 데이터:", response);
        setPosts(response.data.map(announcement => ({
          id: announcement.id,
          title: announcement.title,
          date: new Date(announcement.createdAt).toLocaleDateString('ko-KR'),
          content: announcement.content
        })));
      })
      .catch((error) => {
        console.error("커뮤니티 데이터를 가져오는 중 오류 발생:", error);
      });
  };

  // 새 게시글 추가 함수
  const addNewPost = async () => {
    setIsCreatingPost(true);

    const accessToken = localStorage.getItem('accessToken');
    const strapi = await getStrapiAuthenticatedClient(accessToken);

    try {
      const response = await strapi.create('posts', {
        ...newPost,
      });
    } catch(e) {
      console.error("게시글 작성 중 오류 발생:", e);
    } finally {
      setIsCreatingPost(false); // 게시글 작성 상태 종료
    }
  };

  return (
    <div className="flex h-screen p-6">
      {/* 게시글 목록 왼쪽 */}
      <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <h1 className="text-2xl font-bold text-black mb-4">게시글 목록</h1>

        {/* 게시글 목록 (왼쪽에서 클릭하면 오른쪽에 표시됨) */}
        <div className="space-y-2">
          {posts.map((post) => (
            <button
              key={post.id}
              className="w-full text-left p-4 bg-white rounded-lg shadow-md hover:bg-gray-200"
              onClick={() => setSelectedPost(post)}
            >
              <div className="font-semibold text-black">{post.title}</div>
              <div className="text-gray-600">{post.content}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 게시글 내용 오른쪽 */}
      <div className="flex-1 p-6 bg-white rounded-lg shadow-lg ml-6" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        {/* 선택된 게시글 내용 */}
        {selectedPost ? (
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">{selectedPost.title}</h2>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-black">내용:</h3>
              <p className="text-black">{selectedPost.content}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-black">작성자: {selectedPost.author}</p>
              <p className="text-gray-500">{new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-black">게시글을 선택하세요.</p>
        )}
      </div>

      {/* 게시글 작성 버튼 */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsCreatingPost(true)}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg" // radius를 왼쪽 바탕과 동일하게 적용
        >
          새 게시글 작성
        </button>
      </div>

      {/* 게시글 작성 영역 */}
      {isCreatingPost && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-black mb-4">새 게시글 작성</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="제목"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="내용"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg"
                rows="4"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={addNewPost}
                className="bg-blue-600 text-white p-2 rounded"
              >
                게시글 작성
              </button>
              <button
                onClick={() => setIsCreatingPost(false)}
                className="bg-gray-600 text-white p-2 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
