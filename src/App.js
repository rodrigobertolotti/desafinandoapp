import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import CopyiedHint from "./components/CopyiedHint";
import { SearchBar } from "./components/SearchBar";
import { getShows } from "./services/showService";
import { Header } from "./components/Header";
import Modal from "react-modal";
import { MIN_WINDOW_WIDTH } from "./constants";
require("dotenv").config();

const window_size = window.innerWidth;
const API_URL = process.env.REACT_APP_API_URL;
const SERVER_URL = process.env.REACT_APP_SERVER;

function App() {
  const styles = {
    app: {
      backgroundColor: "#040303",
    },
    card: {
      width: 200,
      height: 200,
    },
    carousel: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      width: "100%",
      position: "absolute",
      userSelect: "none ",
      overflowX: window_size > MIN_WINDOW_WIDTH ? "hidden" : "scroll", //tiene que ser scroll para mobile
      backgroundColor: "black",
    },
    cardContainer: {
      padding: "10px",
    },
    copyiedHintContainer: {
      position: "absolute",
      bottom: 10,
      right: 0,
      left: "40%",
      marginLeft: "auto",
      marginRight: "auto",
      zIndex: 4,
    },
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    image: {
      width: 500,
      height: "auto",
    },
  };

  const [isCopyPressed, setIsCopyPressed] = useState(false);
  const [completeShows, setCompleteShows] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentShowImage, setCurrentShowImage] = useState();
  const [shows, setShows] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [favorites, setFavorites] = useState();

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favoritas")));
  }, []);

  useEffect(() => {
    try {
      getShows().then((res, err) => {
        if (err) {
          setErrorMessage(
            "No pudimos cargar los recitales :(. Intenta de nuevo mas tarde"
          );
        } else {
          const shows = showsFilteringDate(res.data);
          setShows(shows);
          setCompleteShows(shows);
        }
      });
    } catch (e) {
      setErrorMessage(
        "No pudimos cargar los recitales :(. Intenta de nuevo mas tarde"
      );
    }
  }, []);

  useEffect(() => {
    const slider = document.getElementById("draggable");
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
      mouseDown = false;
    };

    slider.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
  }, []);

  const handleCopyText = () => {
    setIsCopyPressed(true);
    navigator.clipboard.writeText("Texto copiado");
    setTimeout(() => {
      setIsCopyPressed(false);
    }, 2000);
  };

  const handleChangeSearchByName = (text) => {
    if (text.length > 2) {
      setShows(
        completeShows.filter((show) =>
          show.name.toUpperCase().includes(text.toUpperCase())
        )
      );
    } else {
      setShows(completeShows);
    }
  };

  const handleChangeShowFree = (e) => {
    const checked = e.target.checked;
    if (checked && shows) {
      setShows(completeShows.filter((show) => show.free === checked));
    } else {
      setShows(completeShows);
    }
  };

  const handleChangeShowFavorites = (e) => {
    const checked = e.target.checked;
    if (checked && shows) {
      let newShows = [];
      shows.forEach((show) => {
        const showInFav = favorites[show.id];
        if (showInFav) {
          newShows.push(show);
        }
      });
      setShows(newShows);
    } else {
      setShows(completeShows);
    }
  };

  const handleClickShowImage = (image) => {
    setShowModal(true);
    setCurrentShowImage(image);
  };

  const handleAddFavorite = (id) => {
    let favorites = localStorage.getItem("favoritas");
    let jsonFavorites;
    if (!favorites) {
      jsonFavorites = {};
      jsonFavorites[id] = id;
    } else {
      let parsedFav = JSON.parse(favorites);
      const existsInFav = parsedFav[id];
      if (existsInFav) {
        delete parsedFav[id];
        jsonFavorites = parsedFav;
      } else {
        jsonFavorites = parsedFav;
        jsonFavorites[id] = id;
      }
    }
    localStorage.setItem("favoritas", JSON.stringify(jsonFavorites));
    setFavorites(jsonFavorites);
  };

  const orderedShows = (shows) => {
    function sortByDate(show1, show2) {
      const date1 = show1.date.split("T");
      const processedDate1 = date1[0].split("-");
      const day1 = processedDate1[2];
      const month1 = processedDate1[1];
      const year1 = processedDate1[0];
      const date2 = show2.date.split("T");
      const processedDate2 = date2[0].split("-");
      const day2 = processedDate2[2];
      const month2 = processedDate2[1];
      const year2 = processedDate2[0];
      return (
        new Date(year1, month1 - 1, day1).getTime() -
        new Date(year2, month2 - 1, day2).getTime()
      );
    }
    return shows.sort(sortByDate);
  };

  const showsFilteringDate = (shows) => {
    let filteredShows = [];
    const todayDate = new Date();
    shows.forEach((s) => {
      let show = s.attributes;
      const id = s.id;
      show.id = id;
      const date = show.date.split("T");
      const processedDate = date[0].split("-");
      const day = processedDate[2];
      const month = processedDate[1];
      const year = processedDate[0];
      const showDate = new Date(year, month - 1, day);
      const hideShow = todayDate > showDate;
      if (!hideShow) {
        filteredShows.push(show);
      }
    });
    return filteredShows;
  };

  return (
    <div style={styles.app}>
      <Header></Header>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={modalStyles}
        contentLabel="Example Modal"
      >
        <img src={currentShowImage} style={modalStyles.image} alt=""></img>
      </Modal>
      <SearchBar
        onChangeSearchByName={(text) => handleChangeSearchByName(text)}
        onChangeFree={handleChangeShowFree}
        onChangeFavorites={handleChangeShowFavorites}
      ></SearchBar>{" "}
      {isCopyPressed && (
        <div style={styles.copyiedHintContainer}>
          <CopyiedHint
            text={
              isCopyPressed
                ? "Texto copiado a portapapeles!"
                : "Guardado en favoritos!"
            }
          ></CopyiedHint>
        </div>
      )}
      {errorMessage.length > 0 ? (
        <p>{errorMessage} </p>
      ) : (
        <div style={styles.carousel} id="draggable">
          {shows &&
            orderedShows(shows).map((show) => {
              return (
                <div key={show.id} style={styles.cardContainer}>
                  <Card
                    id={show.id}
                    image={
                      "https://images.squarespace-cdn.com/content/v1/5477b6e0e4b07ec2525f51b0/1496087068286-NA1O8BY0WYV18RS8VQ9D/RECITAL-CUERDAS-OSNE2.jpg?format=1500w"
                    }
                    onCopyText={handleCopyText}
                    onOpenImage={() =>
                      handleClickShowImage(
                        SERVER_URL + show?.picture?.data?.attributes?.url
                      )
                    }
                    show={show}
                    onAddFavorite={handleAddFavorite}
                    isFavorite={favorites && favorites[show.id]}
                    isModalOpen={showModal}
                  ></Card>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
