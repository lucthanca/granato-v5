import React from 'react';
import { FlatList, View, Text } from 'react-native';
import makeid from '../../../utils/makeId';
import ProductCart from './productCart';
import { useRelatedProduct } from '../../../talons/catalog/product/RelatedProduct/useRelatedProduct';
import { object, string } from 'prop-types';
import t from '../../../utils/identify';
import defaultStyles from './relatedProduct.style';
import mergeStyles from '../../../utils/mergeStyles';

const RelatedProduct = props => {
  const { urlKey, customerWishlist } = props;
  const talonProps = useRelatedProduct({ urlKey });
  const { relatedProducts, isLoading } = talonProps;
  const styles = mergeStyles(defaultStyles, props.style);

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.sectionTitle}>{t.__('Related Products')}</Text>
      </View>
      <FlatList
        data={relatedProducts}
        contentContainerStyle={{}}
        keyExtractor={() => makeid()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => <ProductCart product={item} customerWishlist={customerWishlist} />}
      />
    </View>
  );
};

export default React.memo(RelatedProduct);

RelatedProduct.propTypes = {
  urlKey: string,
  customerWishlist: object,
};
