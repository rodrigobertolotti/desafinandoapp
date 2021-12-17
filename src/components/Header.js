import React from "react";

export function Header() {
  const styles = {
    header: {
      display: "flex",
      alignItems: "flex-start",
      padding: 10,
      justifyContent: "center",
      flexDirection: "column",
      flex: 1,
      borderBottom: "4px solid #A04C59",
    },
    title: {
      fontSize: 30,
      padding: 0,
      margin: 0,
    },
    titleSmall: {
      fontSize: 22,
      padding: 0,
      margin: 0,
    },
    subtitle: {},
  };
  return (
    <div style={styles.header}>
      <p style={styles.titleSmall}>CALENDARIO DE</p>
      <p style={styles.title}>MUSICA EN VIVO</p>
    </div>
  );
}
