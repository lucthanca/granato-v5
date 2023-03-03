import React, { memo, useRef } from 'react';
import { useProductPage } from '../../talons/catalog/product/useProductPage';
import Constants from '../../constants';
const Images = React.lazy(() => import('./ImageCarousel'));
import { View, Text, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import BoxToCart from './BoxToCart';
// import Spinner from '../../components/Spinner';

import PriceTiersDetails from './priceTiersDetails';
import SeperatorLine from '../../components/SeperatorLine';
import defaultStyles from './productFullDetails.style';
import mergeStyles from '../../utils/mergeStyles';
import t from '../../utils/identify';
import LoadingIndicator from '../../components/Spinner/loadingIndicator';

const RelatedProduct = React.lazy(() => import('./RelatedProduct'));
const UpsellProduct = React.lazy(() => import('./UpsellProduct'));
import AddToWishlist from '../../components/WishList/addToWishlist';

const WRAPPER_PADDING = Constants.alignSize[2];

const { width } = Dimensions.get('window');
const PageNotFound = React.lazy(() => import('../../components/404NotFound'));
const FinalPrice = React.lazy(() => import('../../components/Price/finalPrice'));
const renderers = {
  GroupedProduct: React.lazy(() => import('./BoxToCart/Complex/GroupedProduct')),
};

const ProductFullDetails = props => {
  const talonProps = useProductPage({ urlKey: props?.route?.params?.urlKey });
  const {
    product,
    productQueryLoading,
    priceConfig,
    productFinalPrice,
    minimumPrice,
    hidePrice,
    onAddToCartSuccess,
    specialRendererRef,
    minimumPriceText,
  } = talonProps;

  const seperatorLineWidth = width - WRAPPER_PADDING * 2;
  const styles = mergeStyles(defaultStyles, props.styles);
  const ref = useRef(null);
  // console.log({ product, productQueryLoading });

  const specialRenderedContent = React.useMemo(() => {
    if (renderers?.[product?.__typename]) {
      const SpecialRenderer = renderers[product.__typename];
      return <SpecialRenderer product={product} ref={specialRendererRef} />;
    }

    return null;
  }, [product]);

  const buildCartItems = React.useCallback(() => {
    if (typeof specialRendererRef?.current?.buildCartItems === 'function') {
      return specialRendererRef.current.buildCartItems();
    }
    return [];
  }, []);

  if (!product && productQueryLoading) {
    return <LoadingIndicator />; // <Spinner visible={true} overlayColor={'rgba(0, 0, 0, 0.01)'} blurAmount={16} animation="fade" animDuration={1500} />;
  }
  if (!productQueryLoading && !product) {
    return <PageNotFound />;
  }

  const { media_gallery, price_tiers = [] } = product;
  return (
    <>
      <ScrollView>
        <View style={styles.detailContent}>
          <View style={styles.mainImageContainer}>
            <React.Suspense fallback={<LoadingIndicator />}>
              <Images images={media_gallery} />
            </React.Suspense>
            <View style={styles.addToWishlistContainer}>
              <AddToWishlist product={product} />
            </View>
          </View>
          <View style={styles.productNameBox}>
            <Text style={styles.productSkuText}>{t.__(`SKU#: ${product.sku}`, { sku: product.sku })}</Text>
            <Text style={styles.productNameText}>{product.name}</Text>
          </View>
          <SeperatorLine color={Constants.color.gray.lighter} width={seperatorLineWidth} />
          <React.Suspense fallback={<LoadingIndicator />}>
            {!hidePrice && (
              <FinalPrice
                ref={ref}
                config={priceConfig}
                priceTiers={price_tiers}
                finalPrice={productFinalPrice}
                minimumPrice={minimumPrice}
                style={styles.priceBox}
                minimumPriceText={minimumPriceText}
                key={'mainProductPrice'}
              />
            )}
            {specialRenderedContent && <KeyboardAvoidingView>{specialRenderedContent}</KeyboardAvoidingView>}
          </React.Suspense>

          <SeperatorLine color={Constants.color.gray.lighter} width={seperatorLineWidth} />

          {price_tiers?.length > 0 && (
            <>
              <View style={styles.tierPricesBox}>
                <PriceTiersDetails tierPrices={price_tiers} />
              </View>
              <SeperatorLine color={Constants.color.gray.lighter} width={seperatorLineWidth} />
            </>
          )}
          <React.Suspense fallback={<LoadingIndicator />}>
            <View style={styles.relatedProductContainer}>
              <RelatedProduct urlKey={product?.url_key} />
            </View>
          </React.Suspense>
          <React.Suspense fallback={<LoadingIndicator />}>
            <View style={styles.upSellProductContainer}>
              <UpsellProduct urlKey={product?.url_key} />
            </View>
          </React.Suspense>
        </View>
      </ScrollView>
      <BoxToCart
        product={product}
        onQtyChange={qty => {
          ref.current.setQty(qty);
        }}
        buildCartItems={buildCartItems}
        onAddToCartSuccess={onAddToCartSuccess}
      />
    </>
  );
};

export default ProductFullDetails;
