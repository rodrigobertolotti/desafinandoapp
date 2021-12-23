import React from "react";
import whatsapp from "../assets/whatsapp.png";

export function Footer() {
  const styles = {
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      borderTop: "4px solid #A04C59",
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
    messageContainer: {},
    whatsappLogo: {
      width: "30px",
      height: "30px",
      paddingLeft: 10,
      paddingRight: 5,
    },
    whatsappButton: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  };
  return (
    <div style={styles.footer}>
      <p style={{ padding: 0, margin: 0 }}>
        Sabes de algún recital que no esté en la lista?
      </p>
      <div style={styles.whatsappButton}>
        <img src={whatsapp} style={styles.whatsappLogo}></img>
        <p>Escribinos por Whatsapp!</p>
      </div>
    </div>
  );
}
