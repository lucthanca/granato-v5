import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
export const useProductCart = props => {
  const { product } = props;
  const navigation = useNavigation();
  const minimumPrice = useMemo(() => {
    const minPrice = product?.price_range?.minimum_price?.final_price?.value;
    const maxPrice = product?.price_range?.maximum_price?.final_price?.value;
    if (minPrice < maxPrice) {
      return product?.price_range?.minimum_price;
    }
    return undefined;
  }, [product]);
  const finalPrice = useMemo(() => {
    if (minimumPrice?.final_price) {
      return minimumPrice;
    }
    return product?.price_range?.minimum_price;
  }, [product, minimumPrice]);

  const handlePressProduct = useCallback(() => {
    navigation.push('ProductFullDetail', { urlKey: product?.url_key || '404-not-found' });
  }, [navigation, product?.url_key]);
  return {
    finalPrice,
    minimumPrice,
    handlePressProduct,
  };
};
