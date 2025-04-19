'use client';

import { useState } from "react";

const dummyPosts = [
  { id: 1, title: "게시글 제목 1", content: "게시글 내용 1", author: "user1", createdAt: "2024-03-10" },
  { id: 2, title: "게시글 제목 2", content: "게시글 내용 2", author: "user2", createdAt: "2024-03-11" },
  { id: 3, title: "게시글 제목 3", content: "게시글 내용 3", author: "user3", createdAt: "2024-03-12" },
  { id: 4, title: "게시글 제목 4", content: "게시글 내용 4", author: "user4", createdAt: "2024-03-13" },
  { id: 5, title: "게시글 제목 5", content: "게시글 내용 5", author: "user5", createdAt: "2024-03-14" },
  { id: 6, title: "게시글 제목 6", content: "게시글 내용 6", author: "user6", createdAt: "2024-03-15" },
  { id: 7, title: "게시글 제목 7", content: "게시글 내용 7", author: "user7", createdAt: "2024-03-16" },
  { id: 8, title: "게시글 제목 8", content: "게시글 내용 8", author: "user8", createdAt: "2024-03-17" },
  { id: 9, title: "게시글 제목 9", content: "게시글 내용 9", author: "user9", createdAt: "2024-03-18" },
  { id: 10, title: "게시글 제목 10", content: "게시글 내용 10", author: "user10", createdAt: "2024-03-19" },
  { id: 11, title: "게시글 제목 11", content: "게시글 내용 11", author: "user11", createdAt: "2024-03-20" },
  { id: 12, title: "게시글 제목 12", content: "게시글 내용 12", author: "user12", createdAt: "2024-03-21" },
  { id: 13, title: "게시글 제목 13", content: "게시글 내용 13", author: "user13", createdAt: "2024-03-22" },
  { id: 14, title: "게시글 제목 14", content: "게시글 내용 14", author: "user14", createdAt: "2024-03-23" },
  { id: 15, title: "게시글 제목 15", content: "게시글 내용 15", author: "user15", createdAt: "2024-03-24" },
  { id: 16, title: "게시글 제목 16", content: "게시글 내용 16", author: "user16", createdAt: "2024-03-25" },
  { id: 17, title: "게시글 제목 17", content: "게시글 내용 17", author: "user17", createdAt: "2024-03-26" },
  { id: 18, title: "게시글 제목 18", content: "게시글 내용 18", author: "user18", createdAt: "2024-03-27" },
  { id: 19, title: "게시글 제목 19", content: "게시글 내용 19", author: "user19", createdAt: "2024-03-28" },
  { id: 20, title: "게시글 제목 20", content: "게시글 내용 20", author: "user20", createdAt: "2024-03-29" },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(dummyPosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", author: "" });
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // 새 게시글 추가 함수
  const addNewPost = () => {
    const newPostData = {
      ...newPost,
      id: posts.length + 1,
      createdAt: new Date().toISOString(),
    };
    setPosts([newPostData, ...posts]); // 새 게시글을 맨 앞에 추가
    setNewPost({ title: "", content: "", author: "" }); // 입력 필드 초기화
    setIsCreatingPost(false); // 게시글 작성 상태 종료
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="작성자"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg"
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
