import React from 'react';
import { View, Text, FlatList } from 'react-native';
import defaultStyles from './upsellProduct.style';
import { useUpsellProduct } from '../../../talons/catalog/product/UpsellProduct/useUpsellProduct';
import { string } from 'prop-types';
import mergeStyles from '../../../utils/mergeStyles';
import makeid from '../../../utils/makeId';
import ProductCart from '../RelatedProduct/productCart';
import t from '../../../utils/identify';

const UpsellProduct = props => {
  const { urlKey } = props;
  const styles = mergeStyles(defaultStyles, props.style);
  const talonProps = useUpsellProduct({ urlKey });
  const { upsellProducts } = talonProps;

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.sectionTitle}>{t.__('We found other products you might like!')}</Text>
      </View>
      <FlatList
        data={upsellProducts}
        contentContainerStyle={{}}
        keyExtractor={() => makeid()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => <ProductCart key={index} product={item} />}
      />
    </View>
  );
};

export default React.memo(UpsellProduct);
UpsellProduct.propTypes = {
  urlKey: string,
};
