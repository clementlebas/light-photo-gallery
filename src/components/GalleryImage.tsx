import React, { useEffect, useState } from "react";

import { Image } from "../types";
import "../index.scss";

type Props = {
  imageName: Image["name"];
  index: number;
  galleryLenght: number;
  isDialogOpen: boolean;
  setIsDialogOpen: (a: boolean) => void;
  setCurrentImage: (a: string) => void;
};

const GalleryImage: React.FC<Props> = ({
  imageName,
  index,
  galleryLenght,
  isDialogOpen,
  setIsDialogOpen,
  setCurrentImage,
}) => {
  const [isLoad, setIsload] = useState(false);
  const imageSrc = require(`../images/${imageName}`);

  const image = new Image();
  image.addEventListener("load", () => {
    const time = index === 0 ? 500 : 0;
    setTimeout(() => {
      setIsload(true);
    }, time);
  });
  image.src = imageSrc;
  image.className = "gallery__img";

  const reveal = () => {
    var reveals = document.querySelectorAll(".gallery__bloc");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = -20;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", reveal);
    reveal();
    if (isLoad) {
      const imageExist = document
        .getElementById(`${imageName + index}`)
        .hasChildNodes();

      if (imageExist) return;
      document.getElementById(`${imageName + index}`).appendChild(image);
    }
  }, [isLoad, isDialogOpen]);

  return (
    <div
      id={`${imageName + index}`}
      className={`gallery__bloc ${
        index === 0 || (index === 10 && galleryLenght > 13) || index === 14
          ? "large"
          : ""
      } ${!isLoad ? "gallery__bloc--skeleton" : ""} ${
        isDialogOpen ? "gallery__bloc--animation" : ""
      } `}
      key={index}
      onClick={() => {
        setIsDialogOpen(true);
        setCurrentImage(imageName);
      }}
    />
  );
};

export default GalleryImage;
