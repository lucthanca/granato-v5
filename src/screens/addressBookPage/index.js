import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from './item';
import Constants from '../../constants';
import useAddressBook from '../../talons/customer/addressBook/useAddressBook';
import Spinner from '../../components/Spinner';
import styles from './listAddressesBook.style';

const ListAddressesBook = props => {
  const { navigation } = props;

  const { listAddresses, getListAddressesLoading, getListAddr } = useAddressBook();
  const [listData, setListData] = useState(listAddresses);

  const isLoading = useMemo(() => {
    return getListAddressesLoading;
  }, [getListAddressesLoading]);

  useEffect(async () => {
    await getListAddr();
  }, [props]);

  useMemo(() => {
    return setListData(listAddresses);
  }, [listAddresses]);

  // if (!listAddresses) return null;
  const listAddressComponent =
    listData && listData.length > 0 ? (
      <ScrollView>
        {listData.map((item, index) => (
          <Item item={item} navigation={navigation} />
        ))}
      </ScrollView>
    ) : null;

  return (
    <View style={styles.listAddrContainer}>
      <Spinner visible={isLoading} animDuration={750} />
      <TouchableOpacity onPress={() => navigation.navigate('AddressBookPage')} style={styles.addAddressButton}>
        <View style={styles.leftAddAddrButton}>
          <Ionicons name='add-circle-outline' size={Constants.fontSize.xl} />
          <Text style={styles.textInAddAddrButton}>Add an address</Text>
        </View>
        <Ionicons name='arrow-forward' size={Constants.fontSize.xl} />
      </TouchableOpacity>
      <Text style={styles.normalText}>Or choose address(es) to edit</Text>
      {listAddressComponent}
    </View>
  );
};

export default ListAddressesBook;
