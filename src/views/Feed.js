import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import loadingImage from "../assets/loading.gif";
import Card from "../components/Card";

function Feed() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [lastDate, setLastDate] = useState(new Date());
  const [pageNumber, setPageNumber] = useState(1);
  const [canFetchMore, setCanFetchMore] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const observer = useRef();
  const lastElementRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && canFetchMore) {
          setPageNumber((prevNumber) => prevNumber + 1);
          fetchPhotos();
        }
      });
      if (el) observer.current.observe(el);
    },
    // eslint-disable-next-line
    [loading, canFetchMore]
  );

  function fetchPhotos() {
    setLoading(true);
    const likes = JSON.parse(localStorage.getItem("likes")) || [];
    const { startDate, endDate } = calculateDateRange(lastDate);
    const startDateConverted = startDate.toLocaleDateString("en-CA");
    const endDateConverted = endDate.toLocaleDateString("en-CA");

    const query = `https://api.nasa.gov/planetary/apod?api_key=wuVMZoBRKDtFRhsXqRq3sUX0pmANwmZfKlMfEQbB&start_date=${startDateConverted}&end_date=${endDateConverted}&thumbs=true`;

    axios
      .get(query)
      .then((res) => {
        const content = res.data
          .reverse()
          .map((item) =>
            likes.includes(item.date)
              ? { ...item, liked: true }
              : { ...item, liked: false }
          );
        setPhotos([...photos, ...content]);
        setLastDate(startDate);
        if (pageNumber === 10) {
          setCanFetchMore(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }

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

  function calculateDateRange(date) {
    let endDate = new Date(date);
    let startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 9);
    const today = new Date();
    if (endDate.toDateString() === today.toDateString()) {
      return { startDate, endDate };
    }
    endDate.setDate(endDate.getDate() - 1);
    return { startDate, endDate };
  }

  return (
    <>
      <div className="px-4">
        {photos.map((photo, index) => {
          if (photos.length === index + 1) {
            return (
              <Card
                photo={photo}
                key={photo.date}
                like={like}
                unlike={unlike}
                inputRef={lastElementRef}
              />
            );
          } else {
            return (
              <Card
                photo={photo}
                key={photo.date}
                like={like}
                unlike={unlike}
              />
            );
          }
        })}
      </div>

      {loading && (
        <div className="flex justify-center items-center h-4/5">
          <img
            src={loadingImage}
            alt="Images loading"
            className="w-1/4 md:w-36"
          />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-4/5">
          <p>An error has occured. Please refresh the page.</p>
        </div>
      )}
    </>
  );
}

export default Feed;
