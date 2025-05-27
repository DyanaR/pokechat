import React, { useEffect, useRef, useState } from "react";
import { Image as SemanticImage } from "semantic-ui-react";
import pokeballBg from "../assets/game.png";

const Sprite = ({ sprites }) => {
  const canvasRef = useRef(null);
  const [spriteIndex, setSpriteIndex] = useState(sprites.length - 1); // current sprite index
  const [img, setImg] = useState(null);
  // load image whenever sprite index or sprites change
  useEffect(() => {
    if (!sprites.length) return;
    const newImg = new Image();
    newImg.crossOrigin = "anonymous";
    newImg.src = sprites[spriteIndex];
    newImg.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(newImg, 0, 0, canvas.width, canvas.height);
    };
    setImg(newImg);
  }, [spriteIndex, sprites]);
  // cycle to next sprite on click
  const handleNextSprite = () => {
    setSpriteIndex((prev) => (prev - 1 + sprites.length) % sprites.length);
  };
  // handle pointer down on canvas
  const handlePointerDown = (e) => {
    if (!img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const alpha = pixel[3];

    if (alpha > 0) {
      e.stopPropagation();
      handleNextSprite();
    } else {
      e.target.style.pointerEvents = "none";
      const clickEvent = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
      });
      document
        .elementFromPoint(e.clientX, e.clientY)
        ?.dispatchEvent(clickEvent);
      setTimeout(() => {
        e.target.style.pointerEvents = "auto";
      }, 0);
    }
  };
  // change cursor when hovering on visible pixel
  const handleMouseMove = (e) => {
    if (!img) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const alpha = pixel[3];
    canvas.style.cursor = alpha > 0 ? "pointer" : "default";
  };

  return (
    <>
      <SemanticImage
        src={sprites[spriteIndex]}
        onClick={handleNextSprite}
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "230px",
          height: "230px",
          objectFit: "contain",
          zIndex: 3,
          cursor: "pointer",
        }}
      />
      <canvas
        ref={canvasRef}
        width={230}
        height={230}
        style={{position: "absolute",top: "20%",left: "50%",transform: "translateX(-50%)",zIndex: 4,background: "transparent"}}
        onPointerDown={handlePointerDown}
        onMouseMove={handleMouseMove}
      />
      {/* Pokeball background */}
      <img
        src={pokeballBg}
        alt="background pokeball"
        style={{position: "absolute",width: "160px",height: "160px",bottom: "-50px",right: "-50px",opacity: 0.2,zIndex: 1}}
      />
    </>
  );
};

export { Sprite };