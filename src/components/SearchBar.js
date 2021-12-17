import React from "react";

export function SearchBar({
  onChangeSearchByName,
  onChangeFree,
  onChangeFavorites,
}) {
  const styles = {
    barContainer: {
      width: "100%",
      display: "flex",
      padding: "10px",
    },
    subtitle: {
      paddingBottom: 8,
      paddingRight: 5,
      paddingTop: 4,
      margin: 0,
    },
    section: {
      paddingRight: "30px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    sectionJump: {
      paddingRight: "30px",
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
    },
    searchInput: {
      width: "200px",
      height: "24px",
      borderRadius: 3,
      backgroundColor: "transparent",
      border: "2px solid #A04C59 ",
      color: "white",
    },
  };
  return (
    <div style={styles.barContainer}>
      <div style={styles.sectionJump}>
        <p style={styles.subtitle}>Buscar por nombre: </p>
        <input
          style={styles.searchInput}
          onChange={(e) => onChangeSearchByName(e.target.value)}
        ></input>
      </div>
      <div style={styles.section}>
        <p style={styles.subtitle}>Favoritos:</p>
        <input
          type="checkbox"
          style={styles.checkbox}
          onChange={(e) => onChangeFavorites(e)}
        ></input>
      </div>
      <div style={styles.section}>
        <p style={styles.subtitle}>Gratis</p>
        <input
          type="checkbox"
          style={styles.checkbox}
          onChange={(e) => onChangeFree(e)}
        ></input>
      </div>
    </div>
  );
}
