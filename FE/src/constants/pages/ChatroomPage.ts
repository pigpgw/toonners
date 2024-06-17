interface ChatContentsConfig {
  keyword: "today" | "rank" | "rest";
  title: string;
  subtitle: string;
  isMore: boolean;
  more: string;
}

export const CHAT_CONTENTS: ChatContentsConfig[] = [
  {
    keyword: "today",
    title: "오늘 뜬 웹툰 Talk",
    subtitle: "오늘 뜬 웹툰을 보고 다같이 이야기 나눠봐요!",
    isMore: true,
    more: "/chatroom/today",
  },
  {
    keyword: "rank",
    title: "실시간 인기 Talk",
    subtitle: "지금 가장 인기있는 웹툰에 대해 같이 이야기해요.",
    isMore: false,
    more: "/",
  },
  {
    keyword: "rest",
    title: "이런 웹툰 Talk도 있어요!",
    subtitle: "다른 사람들은 어떤 웹툰을 보고 있을까요?",
    isMore: true,
    more: "/chatroom/rest",
  },
];
