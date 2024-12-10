"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState(null);

  useEffect(async () => {
    const code = new URLSearchParams(location.search).get('code')
    
    const form = new FormData();
    form.append('code', code);
    form.append('client_id', clientId);
    form.append('client_secret', clientSecret);
    form.append('redirect_uri', 'https://maith-frontend.pages.dev/auth/callback');
    form.append('grant_type', 'authorization_code');

    const res = await axios.post("https://oauth2.googleapis.com/token", form);
    setAccessToken(res.data.access_token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log('accessToken', accessToken);
    }
  }, [accessToken]);

  return (
    <div className="flex mx-auto max-w-screen-xl h-screen gap-4 justify-center items-center">
      <div className="flex flex-col gap-4 items-center">
        <i className="fas fa-right-to-bracket text-5xl"></i>
        <p>MAITH 로그인을 처리하는 중입니다. 잠시만 기다려 주세요.</p>
      </div>
    </div>
  );
}
