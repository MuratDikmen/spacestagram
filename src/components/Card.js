import PropTypes from "prop-types";
import { MediaCard } from "@shopify/polaris";

function Card({ photo, like, unlike, inputRef }) {
  // console.log(photo);
  return (
    <article className="mb-6" ref={inputRef}>
      <MediaCard
        title={
          photo.title +
          " - " +
          new Date(photo.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }
        description={photo.explanation}
        size="small"
        primaryAction={{
          content: photo.liked ? "Unlike" : "Like",
          onAction: () => {
            photo.liked ? unlike(photo.date) : like(photo.date);
          },
          accessibilityLabel: photo.liked ? "Unlike Photo" : "Like Photo",
        }}
      >
        {photo.media_type === "image" ? (
          <img
            src={photo.url}
            alt={photo.title}
            width="100%"
            height="100%"
            className="self-center"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <iframe
            title={photo.title}
            type="text/html"
            src={photo.url}
            frameBorder="0"
            allowFullScreen
            className="w-screen"
          ></iframe>
        )}
      </MediaCard>
    </article>
  );
}

Card.propTypes = {
  photo: PropTypes.object,
};

export default Card;
