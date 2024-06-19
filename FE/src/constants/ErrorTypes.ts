export enum ERROR_MESSAGE {
  LOGIN_ERROR = "로그인 실패",
  LOGOUT_ERROR = "로그아웃 실패",
  WITHDRAW_ERROR = "회원 탈퇴 실패",
  INVALID_NICKNAME = "부적절한 닉네임입니다.",
  INVALID_NICKNAME_LENGTH = "닉네임은 16자리 이하로 설정해주세요",
  EXISTING_NICKNAME = "이미 존재하는 닉네임입니다.!",

  FETCH_MT_DATA_ERROR = "내 정보 가져오기 실패",
  FETCH_USER_DATA_ERROR = "유저 정보 가져오기 실패",
  NO_AUTHORED_MY_FEEDS = "내가 작성한 피드가 없습니다.",
  NO_SCRAPPED_MY_FEEDS = "내가 스크랩한 피드가 없습니다.",

  UPDATE_ERROR = "업데이트 실패",
  LIKED_ERROR = "좋아요 실패",
  BOOKMARK_ERROR = "북마크 실패",
  DELETE_FEED_ERROR = "피드 삭제 실패",

  FETCH_WEBTOON_ERROR = "웹툰 API 연결 실패",
  ALREADY_RECOMMENDED = "이미 추천한 웹툰입니다.",
  ALREADY_SELECTED_ERROR = "이미 선택된 웹툰입니다.",
  MIN_SELECTION_ERROR = "웹툰을 1개 이상 추가해주세요.",
  MAX_SELECTION_ERROR = "최대 4개의 웹툰만 선택할 수 있습니다.",
  TOON_RECOMMENDATION_REQUIRED = "웹툰 1가지 이상 추천해주세요",
  TITLE_OR_IMAGE_UNDEFINED = "웹툰의 title 또는 img가 정의되지 않았습니다.",

  TITLE_REQUIRED = "추천글 제목을 입력해주세요",
  SELECT_GENRE_AND_MOOD_MESSAGE = "최소 하나 이상의 장르와 분위기를 골라주세요",
}
