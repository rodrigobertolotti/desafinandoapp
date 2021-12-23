import React, { useEffect, useState } from "react";
import star from "../assets/star.png";
import selected_star from "../assets/selected_star.png";
import share from "../assets/share.png";
import money from "../assets/money.png";
import lupa from "../assets/lupa.png";
import "../styles.css";

require("dotenv").config();

function Card({
  id,
  show,
  onOpenImage,
  onAddFavorite,
  isFavorite,
  isModalOpen,
}) {
  const API_URL = process.env.REACT_APP_API_URL;
  const SERVER = process.env.REACT_APP_SERVER;

  const imageUrl = SERVER + show?.picture?.data?.attributes?.url;
  const todayDate = new Date();
  const date = show.date.split("T");
  const processedDate = date[0].split("-");
  const day = processedDate[2];
  const month = processedDate[1];
  const year = processedDate[0];
  const processedTime = date[1].split(":");
  const hours = processedTime[0];
  const minutes = processedTime[1];
  //today date esta andando como el cu
  const dayToShow =
    todayDate.getDay() === day &&
    todayDate.getMonth() === month &&
    todayDate.getFullYear() === year
      ? "HOY"
      : todayDate.getDay() + 1 === day &&
        todayDate.getMonth() === month &&
        todayDate.getFullYear() === year
      ? "MAÑANA"
      : day + "/" + month;
  const styles = {
    card: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "300px",
      height: "500px",
      maxWidth: "370px",
      borderRadius: 10,
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      height: "220px",
      alignItems: "center",
      overflow: "hidden",
      justifyContent: "center",
      display: "flex",
    },
    image: {
      position: "absolute",
      width: "100%",
    },
    imageShortHeight: {
      position: "absolute",
      height: "100%",
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
      paddingTop: 5,
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
      bottom: 5,
      right: 10,
      width: "30px",
      cursor: "pointer",
    },
    lupa: {
      position: "absolute",
      bottom: 7,
      right: 85,
      width: "25px",
      cursor: "pointer",
    },
    share: {
      position: "absolute",
      bottom: 2,
      right: 45,
      width: "35px",
      cursor: "pointer",
    },
    grow: {
      scale: 1.1,
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
      padding: 10,
    },
    sectionText: {
      fontSize: 20,
      padding: 0,
      margin: 0,
    },
    moneyContainer: {
      display: "flex",
    },
    money: {
      width: "30px",
      height: "auto",
      marginRight: 8,
    },
  };
  const shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  useEffect(() => {
    var img = new Image();
    img.onload = function () {
      setImageHeight(this.height);
      setImageWidth(this.width);
    };
    img.src = imageUrl;
  }, [imageUrl]);
  console.log(imageHeight);
  console.log(imageWidth);
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <object
          style={
            imageHeight > imageWidth - 100
              ? styles.image
              : styles.imageShortHeight
          }
          data={imageUrl}
        >
          <img
            style={
              imageHeight > imageWidth ? styles.image : styles.imageShortHeight
            }
            src={
              "https://images.squarespace-cdn.com/content/v1/5477b6e0e4b07ec2525f51b0/1496087068286-NA1O8BY0WYV18RS8VQ9D/RECITAL-CUERDAS-OSNE2.jpg?format=1500w"
            }
            alt=""
          />
        </object>
        <img
          src={isFavorite ? selected_star : star}
          style={styles.star}
          className="scaleOnHover"
          onClick={() => onAddFavorite(id)}
          alt=""
        ></img>
        <img
          src={share}
          style={styles.share}
          className="scaleOnHover"
          onClick={() => navigator.share(shareData)}
          alt=""
        ></img>
        <img
          src={lupa}
          style={styles.lupa}
          className="scaleOnHover"
          onClick={onOpenImage}
          alt=""
        ></img>
      </div>
      <div style={styles.infoContainer}>
        <div style={{ paddingRight: 15 }}>
          <p style={styles.title}>{show.name}</p>
        </div>
        <p style={styles.subtitle}>
          {dayToShow} - {hours + ":" + minutes + "hs"}
        </p>
        <p style={styles.description}>{show.description}</p>
        <div style={styles.moneyContainer}>
          <img src={money} style={styles.money} alt=""></img>
          <p style={styles.subtitle}>
            {show.free ? "GRATIS" : show.price + "$"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
