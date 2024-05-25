import styles from "@styles/home/ChatRoom.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Text from "@/components/common/Text";
import Rating from "@/components/common/Rating";

const CustomAccordion = () => {
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
              <img />
            </div>
            <div>
              <div>
                <Text types="caption">추천 평점</Text>
                <Rating sizes="medium" />
              </div>
              <div>
                <Text types="caption">소개글</Text>
                <Text types="caption">내용</Text>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomAccordion;
