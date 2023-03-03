import React, { forwardRef, memo } from 'react';
import { Text, View } from 'react-native';
import { useGPAddToCart } from '../../../../../talons/product/boxToCart/Complex/type/useGPAddToCart';
import mergeStyles from '../../../../../utils/mergeStyles';
import defaultStyles from './groupedProduct.style';
import GroupedProductItem from './groupedProductItem';
import { object } from 'prop-types';
import t from '../../../../../utils/identify';

const GroupedProduct = (props, ref) => {
  const { ...rest } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useGPAddToCart(rest, ref);
  const { groupedItems, itemRefs } = talonProps;
  console.log('RENDER: grouped complex box to cart');
  return (
    <>
      {groupedItems && (
        <>
          <View style={styles.headerRoot}>
            <Text style={styles.productNameLabel}>{t.__('Product Name')}</Text>
            <Text style={styles.qtyLabel}>{t.__('Qty')}</Text>
          </View>
          {groupedItems.map((item, index) => (
            <GroupedProductItem ref={el => (itemRefs.current[index] = el)} key={item?.product?.uid || index} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default memo(forwardRef(GroupedProduct));

GroupedProduct.propTypes = {
  product: object,
};
