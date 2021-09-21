import { useEffect, useState } from "react";
import axios from "axios";
import loadingImage from "../assets/loading.gif";
import Card from "../components/Card";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  // const [likes, setLikes] = useState(localStorage.getItem("likes") || []);

  useEffect(() => {
    setLoading(true);

    // Get likes from local storate
    const likes = JSON.parse(localStorage.getItem("likes")) || [];

    // Get initial photos from NASA API
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=wuVMZoBRKDtFRhsXqRq3sUX0pmANwmZfKlMfEQbB&start_date=2021-09-11&thumbs=true"
      )
      .then((res) => {
        const content = res.data
          .reverse()
          .map((item) =>
            likes.includes(item.date)
              ? { ...item, liked: true }
              : { ...item, liked: false }
          );
        setPhotos(content);
        setLoading(false);
        console.log(content);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  function like(data) {
    const updatedPhotos = photos.map((photo) =>
      photo.date === data ? { ...photo, liked: true } : photo
    );
    setPhotos(updatedPhotos);
    setLocalStorage(updatedPhotos);
  }

  function unlike(data) {
    const updatedPhotos = photos.map((photo) =>
      photo.date === data ? { ...photo, liked: false } : photo
    );
    setPhotos(updatedPhotos);
    setLocalStorage(updatedPhotos);
  }

  function setLocalStorage(photos) {
    const likes = photos
      .filter((photo) => photo.liked)
      .map((photo) => photo.date);
    localStorage.setItem("likes", JSON.stringify(likes));
  }

  return loading ? (
    <div className="flex justify-center items-center h-4/5">
      <img src={loadingImage} alt="Images loading" className="w-1/4 md:w-36" />
    </div>
  ) : error ? (
    <div className="flex justify-center items-center h-4/5">
      <p>An error has occured. Please refresh the page.</p>
    </div>
  ) : (
    <div className="px-4">
      {photos.map((photo, index) => {
        return <Card photo={photo} key={index} like={like} unlike={unlike} />;
      })}
    </div>
  );
}

export default Feed;
