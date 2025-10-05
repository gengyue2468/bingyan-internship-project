import { useState } from "react";
import { SearchIcon, XIcon } from "./Icons";
import Flex from "../layouts/Flex";
import { useDeviceType } from "@/hooks/useDeviceType";

function PlusButton({ img, name, ...props }) {
  return (
    <button
      type="button"
      {...props}
      style={{ width: "100%", background: "var(--accent)" }}
      className="ghostButton"
    >
      <Flex direction="row" gap={4}>
        <div
          style={{
            background: "var(--border)",
            width: "4rem",
            height: "4rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={img}
            style={{ height: "3rem", width: "3rem", borderRadius: "0.5rem" }}
          />
        </div>
        <Flex
          direction="column"
          justify="start"
          disabledCenter={true}
          gap={1}
          style={{ textAlign: "left" }}
        >
          <h3>{name}</h3>
        </Flex>
      </Flex>
    </button>
  );
}

export default function Searchbar() {
  const [isPressed, setIsPressed] = useState(false);

  const hotItems = [
    {
      name: "电脑桌布",
      img: "/static/cate/d69b7bb188b5e49ef7cf4c4a9a6694ae.jpg",
    },
    {
      name: "Q版人物",
      img: "/static/cate/d69b7bb188b5e49ef7cf4c4a9a6694ae.jpg",
    },
    {
      name: "可爱头像",
      img: "/static/cate/a7dcf445088dd9c263802c40a3a4bb8c.jpg",
    },
    {
      name: "背景图片",
      img: "/static/cate/12214eb19108f8649e11bd0bdda8e2fb.jpg",
    },
    {
      name: "头贴",
      img: "/static/cate/4cc0c2fb49bf09420591bbf77ff149fa.jpg",
    },
    {
      name: "姿势",
      img: "/static/cate/1c0d813d55420da0e639b9826a874430.jpg",
    },
    {
      name: "男生 头像",
      img: "/static/cate/ef3952e0dc03f979bd1dc4c9e65fa210.jpg",
    },
    {
      name: "背景",
      img: "/static/cate/51d25b8b2581151eb3bc2133781a421c.jpg",
    },
  ];

  const isMobile = useDeviceType();
  return (
    <div
      style={{
        position: "relative",
        paddingInline: "0.5rem",
        flex: 1,
        zIndex: isPressed ? 27 : 2,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: isPressed ? "0rem" : "1.25rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: isPressed ? 0 : "1.5rem",
          height: isPressed ? 0 : "1.5rem",
          opacity: isPressed ? 0 : 1,
          transitionProperty: "all",
          transitionDuration: "250ms",
          overflow: "hidden",
        }}
      >
        <SearchIcon />
      </div>

      <input
        type="text"
        onMouseDown={() => setIsPressed(true)}
        placeholder="搜索..."
        style={{
          width: isMobile && isPressed ? "115%" : "100%",
          height: "100%",
          paddingInline: isPressed ? "0.75rem" : "3.25rem",
          zIndex: 15,
        }}
        className="searchBar"
      />

      {isMobile && isPressed && (
        <button
          onClick={() => setIsPressed(false)}
          type="button"
          className="normalButton iconButton ghostButton"
          style={{
            position: "absolute",
            top: "0.3rem",
            right: "-5rem",
            padding: "0.25rem",
            zIndex: 99,
            background: isPressed ? "var(--accent)" : "transparent",
          }}
        >
          <XIcon style={{ width: "1.5rem" }} />
        </button>
      )}
      {isPressed && (
        <div
          onClick={(e) => {
            setIsPressed(false);
            e.stopPropagation();
          }}
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#000000",
            opacity: 0.8,
            zIndex: -1,
          }}
        />
      )}

      {isPressed && (
        <div
          style={{
            position: "absolute",
            width: isMobile ? "100vw" : "100%",
            height: "fit-content",
            maxHeight: "100vh",
            paddingInline: "2rem",
            paddingBlock: "2rem",
            translate: isMobile && "-1rem 0",
            top: "-1rem",
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--background)",
            opacity: 1,
            zIndex: -1,
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
            borderBottom: "1px solid",
            borderInline: "1px solid",
            borderColor: "var(--border)",
            overflowY: isMobile ? "scroll" : "auto",
            paddingBottom: isMobile ? "6rem" : "1rem",
          }}
        >
          <h3 style={{ marginTop: "4rem" }}>Pinterest 上的热门</h3>

          <div
            style={{
              marginTop: "1rem",
            }}
            className="hot-items"
          >
            {hotItems.map((item, index) => (
              <PlusButton key={index} name={item.name} img={item.img} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
