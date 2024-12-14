"use client";

export default function Terms() {
    return (
        <div className="min-h-[calc(100dvh-12rem)] flex flex-col items-stretch justify-center gap-8 w-full">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-6">이용약관</h1>
            <p>
                고객님께서 MAITH를 이용시 아래 약관에 동의하게 됩니다.
            </p>
          </div>
          <article className="w-full">
            <h2 className="text-2xl font-bold">...</h2>
            <p>Add some legal stuff here...</p>
          </article>
        </div>
    );
}
