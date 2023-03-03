import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../../constants';
import useAddressBook from '../../talons/customer/addressBook/useAddressBook';
import Toast from 'react-native-toast-message';
import Spinner from '../../components/Spinner';
import styles from './listAddressesBook.style';

const Item = props => {
  const { navigation } = props;
  const { item } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  const {
    getCountryData,
    country,
    getCountryDataLoading,
    removeAddress,
    removeAddressLoading,
    removeAddressNoti,
    removeError,
  } = useAddressBook();
  useEffect(() => {
    getCountryData({ variables: { id: item.country_code } });
  }, []);

  const isLoading = useMemo(() => {
    return getCountryDataLoading || removeAddressLoading;
  }, [getCountryDataLoading, removeAddressLoading]);

  useMemo(() => {
    if (removeAddressNoti) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: 'Delete address successfully',
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
    }
    if (removeError) {
      Toast.show({
        type: 'customError',
        props: {
          text2: removeError.toString(),
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, [removeAddressNoti, removeError]);

  function showDeleteModal() {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.deleteModalContainer} onPress={() => setDeleteModal(false)}>
        <TouchableOpacity style={styles.deleteModalContent} activeOpacity={1}>
          <Text style={styles.titleDeleteModal}>Are you sure want to delete item?</Text>
          <View style={styles.optDeleteModal}>
            <TouchableOpacity
              onPress={() => [setDeleteModal(!deleteModal), removeAddress({ variables: { id: item.id } })]}
              style={styles.buttonYes}>
              <Text style={styles.textYes}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModal(!deleteModal)} style={styles.buttonNo}>
              <Text style={styles.textNo}>No</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  if (removeAddressNoti || isLoading) {
    return <Spinner visible={isLoading} animDuration={750} />;
  } else {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            // console.log('country: ', country);
            const addressData = {
              id: item.id,
              first_name: item.firstname,
              last_name: item.lastname,
              company: item.company,
              street: item.street[0],
              city: item.city,
              state: item.region.region,
              zipCode: item.postcode,
              phone: item.telephone,
              fax: item.fax,
              countryName: country ? country.full_name_locale : null,
              idCountry: country ? country.id : null,
              region_id: item.region.region_id,
            };
            navigation.navigate('AddressBookPage', { addressData, isEdit: true });
          }}
          style={styles.itemContainer}>
          <View>
            <Text style={styles.textInItem}>{`${item.firstname} ${item.lastname}`}</Text>
            <Text style={styles.textInItem}>{item.company}</Text>
            <Text style={styles.textInItem}>{item.street[0]}</Text>
            <Text style={styles.textInItem}>{`${item.city}, ${item.region.region ? item.region.region + ', ' : ''}${
              item.postcode
            }`}</Text>
            <Text style={styles.textInItem}>{country ? country.full_name_locale : null}</Text>
            <Text style={styles.textInItem}>{item.telephone}</Text>
          </View>
          <TouchableOpacity onPress={() => setDeleteModal(!deleteModal)}>
            <Ionicons name='trash' size={Constants.fontSize.xl} color={Constants.button.color.primary} />
          </TouchableOpacity>
        </TouchableOpacity>
        <Modal visible={deleteModal} animationType='slide' transparent={true}>
          {showDeleteModal()}
        </Modal>
      </View>
    );
  }
};

export default Item;
