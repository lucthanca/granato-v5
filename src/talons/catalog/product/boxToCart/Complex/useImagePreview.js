import { useCallback, useMemo, useState, useRef, useImperativeHandle } from 'react';

export const useImagePreview = (props) => {
  const { baseImages, ref } = props;
  const [imageLoading, setImageLoading] = useState(false);
  const [images, setImages] = useState([]);

  useImperativeHandle(ref, () => ({
    setDisplayImages: (i) => {
      if (i.length === 0 && images.length === 0) return;
      setImages(i);
    },
  }));

  const finalImages = useMemo(() => {
    if (!images?.length) {
      return baseImages;
    }

    return images;
  }, [baseImages, images]);

  const imageBase = useMemo(() => {
    const foundBaseImage = finalImages?.find((i) => i?.options?.is_base === true);
    if (!foundBaseImage) {
      return finalImages?.[0];
    }

    return foundBaseImage;
  }, [finalImages]);

  const handleImageLoadingDone = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageStartLoading = useCallback(() => {
    setImageLoading(true);
  }, []);
  return {
    imageBase,
    finalImages,
    imageLoading,
    handleImageLoadingDone,
    handleImageStartLoading,
  };
};
