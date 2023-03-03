import { View, Text, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';

import AntDesign from 'react-native-vector-icons/AntDesign';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProductsFilter = props => {
  return null;
  // const { filterLayers = [], filterData = [] } = props.route.params;
  // const [select, setSelect] = useState(filterLayers[0]);
  // const [selectedValue, setSelectedValue] = useState({
  //   attribute_code: '',
  //   value: '',
  // });
  // // useEffect(() => {
  // //     if (filterData.length > 0) {
  // //         let findItem = filterData.filter((item) => select.attribute_code == item.attribute_code);
  // //         if (findItem[0]) {
  // //             setSelectedValue({
  // //                 attribute_code: findItem[0]?.attribute_code,
  // //                 value: findItem[0]?.value,
  // //                 label: findItem[0]?.label,
  // //             })
  // //         } else {
  // //             setSelectedValue({
  // //                 attribute_code: select.attribute_code,
  // //                 value: select?.options[0].value,
  // //                 label: select?.options[0].label,
  // //             })
  // //         }
  // //     } else {
  // //         setSelectedValue({
  // //             attribute_code: select.attribute_code,
  // //             value: select?.options[0].value,
  // //             label: select?.options[0].label,
  // //         })
  // //     }
  // // }, [select]);
  //
  // const renderLeftItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setSelect(item);
  //       }}
  //     >
  //       <View
  //         style={{
  //           width: '100%',
  //           minHeight: 50,
  //           maxHeight: 100,
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           paddingLeft: 10,
  //           backgroundColor: select.attribute_code == item.attribute_code ? 'white' : '#e0e0e0',
  //           marginBottom: 1,
  //         }}
  //       >
  //         <View style={{ marginRight: 10 }}>
  //           <Text>{item.label}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  // const Left = React.useMemo(() => {
  //   return (
  //     <FlatList
  //       data={filterLayers}
  //       // extraData={state.selectedCbx}
  //       showsVerticalScrollIndicator={false}
  //       keyExtractor={(item) => item?.label}
  //       renderItem={renderLeftItem}
  //       style={{ height: '100%', width: 120 }}
  //     />
  //   );
  // }, [filterLayers, selectedValue]);
  //
  // const checkValue = (value) => {
  //   if (selectedValue.value == value.value) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  //
  // const onClearFilter = () => {
  //   props.navigation.navigate('ProductList', {
  //     filterData: [],
  //   });
  // };
  //
  // const handleApply = () => {
  //   let newFilterData = [];
  //   if (filterData.length > 0) {
  //     const findValue = filterData.filter((item) => item.attribute_code == selectedValue.attribute_code);
  //     if (findValue.length > 0) {
  //       newFilterData = filterData.map((item) => {
  //         if (item.attribute_code == selectedValue.attribute_code) {
  //           return selectedValue;
  //         } else {
  //           return item;
  //         }
  //       });
  //     } else {
  //       newFilterData = [...filterData, selectedValue];
  //     }
  //   } else {
  //     newFilterData.push(selectedValue);
  //   }
  //   props.navigation.navigate('ProductList', {
  //     filterData: newFilterData,
  //   });
  // };
  //
  // const rednerRightItem = ({ item }) => {
  //   return (
  //     <TouchableOpacity
  //       // key={index}
  //       onPress={() => {
  //         setSelectedValue({
  //           attribute_code: item.attribute_code,
  //           value: item.value,
  //           label: item.label,
  //         });
  //       }}
  //     >
  //       <View style={{ minHeight: 30, width: 200, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
  //         {checkValue(item) ? <Feather name="check-circle" style={{ fontSize: 18 }} /> : <Feather name="circle" style={{ fontSize: 18 }} />}
  //         <View style={{ marginLeft: 10 }}>
  //           <Text>{item.label}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  //
  // const Right = () => {
  //   let dataLeft = select?.options.map((item) => {
  //     return {
  //       ...item,
  //       attribute_code: select.attribute_code,
  //     };
  //   });
  //   return (
  //     <FlatList
  //       data={dataLeft}
  //       // extraData={state.selectedCbx}
  //       showsVerticalScrollIndicator={false}
  //       keyExtractor={(item) => item?.label}
  //       renderItem={rednerRightItem}
  //       style={{ height: '100%', width: width - 120, padding: 20 }}
  //     />
  //   );
  // };
  // return (
  //   <View style={{ flex: 1, backgroundColor: 'white' }}>
  //     {/* <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
  //               <TouchableOpacity onPress={() => props.navigation.goBack()}>
  //                   <View>
  //                       <Text>
  //                           &lt; Back
  //                       </Text>
  //                   </View>
  //               </TouchableOpacity>
  //               <Text>ProductsFilter</Text>
  //               <View >
  //
  //               </View>
  //           </View> */}
  //     {filterData.length > 0 ? (
  //       <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
  //         <View>
  //           <Text style={{ fontWeight: 'bold', fontSize: 16 }}>ACTIVATED</Text>
  //         </View>
  //         {filterData.map((item, index) => (
  //           <View
  //             key={index}
  //             style={{
  //               height: 40,
  //               marginBottom: 3,
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               borderBottomWidth: 0.5,
  //               justifyContent: 'space-between',
  //               paddingHorizontal: 5,
  //             }}
  //           >
  //             <View style={{ flexDirection: 'row' }}>
  //               <View style={{ marginRight: 15 }}>
  //                 <Text style={{ fontWeight: 'bold' }}>{item.attribute_code}:</Text>
  //               </View>
  //               <View>
  //                 <Text>{item.label}</Text>
  //               </View>
  //             </View>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 props.navigation.navigate('ProductList', {
  //                   filterData: filterData.filter((filterDataItem) => filterDataItem.attribute_code != item.attribute_code),
  //                 });
  //               }}
  //             >
  //               <AntDesign name="close" style={{ fontSize: 18 }} />
  //             </TouchableOpacity>
  //           </View>
  //         ))}
  //       </View>
  //     ) : null}
  //     <View style={{ height: height * 0.68, width, flexDirection: 'row' }}>
  //       {Left}
  //       <Right />
  //     </View>
  //     <View style={styles.btnActions}>
  //       <TouchableOpacity onPress={onClearFilter} style={[styles.btn, { backgroundColor: '#ECEEF5' }]}>
  //         <Text style={[styles.textBtn, { color: Constants.button_color, fontWeight: 'bold' }]}>
  //           {/* {Identify.__('Reset')} */}
  //           Reset
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={[styles.btn, { backgroundColor: Constants.button_color }]} onPress={handleApply}>
  //         <Text style={[styles.textBtn, { color: '#FFF', fontWeight: 'bold' }]}>
  //           {/* {Identify.__('Apply')} */}
  //           Apply
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

export default ProductsFilter;
