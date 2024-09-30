"use client";
import { useRef, useState } from "react";
import { Button, Grid, Box, Modal, Container } from "@mui/material";
import Score from "./Score";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import styles from "./page.module.css";
import {
  getBalls,
  getOvers,
  scoreCalculation,
  scoreCalculationExtra,
} from "./ScoreCalculation";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#EEFCCE",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ColorButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "black",
  border: "white",
  marginRight: "10px",
  marginTop: "10px",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
    border: "black",
  },
}));
const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focusColor,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));
export default function Home() {
  //State set!
  const [selectedScore, setSelectedScore] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [components, setComponents] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalBalls, setTotalBalls] = useState(0);
  const [totalOvers, setTotalOvers] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);
  const runsRef = useRef();

  //Map needed for components
  const scoreArray = [0, 1, 2, 3, 4, 5, 6];
  const extras = ["WD", "NB", "B", "LB", "W"];

  //Isopen and set it for modal
  const [open, setOpen] = useState(false);
  const handleOpen = (extra) => {
    setSelectedExtra(extra);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  function getScore(score) {
    setComponents((prevComponents) => [
      ...prevComponents,
      <Score key={prevComponents.length + 1} selectedScore={score} />,
    ]);
    setSelectedScore(score);
    setTotalScore(scoreCalculation(score));
    setTotalBalls(getBalls());
    setTotalOvers(getOvers());
  }
  function getScoreExtra(score, extra) {
    setComponents((prevComponents) => [
      ...prevComponents,
      <Score
        key={prevComponents.length + 1}
        selectedScore={score}
        selectedExtra={extra}
      />,
    ]);
    setSelectedScore(score);
    setSelectedExtra(extra);
    if (selectedExtra === "W") {
      setTotalWickets(totalWickets + 1);
    }
    if (
      selectedExtra === "B" ||
      selectedExtra === "LB" ||
      selectedExtra === "W"
    ) {
      setTotalScore(scoreCalculation(score));
      setTotalBalls(getBalls());
      setTotalOvers(getOvers());
    } else {
      setTotalScore(scoreCalculationExtra(score));
      setTotalBalls(getBalls());
      setTotalOvers(getOvers());
    }
    setOpen(false);
  }
  return (
    <>
      <h1>Cric Score</h1>
      <h1>
        {totalScore}-{totalWickets}({totalOvers})
      </h1>
      {/* <h1>Balls:-{totalBalls}</h1>
      <h1>Overs:{totalOvers}</h1> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="20vh"
      >
        <Grid container justifyContent="center">
          <Grid container justifyContent="center" spacing={1}>
            {components.map((component, index) => (
              <Grid item key={index}>
                {component}
              </Grid>
            ))}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid className={styles.input}>
                <CssTextField
                  id="outlined-basic"
                  label="Runs"
                  defaultValue={0}
                  variant="outlined"
                  inputRef={runsRef}
                  type="number"
                  focusColor="black"
                />
                <ColorButton
                  variant="text"
                  onClick={() => {
                    getScoreExtra(
                      parseInt(runsRef.current.value),
                      selectedExtra
                    );
                  }}
                >
                  Submit
                </ColorButton>
              </Grid>
            </Box>
          </Modal>
          {scoreArray.map((score) => {
            return (
              <ColorButton
                variant="outlined"
                key={score}
                onClick={() => getScore(score)}
              >
                {score}
              </ColorButton>
            );
          })}
          {extras.map((extra) => {
            return (
              <ColorButton
                variant="outlined"
                key={extra}
                onClick={() => handleOpen(extra)}
              >
                {extra}
              </ColorButton>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
