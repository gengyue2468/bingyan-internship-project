import { useState, useEffect } from "react";
import axios from "axios";

export const useImageData = (column) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setCounter] = useState(0);

  const initWaterfallContainer = (cols) => {
    const container = {};
    for (let i = 0; i < cols; i++) {
      container[i + 1] = [];
    }
    return container;
  };

  const addToWaterfall = (newItems, existingData = {}, cols) => {
    const updatedData = { ...existingData };

    newItems.forEach((item, index) => {
      const colIndex = (index % cols) + 1;

      if (!updatedData[colIndex]) {
        updatedData[colIndex] = [];
      }

      updatedData[colIndex].push(item);
    });

    return updatedData;
  };

  const fetchImages = async () => {
    if (isLoading || !column || column <= 0) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const { data: newItems } = await axios.get("/api/getImage", {
        params: { limit: 25 },
      });

      if (!newItems) {
        throw new Error("获取图片数据为空");
      }

      const updatedData =
        counter === 0
          ? addToWaterfall(newItems, initWaterfallContainer(column), column)
          : addToWaterfall(newItems, data, column);

      setData(updatedData);
      setCounter((prev) => prev + 1);
    } catch (err) {
      console.error("获取图片失败:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (column && column > 0) {
      setData(initWaterfallContainer(column));
      setCounter(0);
    }
  }, [column]);

  return {
    data,
    isLoading,
    isError,
    fetchMore: fetchImages,
  };
};
