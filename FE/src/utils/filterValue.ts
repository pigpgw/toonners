import { profanities } from "@/constants/Profanities";

export const filterProfanity = (text: string) => {
  profanities.forEach((word) => {
    const regex = new RegExp(word, "gi");
    text = text.replace(regex, "*".repeat(word.length));
  });
  return text;
};

export const filterNickname = (nickname: string): boolean => {
  for (const profanity of profanities) {
    if (nickname.includes(profanity)) {
      console.log('있음',profanity)
      profanity
      return false;
    }
  }
  console.log('업승ㅁ')
  return true;
};
