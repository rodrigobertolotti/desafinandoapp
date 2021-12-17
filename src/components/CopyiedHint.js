import React from "react";

export default function CopyiedHint({ text }) {
  const styles = {
    copyiedContainer: {
      display: "flex",
      backgroundColor: "rgba(0,0,0,0.1)",
      alignItems: "center",
      justifyContent: "center",
      width: "300px",
      borderRadius: 25,
      border: "2px solid black",
    },
  };
  return (
    <div style={styles.copyiedContainer}>
      <p>{text}</p>
    </div>
  );
}
