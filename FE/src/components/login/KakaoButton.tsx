import KakaoImg from "../../assets/images/login/KakaoImg.png";

const KakaoButton = ({ ...rest }) => {
  return (
    <button {...rest}>
      <img src={KakaoImg} alt="Kakao" />
    </button>
  );
};

export default KakaoButton