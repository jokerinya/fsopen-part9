import React from "react";
import { HealthCheckRating } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon color="success" />;
    case 1:
      return <FavoriteIcon color="primary" />;
    case 2:
      return <FavoriteIcon color="info" />;
    case 3:
      return <FavoriteIcon htmlColor="red" />;
    default:
      return null;
  }
};

export default HealthCheckRatingIcon;
