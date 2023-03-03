import React, { memo, forwardRef } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';

import defaultStyles from './boxToCartComplex.style';
import mergeStyles from '../../../../utils/mergeStyles';
import FullScreenPreview from './ImagePreview/fulllScreenPreview';
import { useBoxToCartComplex } from '../../../../talons/catalog/product/boxToCart/Complex/useBoxToCartComplex';
import FinalPrice from '../../../../components/Price';
import ImagePreview from './ImagePreview';
import BottomSheet from '../../../../components/BottomSheet';
import AddToCartBtn from '../AddToCartBtn';
import t from '../../../../utils/identify';
import LoadingIndicator from '../../../../components/Spinner/loadingIndicator';

const typePools = {
  ConfigurableProduct: React.lazy(() => import('./ConfigurableProduct')),
  GroupedProduct: React.lazy(() => import('./GroupedProduct')),
};

const BoxToCartComplex = forwardRef((props, ref) => {
  const { product, propStyles = {}, sheetRef } = props;
  const { __typename } = product;
  const styles = mergeStyles(defaultStyles, propStyles);
  const talonProps = useBoxToCartComplex({ product, ref, sheetRef });
  const {
    displayImages,
    parentPrices: displayPrice,
    priceConfig,
    qtyRef,
    fullPreviewImgRef,
    imgRef,
    productTypeRenderRef,
    buildCartItems,
    addCartRef,
    priceRenderRef,
    handleSetAvailableToCart,
  } = talonProps;
  const content = React.useMemo(() => {
    if (!typePools?.[__typename]) {
      return (
        <View style={styles.unSupportedTypeRoot}>
          <Text style={styles.unSupportedTypeText}>{t.__('Unsupported product type')}</Text>
        </View>
      );
    }
    const TypeContent = typePools[__typename];
    return (
      <TypeContent
        ref={productTypeRenderRef}
        product={product}
        imagePreviewRef={imgRef}
        qtyRef={qtyRef}
        whenAvailableAddToCart={handleSetAvailableToCart}
      />
    );
  }, [
    __typename,
    handleSetAvailableToCart,
    imgRef,
    product,
    productTypeRenderRef,
    qtyRef,
    styles.unSupportedTypeRoot,
    styles.unSupportedTypeText,
  ]);
  // console.log('RENDER COMPLEX COMPONENT');

  return (
    <BottomSheet ref={sheetRef} renderFullScreenPopup={() => <FullScreenPreview ref={fullPreviewImgRef} />}>
      <View style={[styles.imagePreviewContent]}>
        <ImagePreview ref={imgRef} baseImages={displayImages} previewRef={fullPreviewImgRef} />
        <View style={[styles.priceBox]}>
          <FinalPrice
            ref={priceRenderRef}
            config={priceConfig}
            finalPrice={displayPrice.finalPrice}
            minimumPrice={displayPrice.minimumPrice}
            style={{
              finalPrice: { text: styles.finalPriceText },
            }}
          />
        </View>
      </View>
      <ScrollView style={[styles.scrollContent]}>
        <React.Suspense fallback={<LoadingIndicator />}>{content}</React.Suspense>
        {/*<View>{errorText && <Text>{errorText}</Text>}</View>*/}
      </ScrollView>
      <AddToCartBtn
        ref={addCartRef}
        buildCartItems={buildCartItems}
        addToCartSuccessMessage={t.__(`You added selected ${product.name} to your shopping cart.`)}
        onAddToCartSuccess={() => (typeof sheetRef?.current?.close === 'function' ? sheetRef.current.close() : null)}
      />
    </BottomSheet>
  );
});

export default memo(BoxToCartComplex);
