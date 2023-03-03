import React, { memo, forwardRef } from 'react';
import { View, Text } from 'react-native';
import mergeStyles from '../../../../../utils/mergeStyles';
import defaultStyles from './groupedProductItem.style';
import { object } from 'prop-types';
import Qty from '../qty';
import FinalPrice from '../../../../../components/Price';
import { useGPItem } from '../../../../../talons/product/boxToCart/Complex/type/GroupedProduct/useGPItem';
import PriceTiersDetails from '../../../priceTiersDetails';

const GroupedProductItem = (props, ref) => {
  const { ...rest } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useGPItem(rest, ref);
  const { productPrice, priceTiers, priceConfig, product, onQtyChange, priceRef, qtyRef } = talonProps;
  return (
    <View style={styles.root}>
      <View style={styles.productInfoWrapper}>
        <View style={styles.pInfoWrapper}>
          <Text style={styles.productNameText}>{product.name}</Text>
          <FinalPrice
            ref={priceRef}
            finalPrice={productPrice}
            priceTiers={priceTiers}
            config={priceConfig}
            style={styles.priceBox}
          />
        </View>
        <Qty initQty={0} onQtyChange={onQtyChange} ref={qtyRef} />
      </View>
      <PriceTiersDetails tierPrices={priceTiers} />
    </View>
  );
};

export default memo(forwardRef(GroupedProductItem));

GroupedProductItem.propTypes = {
  item: object,
};
