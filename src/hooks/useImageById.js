import axios from "axios";
import { useState, useEffect } from "react";

export const useImageById = (pid) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [imageData, setImageData] = useState(false);

  useEffect(() => {
    if (!pid) return;
    try {
      const getImageById = async (pid) => {
        setImageIsLoading(true);
        const res = await axios.get(`/api/${pid}`);
        if (res) {
          const imageData = res.data;
          setImageData(imageData);
        }
      };
      getImageById(pid);
    } catch (err) {
      console.error("页面加载失败：", err);
    } finally {
      setImageIsLoading(false);
    }
  }, [pid]);

  return {
    imageIsLoading,
    imageData,
  };
};
