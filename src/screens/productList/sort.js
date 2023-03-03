import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Constants from '../../constants';
const ProductsSort = props => {
  const { sortData } = props.route.params;
  console.log('sortData: ', sortData);
  return (
    <View>
      {/* <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <View>
                        <Text>
                            &lt; Back
                        </Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text>ProductsSort</Text>
                </View>
                <View />
            </View> */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {sortData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // const findValue = sortData.filter((item) => item.select);
              const newData = sortData.map(sortDataItem => {
                if (sortDataItem.label == item.label && sortDataItem.sortEnum == item.sortEnum) {
                  return {
                    ...sortDataItem,
                    select: true,
                  };
                } else {
                  return {
                    ...sortDataItem,
                    select: false,
                  };
                }
              });
              props.navigation.navigate('ProductList', { sortData: newData });
            }}>
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
                borderBottomColor: '#e0e0e0',
                borderBottomWidth: 1.5,
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 10 }}>
                  <Text>{item.label}</Text>
                </View>
                <View>
                  <Text>
                    {item.sortEnum == 'DESC' ? (
                      <AntDesign name='arrowup' style={{ fontSize: 18 }} />
                    ) : (
                      <AntDesign name='arrowdown' style={{ fontSize: 18 }} />
                    )}
                  </Text>
                </View>
              </View>
              <View style={{ paddingRight: 5 }}>
                {item.select ? (
                  <View>
                    <FontAwesome name='check' style={{ fontSize: 18, color: Constants.color.primary.normal }} />
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductsSort;
