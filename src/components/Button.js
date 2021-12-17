import React from "react";

export default function Button({ text, onClick, asset }) {
  const styles = {
    button: {
      flex: 1,
      cursor: "pointer",
    },
    locationIcon: {
      height: "30px",
    },
  };
  return (
    <>
      <button style={styles.button} onClick={onClick}>
        <img alt="" style={styles.locationIcon} src={asset}></img>
      </button>
    </>
  );
}
