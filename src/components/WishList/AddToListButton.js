import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useWishlist } from '../../talons/customer/wishlist/useWishlist';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from '../../constants';
const AddToListButton = props => {
  const { item = {} } = props;
  const { isSelected, handleClick, handleRemoveProductFromWishlist } = useWishlist({ item });
  return (
    <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 9999 }}>
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            console.log('1');
            handleRemoveProductFromWishlist();
          } else {
            handleClick();
          }
        }}>
        <View
          style={{
            padding: 5,
            borderRadius: 99,
            borderColor: '#e0e0e0',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Constants.color.gray.normal,
          }}>
          {isSelected ? (
            <AntDesign name="heart" style={{ fontSize: 18, color: 'red' }} />
          ) : (
            <AntDesign name="hearto" style={{ fontSize: 18 }} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddToListButton;
