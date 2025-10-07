import { useState, useEffect } from "react";

export default function FunTextEffect({ text, style, ...props }) {
  const splitedText = Array.from(text);
  const textLength = Array.from(text).length;
  const [activeLetter, setActiveLetter] = useState(
    Math.floor(Math.random() * (textLength - -3) + -3)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (textLength - -3) + -3);
      setActiveLetter(randomIndex);
    }, 500);

    return () => clearInterval(timer);
  }, [textLength]);
  return (
    <h1
      {...props}
      style={{
        fontWeight: 200,
        ...style,
      }}
    >
      {splitedText.map((item, index) => {
        const distance = Math.abs(index - activeLetter);
        let fontWeight;
        switch (distance) {
          case 0:
            fontWeight = 800;
            break;
          case 1:
            fontWeight = 600;
            break;
          case 2:
            fontWeight = 400;
            break;
          default:
            fontWeight = 200;
            break;
        }
        return (
          <span
            key={index}
            style={{
              fontWeight: fontWeight,
              transitionProperty: "all",
              transitionDuration: "500ms",
              display: "inline-block",
            }}
          >
            {item}
          </span>
        );
      })}
    </h1>
  );
}
