"use client";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-[calc(100dvh-12rem)] flex flex-col items-stretch justify-center gap-8 w-full">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-6">개인정보 처리방침</h1>
            <p>
                MAITH는 사용자의 개인정보를 중요하게 생각하며, 이를 보호하기 위해 최선을 다하고 있습니다.
                이 페이지에서는 MAITH의 개인정보 처리 방침에 대해 안내합니다.
            </p>
          </div>
          <article className="w-full">
            <h2 className="text-2xl font-bold">수집하는 개인정보 항목</h2>
            <p>
                MAITH는 회원가입, 문의하기 등 서비스 이용 시 아래와 같은 개인정보를 수집합니다.
            </p>
            <p>Add some legal stuff here...</p>
          </article>
        </div>

    );
}
