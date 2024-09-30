import styles from "./Score.module.css";
export default function Score({ selectedScore, selectedExtra }) {
  return (
    <div className={styles.scoreNumber}>
      <p>
        {selectedScore}
        {selectedExtra}
      </p>
    </div>
  );
}
