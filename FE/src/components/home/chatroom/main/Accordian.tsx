import styles from "@styles/home/ChatRoom.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Text from "@/components/common/Text";
import Rating from "@/components/common/Rating";
import { ChatRoomInfoConfig } from "@/interface/ChatRoom.interface";

interface Props {
  info: ChatRoomInfoConfig;
}

const CustomAccordion = ({ info }: Props) => {
  return (
    <>
      <Accordion
        className={styles.accordion}
        sx={{
          "&.MuiAccordion-root": {
            boxShadow: "none",
            border: "none",
            "&::before": {
              backgroundColor: "transparent",
            },
          },
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          sx={{
            "&.MuiAccordionSummary-root": {
              minHeight: "24px",
            },
          }}
          expandIcon={<ExpandMoreIcon />}
        />

        <AccordionDetails>
          <div className={styles.info}>
            <div>
              <img src={info.toonImageUrl} alt="웹툰 이미지" />
            </div>
            <div>
              <div>
                <Text types="caption">추천 평점</Text>
                <Rating defaultValue={info.rating} sizes="medium" readOnly />
              </div>
              <div>
                <Text types="caption">소개글</Text>
                <Text types="caption">{info.contexts}</Text>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
