import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from '../redux/hooks'
import { addFav, removeFav } from "../redux/features/albumSlices";
import Tippy from "@tippyjs/react";

interface props {
  item :any
}

const FavoriteIcon :React.FC<props> = ({ item }: props) => {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    item.isFav
      ? dispatch(removeFav({ ...item }))
      : dispatch(addFav({ ...item, isFav: true }));
  };

  return (
    <Tippy
      content={`${item.isFav ? "Remove from favorite" : "Add to favorite"}`}
    >
      <span>
        <FontAwesomeIcon
          className="cursor-pointer "
          icon={faStar}
          onClick={handleClick}
          style={{ color: `${item.isFav ? "orange" : "grey"}` }}
        />
      </span>
    </Tippy>
  );
};

export default FavoriteIcon;
