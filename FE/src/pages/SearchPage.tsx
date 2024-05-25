import styles from "@styles/Search.module.scss";
import Header from "@components/common/Header";
import InputWithButton from "@components/common/InputWithButton";
import SearchList from "@components/search/SearchList";

const SearchPage = () => {
  return (
    <>
      <Header title="전체 검색" before={() => console.log("이전")} />
      <div className={styles.search}>
        <InputWithButton
          inputText="검색어 입력"
          btnName="검색"
          placeHolder="키워드를 입력하세요."
          colors="gray-1"
          onSubmit={() => console.log("")}
          types="default"
        />
        <div className={styles.list}>
          <SearchList title="chatroom" />
          <SearchList title="recommend" />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
