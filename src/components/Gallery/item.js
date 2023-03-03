import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import SinglePrice from '../Price/formattedPrice';
import { ButtonScale } from '../Button';
const width = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import AddToListButton from '../WishList/AddToListButton';
import FastImage from 'react-native-fast-image';
import AddToWishlist from '../WishList/addToWishlist';
const GalleryItem = (props) => {
  const navigation = useNavigation();
  const { item, index, showGrid } = props;
  const isRight = index % 2 == 0;
  const renderItem = React.useMemo(() => {
    if (showGrid) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 5,
            width: (width - 15) / 2,

            marginVertical: 2.5,
            marginRight: isRight ? 2.5 : 5,
            marginLeft: isRight ? 5 : 2.5,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
          key={index}
        >
          {/*<View style={{ width: 50, height: 50, position: 'absolute', top: 0, right: 0, zIndex: 99 }}>*/}
          {/*  <AddToWishlist product={item} />*/}
          {/*</View>*/}
          <AddToListButton item={item} />
          <FastImage source={{ uri: item?.image?.url }} style={{ width: '100%', height: 200 }} resizeMode={FastImage.resizeMode.center} />
          <View style={{ padding: 10 }}>
            <Text numberOfLines={1}>{item?.name}</Text>
            <SinglePrice
              value={item?.price_range?.maximum_price?.final_price?.value}
              currencyCode={item?.price_range?.maximum_price?.final_price?.currency}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#e0e0e0',
            borderRadius: 5,
            margin: 5,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            padding: 10,
          }}
          key={index}
        >
          <AddToListButton item={item} />
          <FastImage source={{ uri: item?.image?.url }} style={{ width: 120, height: 120 }} resizeMode={FastImage.resizeMode.center} />
          <View style={{ paddingHorizontal: 10, paddingRight: 20, width: width - 150 }}>
            <Text numberOfLines={1}>{item?.name}</Text>
            <SinglePrice
              value={item?.price_range?.maximum_price?.final_price?.value}
              currencyCode={item?.price_range?.maximum_price?.final_price?.currency}
            />
          </View>
          <View></View>
        </View>
      );
    }
  }, [showGrid]);

  return (
    <ButtonScale
      onPress={() => {
        navigation.navigate('ProductFullDetails', { urlKey: item?.url_key });
      }}
    >
      <View style={{}}>{renderItem}</View>
    </ButtonScale>
  );
};

export default GalleryItem;
