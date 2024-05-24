import { useState } from "react";
import Input from "@components/common/Input";
import Text from "@components/common/Text";
import TextArea from "@components/common/TextArea";
import Button from "@components/common/Button";
import ConfirmButton from "@components/common/Button/Confirm";
import Tag from "@components/common/Tag";
import Bookmark from "@components/common/Tag/Bookmark";
import CreateButton from "@components/common/Button/Create";
import Arrow from "@components/common/Arrow";

const CommonPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div style={{ margin: "0 20px" }}>
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
        <Input name="name" placeholder="내용을 입력하세요." />
        <Input name="name" value="내용 입력" placeholder="placeholder test" />
        <Input placeholder="검색어 입력" types="search" />
        <Input value="검색어 입력" placeholder="검색어 입력" types="search" />
        <TextArea value={`text area \ntext area \ntext area`} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "50px" }}>
        <Button types="primary">Button</Button>
        <Button disabled>Disable Button</Button>
        <Button types="primary" sizes="small">
          참여
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "50px" }}>
        <div style={{ display: "flex", gap: "5px" }}>
          <Tag label="설레는" clickable />
          <Tag label="무서운" clickable />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Bookmark label="425" checked={isChecked} onChange={setIsChecked} />
          <Bookmark label="425" checked={isChecked} onChange={setIsChecked} />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Tag label={`🔥 NNN`} size="big" types="primary" />
          <Tag label={`🔥 NNN`} size="big" types="secondary" />
          <Tag label={`🔥 NNN`} size="big" types="gray" />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <Tag label={`🔥 NNN`} size="small" types="primary" />
          <Tag label={`🔥 NNN`} size="small" types="secondary" />
          <Tag label={`🔥 NNN`} size="small" types="gray" />
        </div>
      </div>
      <Arrow onClick={() => console.log("click")} />
      <br />
      <br />
      <CreateButton onClick={() => console.log("click")} />
    </div>
  );
};

export default CommonPage;
