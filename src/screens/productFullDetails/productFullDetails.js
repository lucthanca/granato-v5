import React, { memo, useRef } from 'react';
import { useProductPage } from '../../talons/catalog/product/useProductPage';
import Constants from '../../constants';
import Images from './ImageCarousel';
import { View, Text, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import BoxToCart from './BoxToCart';
import Spinner from '../../components/Spinner';

import PriceTiersDetails from './priceTiersDetails';
import SeperatorLine from '../../components/SeperatorLine';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import defaultStyles from './productFullDetails.style';
import mergeStyles from '../../utils/mergeStyles';
import t from '../../utils/identify';
import LoadingIndicator from '../../components/Spinner/loadingIndicator';

import RelatedProduct from './RelatedProduct';
import UpsellProduct from './UpsellProduct';
import AddToWishlist from '../../components/WishList/addToWishlist';

const WRAPPER_PADDING = Constants.alignSize[2];

const { width, height: h } = Dimensions.get('window');

const PageNotFound = memo(() => {
  const navigation = useNavigation();
  const styles = {
    root: {
      width: '100%',
      height: '75%',
      borderColor: 'green',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: { width: '75%' },
    goHomeBtn: {
      // borderColor: 'red',
      // borderWidth: 3,
      paddingHorizontal: Constants.alignSize[5],
      borderRadius: Constants.borderRadius.xs,
      backgroundColor: Constants.color.primary.normal,
      flexDirection: 'row',
      alignItems: 'center',
      height: Constants.button.height.primary,
    },
    goHomeBtnIconBack: {
      width: Constants.fontSize.md,
      fontSize: Constants.fontSize.md,
      borderColor: 'red',
      color: Constants.color.white.normal,
    },
    goHomeBtnText: {
      marginLeft: Constants.alignSize[2],
      color: Constants.color.white.normal,
    },
  };

  return (
    <View style={styles.root}>
      <Text style={{ fontSize: Constants.fontSize['3xl'] }}>{t.__('Whoops, our bad...')}</Text>
      <LottieView
        source={require('../../assets/lottie-animated-icons/84918-404-error-doodle-animation.json')}
        style={styles.icon}
        loop={true}
        autoPlay={true}
        resizeMode={'contain'}
      />
      <TouchableOpacity style={styles.goHomeBtn} activeOpacity={0.75} onPress={() => navigation.navigate('Home')}>
        <Icon name={'arrowleft'} style={styles.goHomeBtnIconBack} />
        <Text style={styles.goHomeBtnText}>{t.__('Go to Home')}</Text>
      </TouchableOpacity>
    </View>
  );
});

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
    if (typeof specialRendererRef?.current.buildCartItems === 'function') {
      return specialRendererRef?.current.buildCartItems();
    }
    return [];
  }, []);

  if (!product && productQueryLoading) {
    return <Spinner visible={true} overlayColor={'rgba(0, 0, 0, 0.01)'} blurAmount={16} animation="fade" animDuration={1500} />;
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
            <Images images={media_gallery} />
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
          <View style={styles.relatedProductContainer}>
            <RelatedProduct urlKey={product?.url_key} />
          </View>
          <View style={styles.upSellProductContainer}>
            <UpsellProduct urlKey={product?.url_key} />
          </View>
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

export default memo(ProductFullDetails);
