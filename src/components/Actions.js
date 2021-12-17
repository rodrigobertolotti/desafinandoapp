import React from "react";
import Button from "./Button";

export default function Actions() {
  const styles = {
    actionsContainer: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      padding: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  const locationIcon =
    "https://img.favpng.com/3/23/13/map-icon-png-vector-format-png-favpng-SwT3fkihcFphPUsrfz8zy4RnC.jpg";
  const ticketIcon =
    "https://w7.pngwing.com/pngs/145/99/png-transparent-ticket-computer-icons-cinema-concert-admission-tickets-miscellaneous-angle-rectangle.png";
  return (
    <div style={styles.actionsContainer}>
      <div style={styles.row}>
        <div style={styles.buttonContainer}>
          <Button asset={locationIcon}></Button>
        </div>
        <div style={styles.buttonContainer}>
          <Button asset={ticketIcon}></Button>
        </div>
      </div>
    </div>
  );
}
