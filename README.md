# MAITH Frontend

> MAITH는 GPT 기반의 수학 문제 자동 생성 및 맞춤형 문제 추천 서비스를 제공하는 EdTech 플랫폼입니다.  
본 레포지토리는 MAITH의 **웹 프론트엔드**를 담당하며, **Next.js App Router 기반**으로 구성되어 있습니다.

---

## 📁 프로젝트 구조

```bash
src/
├── app/
│   ├── (auth)/auth/signin/         # Google OAuth 로그인
│   ├── (generic)/announcement/     # 공지사항 페이지
│   ├── (generic)/community/        # 커뮤니티 게시판
│   ├── (generic)/customer_service/ # 고객센터 페이지
│   ├── (generic)/policy/           # 서비스 정책
│   │   ├── privacy/                # 개인정보 처리방침
│   │   └── terms/                  # 이용약관
│   ├── (generic)/problem_collection/ # 문제 모음 페이지
│   ├── (generic)/program_info/     # 서비스 소개 페이지
│   ├── questions/create/           # 문제 생성 페이지
│   ├── layout.js                   # 공통 레이아웃
│   ├── page.js                     # 메인 페이지
├── components/                     # 공통 UI 컴포넌트
├── styles/
│   └── globals.css                 # 전역 CSS
```

---

## 🛠 기술 스택

| 항목           | 기술명                                |
|----------------|-----------------------------------------|
| 프레임워크      | Next.js 15 (App Router)                 |
| 스타일링        | Tailwind CSS, PostCSS                   |
| 인증            | Google OAuth2                           |
| 수식 표현       | react-latex-next                        |
| API 통신        | Axios, strapi-sdk-js                    |
| 상태관리        | React Hooks                             |
| CMS             | Strapi (공지사항/커뮤니티 등 CMS 연동) |

---

## 🚀 실행 방법

```bash
# 1. 설치
yarn install

# 2. 개발 서버 실행
yarn dev

# 브라우저에서 http://localhost:3000 접속
```

> `.env.local` 파일에 필요한 환경 변수 설정:
```env
NEXT_PUBLIC_MAITH_API_URL=https://maith-corsproxy.alex4386.workers.dev
NEXT_PUBLIC_STRAPI_URL=https://maith-cms.alex4386.me
NEXT_PUBLIC_STRAPI_TOKEN=your-token-here
```

---

## 🔧 사용 스크립트

| 명령어        | 설명                   |
|---------------|------------------------|
| `yarn dev`    | 개발 서버 실행         |
| `yarn build`  | 정적 사이트 빌드       |
| `yarn start`  | 빌드 결과 실행         |
| `yarn lint`   | ESLint 코드 검사       |

---

## 👥 주요 기여자

| 이름     | 역할               | GitHub                                 |
|----------|--------------------|----------------------------------------|
| 박상희   | Frontend Developer     | https://github.com/Alex4386            |
| 김병준   | Frontend Developer | https://github.com/jerry080697         |

---

## 📄 라이선스

MIT License © MAITH Team

---

> **“수학을 더 똑똑하게 배우는 방법, MAITH에서 시작하세요.”**
