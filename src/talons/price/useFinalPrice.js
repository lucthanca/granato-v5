import { useMemo, useState, useCallback, useImperativeHandle } from 'react';

const TAX_DISPLAY_BOTH = 3;

export const useFinalPrice = (props) => {
  const { config = {}, priceTiers: propPriceTiers = [], finalPrice: initFinalPrice, minimumPrice: propMinimumPrice, ref } = props;
  const [customPrice, setCustomPrice] = useState(null);
  const [qty, setQty] = useState(1);
  const [stateFinalPrice, setStateFinalPrice] = useState();
  const [statePriceTiers, setStatePriceTiers] = useState([]);
  const [stateMinimumPrice, setStateMinimumPrice] = useState();

  useImperativeHandle(
    ref,
    () => ({
      setQty(quantity) {
        if (isNaN(quantity)) {
          setQty(1);
          return;
        }
        setQty(quantity);
      },
      setPrice: (price) => {
        const { priceTiers: pt = [], finalPrice: fp, minimumPrice: mp } = price;
        if (stateFinalPrice === fp && pt?.length === statePriceTiers?.length && mp === stateMinimumPrice) {
          return;
        }
        setStateFinalPrice(fp);
        setStatePriceTiers(pt);
        setStateMinimumPrice(mp);
      },
    }),
    [stateFinalPrice, statePriceTiers, stateMinimumPrice]
  );

  /*
   * Final minimumPrice: use prop minimumPrice or use ref set minimumPrice
   */
  const minimumPrice = useMemo(() => {
    if (stateFinalPrice?.final_price) {
      return stateMinimumPrice;
    }
    return propMinimumPrice;
  }, [stateMinimumPrice, stateFinalPrice, propMinimumPrice]);

  // Final tier price: use prop tier price or use ref set tier price
  const priceTiers = useMemo(() => {
    const pt = statePriceTiers?.length > 0 ? statePriceTiers : propPriceTiers;
    const fp = stateFinalPrice?.final_price ? stateFinalPrice : initFinalPrice;
    return pt.filter((tierP) => tierP.final_price.value < fp.final_price.value);
  }, [propPriceTiers, statePriceTiers, stateFinalPrice, initFinalPrice]);

  // Get final price by tier price
  const calculateFinalPriceByQty = useMemo(() => {
    // sort by qty desc
    const reverseList = [...priceTiers].sort((a, b) => b.quantity - a.quantity);
    const matchingTierPrice = reverseList.find((tier) => {
      return qty >= tier.quantity;
    });
    if (matchingTierPrice) {
      return {
        final_price: matchingTierPrice.final_price_incl_tax,
        final_price_excl_tax: matchingTierPrice.final_price,
      };
    }
  }, [qty, priceTiers]);

  const { taxDisplayType } = config;

  // Final price for all other price calculation
  const finalPrice = useMemo(() => {
    // Deprecated: should not use custom price 😢
    if (customPrice !== null) {
      return customPrice;
    }

    // Handle price tiers
    if (calculateFinalPriceByQty) {
      return calculateFinalPriceByQty;
    }

    // use minimum price if have
    if (minimumPrice?.final_price) {
      return minimumPrice;
    }

    // use ref set price for custom price
    if (stateFinalPrice?.final_price) {
      return stateFinalPrice;
    }
    // finally return prop price so
    return initFinalPrice;
  }, [stateFinalPrice, initFinalPrice, customPrice, minimumPrice, calculateFinalPriceByQty]);

  const regularPrice = useMemo(() => {
    if (finalPrice?.final_price?.value < finalPrice?.regular_price?.value) {
      return finalPrice?.regular_price;
    }
  }, [finalPrice]);

  const finalExclTaxPrice = useMemo(() => {
    if (taxDisplayType === TAX_DISPLAY_BOTH && finalPrice?.final_price_excl_tax) {
      return finalPrice?.final_price_excl_tax;
    }
    return undefined;
  }, [taxDisplayType, finalPrice]);

  const handSetCustomPrice = useCallback((value) => {
    if (value === undefined) {
      value = null;
    }
    setCustomPrice(value);
  }, []);

  return {
    finalPrice: finalPrice?.final_price,
    finalExclTaxPrice,
    regularPrice,
    handSetCustomPrice,
    minimumPrice,
    hasCustomPrice: customPrice !== null,
  };
};
