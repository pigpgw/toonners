import { useEffect, useState } from "react";
import Input from "@components/common/Input";
import Text from "@components/common/Text";
import TextArea from "@components/common/TextArea";
import Button from "@components/common/Button";
import KakaoButton from "@components/common/Button/Kakao";
import Tag from "@components/common/Tag";
import Bookmark from "@components/common/Tag/Bookmark";
import CreateButton from "@components/common/Button/Create";
import Arrow from "@components/common/Arrow";
import Rating from "@/components/common/Rating";
import Badge from "@/components/common/Badge";
import InputWithButton from "@/components/common/InputWithButton";

const CommonPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState<number | null>(null);
  const changeValue = (val: number | null) => {
    setValue(val);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div style={{ margin: "0 20px", padding: "40px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Text types="caption">Caption caption, Regular</Text>
        <Text types="body-1">Body-1 body-1, Regular</Text>
        <Text types="body-2" bold="medium">
          Body-2 body-2, Medium
        </Text>
        <Text types="button" bold="bold">
          Button button, Bold
        </Text>
        <br />
        <Text types="display" bold="semi-bold">
          Display display, Semi Bold
        </Text>
        <Text types="headline" bold="semi-bold">
          HeadLine headline, Semi Bold
        </Text>
        <Text types="title" bold="semi-bold">
          Title title, Semi Bold
        </Text>
        <Text types="sub-header" bold="semi-bold">
          Sub-Header sub-header, Semi Bold
        </Text>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "50px" }}>
        <Input name="name" types="default" placeholder="내용을 입력하세요." />
        <Input name="name" types="default" value="내용 입력" placeholder="placeholder test" />
        <Input types="search" placeholder="검색어 입력" />
        <Input types="default" label="닉네임" value="검색어 입력" placeholder="검색어 입력" />
        <Input types="search" value="검색어 입력" placeholder="검색어 입력" />
        <InputWithButton
          inputText="닉네임"
          btnName="확인"
          onSubmit={() => console.log("")}
          placeHolder="닉네임을 입력해주세요"
          color="gray-1"
        />
        <InputWithButton
          inputText="닉네임"
          btnName="확인"
          onSubmit={() => console.log("")}
          placeHolder="닉네임을 입력해주세요"
          color="gray-1"
          label="닉네임"
        />
        <TextArea value={`text area \ntext area \ntext area`} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "50px" }}>
        <Button types="primary">Button</Button>
        <Button disabled>Disable Button</Button>
        <Button types="primary" sizes="small">
          참여
        </Button>
        <KakaoButton onClick={() => console.log("click")} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "50px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <Tag label="태그 키워드" sizes="small" clickable />
          <Tag label="태그 키워드" sizes="medium" clickable />
          <Tag label="태그 키워드" sizes="large" clickable />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Bookmark label="425" checked={isChecked} onChange={setIsChecked} />
          <Bookmark label="425" checked={isChecked} onChange={setIsChecked} />
        </div>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <Arrow onClick={() => console.log("click")} />
        <CreateButton />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <Rating sizes="small" onChange={(_, value) => changeValue(value)} />
        <Rating sizes="medium" onChange={(_, value) => changeValue(value)} />
        <Rating sizes="large" onChange={(_, value) => changeValue(value)} />
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <Badge sizes="small" types="primary" label="뱃지 내용" />
        <Badge sizes="medium" types="primary" label="뱃지 내용" />
        <Badge sizes="large" types="primary" label="뱃지 내용" />
      </div>
      <div style={{ display: "flex", gap: "5px", backgroundColor: "black", padding: "10px" }}>
        <Badge sizes="small" types="secondary" label="뱃지 내용" />
        <Badge sizes="medium" types="secondary" label="뱃지 내용" />
        <Badge sizes="large" types="secondary" label="뱃지 내용" />
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <Badge sizes="small" types="tertiary" label="뱃지 내용" />
        <Badge sizes="medium" types="tertiary" label="뱃지 내용" />
        <Badge sizes="large" types="tertiary" label="뱃지 내용" />
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <Badge sizes="small" types="gray" label="뱃지 내용" />
        <Badge sizes="medium" types="gray" label="뱃지 내용" />
        <Badge sizes="large" types="gray" label="뱃지 내용" />
      </div>
    </div>
  );
};

export default CommonPage;
