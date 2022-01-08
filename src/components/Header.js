import React from "react";
import whatsapp from "../assets/whatsapp.png";

export function Header() {
  const width = window.innerWidth;
  console.log(width);
  const styles = {
    header: {
      display: "flex",
      alignItems: "space-between",
      padding: 10,
      justifyContent: "space-between",
      flexDirection: "row",
      flex: 1,
      borderBottom: "4px solid #A04C59",
    },
    title: {
      fontSize: width < 520 ? 24 : 30,
      padding: 0,
      margin: 0,
    },
    titleSmall: {
      fontSize: width < 520 ? 18 : 22,
      padding: 0,
      margin: 0,
    },
    smallText: {
      fontSize: width < 520 ? 11 : 14,
      margin: 0,
      padding: 0,
    },
    whatsappLogo: {
      width: "20px",
      height: "20px",
      paddingLeft: 10,
      paddingRight: 5,
    },
    whatsappButton: {
      display: "flex",
      alignItems: "flex-end",
      flexDirection: width < 520 ? "row" : "column",
    },
    whatsappContainer: {
      display: "flex",
    },
  };

  const sendWhatsappMessage = () => {
    const number = "+59898508303";
    const message = "Escribe aquí tu mensaje.";
    window.location.href =
      "https://api.whatsapp.com/send?phone=" + number + "&text=%20" + message;
  };
  return (
    <div style={styles.header}>
      <div>
        <p style={styles.titleSmall}>CALENDARIO DE</p>
        <p style={styles.title}>MUSICA EN VIVO</p>
      </div>
      <div style={styles.whatsappContainer}>
        <div style={styles.whatsappButton}>
          <img
            src={whatsapp}
            style={styles.whatsappLogo}
            onClick={() => sendWhatsappMessage()}
          ></img>
          <p
            className="clickeable"
            style={styles.smallText}
            onClick={() => sendWhatsappMessage()}
          >
            Falta algun toque? Escribinos por Whatsapp!
          </p>
        </div>
      </div>
    </div>
  );
}
