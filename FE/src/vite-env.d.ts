interface ImportMetaEnv {
  readonly VITE_KAKAO_REDIRECT_URI: string;
  readonly VITE_KAKAO_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
