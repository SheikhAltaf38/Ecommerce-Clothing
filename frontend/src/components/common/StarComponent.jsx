import React, { useState } from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarComponent = ({ rating, handleRatingChange ,userRated }) => {
  // const [userRated, setUserRated] = useState(false);
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      onClick={() => {
        // if ( !userRated && handleRatingChange) {
        if (  handleRatingChange) {
          handleRatingChange(star);
          // setUserRated(true);
        }
      }}
      variant="outline"
      size="icon"
      className={`p-2 rounded-full transition-colors  ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      ></StarIcon>
    </Button>
  ));
};

export default StarComponent;
