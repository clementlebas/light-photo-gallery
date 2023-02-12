import React, { useEffect, useMemo, useRef, useState } from "react";

import { galleries } from "../configs/data";
import "../style/dialog.scss";
import "../index.scss";

type Props = {
  isDialogOpen: boolean;
  image: string;
  // any props you want to pass to the component
};

const Dialog: React.FC<Props> = ({ isDialogOpen, image }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLargeImg, setIsLargeImg] = useState(false);

  const allImageNames = galleries.reduce(
    (acc: string[], currentCategory) =>
      acc.concat(currentCategory.images.map((img) => img.name)),
    []
  );

  const allImageDesriptions = galleries.reduce(
    (acc: string[], currentCategory) =>
      acc.concat(currentCategory.images.map((img) => img.description)),
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(
    !image ? -1 : allImageNames.indexOf(image) + 1
  );

  useMemo(() => {
    if (!image) {
      setCurrentImageIndex(-1);
    }

    setCurrentImageIndex(allImageNames.indexOf(image));
  }, [image]);

  useEffect(() => {
    if (imgRef.current?.width! && imgRef.current?.width! > 650)
      setIsLargeImg(true);
    else setIsLargeImg(false);
  }, [currentImageIndex]);

  return (
    <div
      ref={dialogRef}
      className={`dialog ${isDialogOpen ? "dialog--visible" : ""}`}
    >
      <button
        className={`dialog__button ${
          currentImageIndex === 0 ? "dialog__button--disabled" : ""
        }`}
        onClick={() =>
          setCurrentImageIndex(
            currentImageIndex === 0
              ? allImageNames.length - 1
              : currentImageIndex - 1
          )
        }
      >
        <i className="dialog__arrow dialog__left" />
      </button>
      <div
        className={`dialog__image  ${
          isDialogOpen ? "dialog__image--transition" : ""
        } ${isLargeImg ? "dialog__image--rescale" : ""}`}
      >
        <img
          src={
            allImageNames[currentImageIndex]
              ? require(`../images/${allImageNames[currentImageIndex]}`)
              : ""
          }
          ref={imgRef}
          alt="Dialog image"
        />
      </div>
      <div
        className={`dialog__description  ${
          isDialogOpen ? "dialog__description--transition" : ""
        }`}
      >
        {allImageDesriptions[currentImageIndex]}
      </div>
      <button
        className={`dialog__button ${
          currentImageIndex === allImageNames.length - 1
            ? "dialog__button--disabled"
            : ""
        }`}
        onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
      >
        <i className="dialog__arrow dialog__right" />
      </button>
    </div>
  );
};

export default Dialog;
