import React, { useState } from "react";
import star from "../assets/star.png";
import selected_star from "../assets/selected_star.png";
import share from "../assets/share.png";

function Card({
  id,
  show,
  onOpenImage,
  onAddFavorite,
  isFavorite,
  isModalOpen,
}) {
  const imageUrl =
    "http://localhost:1337" + show?.picture?.data?.attributes?.url;
  const date = show.date.split("T");
  const processedDate = date[0].split("-");
  const day = processedDate[2];
  const month = processedDate[1];
  const year = processedDate[0];
  const processedTime = date[1].split(":");
  const hours = processedTime[0];
  const minutes = processedTime[1];
  const showDate = new Date(year, month - 1, day);
  const todayDate = new Date();
  const hideShow = todayDate > showDate;
  const styles = {
    card: {
      display: hideShow ? "none" : "flex",
      flexDirection: hideShow ? "row" : "column",
      position: "relative",
      width: "100%",
      height: "500px",
      maxWidth: "400px",
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    imageContainer: {
      position: "relative",
      overflow: "hidden",
      justifyContent: "center",
      alignSelf: "center",
      minWidth: "300px",
    },
    image: {
      width: "400px",
      height: "240px",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    infoContainer: {
      padding: "20px",
      position: "relative",
      flex: 1,
    },
    subtitle: {
      fontWeight: "500",
      padding: 0,
      margin: 0,
    },
    title: {
      fontWeight: "700",
      fontSize: 26,
      margin: 0,
      padding: 0,
    },
    showFlyerText: {
      position: "absolute",
      zIndex: isModalOpen ? 0 : 3,
      color: "white",
      fontWeight: 600,
      alignSelf: "center",
    },
    hoverEffect: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
      opacity: 0.5,
      zIndex: isModalOpen ? 0 : 1,
      cursor: "pointer",
    },
    description: {
      fontSize: "13px",
    },
    star: {
      position: "absolute",
      top: 10,
      right: 10,
      width: "30px",
      cursor: "pointer",
    },
    share: {
      position: "absolute",
      top: 9,
      right: 45,
      width: "35px",
      cursor: "pointer",
    },
    actionsContainer: {
      bottom: 0,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 20,
      marginRight: 10,
      marginLeft: 10,
    },
    sectionItem: {
      display: "flex",
      flex: 1,
      margin: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.2)",
      padding: 10,
    },
    sectionText: {
      fontSize: 20,
      padding: 0,
      margin: 0,
    },
  };
  const [isImageHovered, setIsImageHovered] = useState(false);
  const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };
  return (
    <div style={styles.card}>
      <div
        style={styles.imageContainer}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
        onClick={onOpenImage}
      >
        {isImageHovered && (
          <div style={styles.hoverEffect}>
            <div style={styles.showFlyerText}>
              <p>VER IMAGEN</p>
            </div>
          </div>
        )}
        <object style={styles.image} data={imageUrl}>
          <img
            style={styles.image}
            src={
              "https://images.squarespace-cdn.com/content/v1/5477b6e0e4b07ec2525f51b0/1496087068286-NA1O8BY0WYV18RS8VQ9D/RECITAL-CUERDAS-OSNE2.jpg?format=1500w"
            }
            alt=""
          />
        </object>
      </div>
      <div style={styles.infoContainer}>
        <img
          src={isFavorite ? selected_star : star}
          style={styles.star}
          onClick={() => onAddFavorite(id)}
          alt=""
        ></img>
        <img
          src={share}
          style={styles.share}
          onClick={() => navigator.share(shareData)}
          alt=""
        ></img>
        <p style={styles.title}>{show.name + " " + id}</p>

        <p style={styles.subtitle}>{day + "/" + month}</p>
        <p style={styles.description}>{show.description}</p>
      </div>
      <div style={styles.row}>
        <div style={styles.sectionItem}>
          <p style={styles.sectionText}>{hours + ":" + minutes + "hs"}</p>
        </div>
        <div style={styles.sectionItem}>
          <p style={styles.sectionText}>
            {show.free ? "GRATIS" : show.price + "$"}
          </p>
        </div>
        <div style={styles.sectionItem}>
          <p style={styles.sectionText}>{show.price}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
