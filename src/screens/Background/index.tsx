import React, { useContext, useEffect, useState } from "react";
import background1 from "../../assets/img/backgroundSelection/background.jpeg";
import background2 from "../../assets/img/backgroundSelection/wallpaper.jpeg";
import background3 from "../../assets/img/backgroundSelection/wallpaper2.jpeg";
import background4 from "../../assets/img/backgroundSelection/wallpaper3.jpeg";
import background5 from "../../assets/img/backgroundSelection/wallpaper5.jpeg";
import background6 from "../../assets/img/backgroundSelection/wallpaper6.jpeg";
import background7 from "../../assets/img/backgroundSelection/wallpaper7.jpeg";

import { PageContext } from "../../config/AppSettingsContext";
import "./style.css";

export const BackgroundScreen = () => {
  const { interfaceSettings, onSetInterfaceSettings } = useContext(PageContext);
  const [images, setImages] = useState<string[]>([
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
  ]);
  const [pictureImage, setPictureImage] = useState<string>(
    interfaceSettings.background.backgroundType === "IMAGE"
      ? interfaceSettings.background.backgroundString
      : images[0]
  );

  const onClick = (e: any) => {
    setPictureImage(e.target.id);
  };

  const onSubmit = () => {
    onSetInterfaceSettings &&
      onSetInterfaceSettings({
        ...interfaceSettings,
        background: {
          ...interfaceSettings.background,
          backgroundString: pictureImage,
          backgroundType: "IMAGE",
        },
      });
  };

  return (
    <div className="background-container">
      <div className="section-background-config grid">
        <div className="background-grid">
          {interfaceSettings.background.backgroundType === "IMAGE" && (
            <img
              src={pictureImage}
              className="picture-img"
              alt="background-img"
            />
          )}
        </div>
        <div className="background-grid list">
          {images.map((value, index) => {
            return (
              <div className="column">
                <img
                  src={value}
                  className="image-grid"
                  alt={"background-" + index}
                  id={value}
                  onClick={onClick}
                />
              </div>
            );
          })}
        </div>
        <div style={{ width: "100%" }}>
          <button
            style={{ width: "100%", height: 50, fontSize: 20 }}
            onClick={onSubmit}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
