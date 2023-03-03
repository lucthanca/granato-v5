import React, { useContext, useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { filterArray, sortArray } from '@src/lib/components/Product/ProductList/layers.flow.js';
import { useProducts } from '../../talons/catalog/products/useProducts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SinglePrice from '../../components/Price/formattedPrice';
import Gallery from '../../components/Gallery/gallery';
import Spinner from '../../components/Spinner';

const BASE_FONT_SIZE = 16;
// import , { SinglePrice } from '../../lib/components/Price';
const md5 = require('md5');
const height = Dimensions.get('window').height;

function ProductListPage(props) {
  const [categoryId, setCategoryId] = useState(props.route?.params?.category_id);
  const [sortLayers, setSortLayers] = useState([]);
  // const [filterLayers, setFilterLayers] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const talonProps = useProducts({
    categoryId,
  });
  const {
    products,
    loading,
    refesh,
    handleRefesh,
    handleLoadMore,
    loadMore,
    filterLayers,
    filterData,
    setFilterData,
    sortData,
    setSortData,
    isLoadMore,
    loadingGlobal,
  } = talonProps;
  const handleSort = sortLayers => {
    setSortLayers(sortLayers);
  };

  useEffect(() => {
    if (props.route.params?.filterData) {
      setFilterData(props.route.params?.filterData);
    }
    // if (props.route.params?.sortData) {
    //     setSortData(props.route.params?.sortData);
    // }
  }, [props.route.params]);

  useEffect(() => {
    if (props.route?.params?.category_id) {
      setCategoryId(props.route?.params?.category_id);
    }
  }, [props.route?.params?.category_id]);

  const ProductListHeader = () => {
    return (
      <View style={{}}>
        <View style={{ height: 100, width: '100%' }}>
          <View style={{ flexDirection: 'row', height: 50, width: '100%' }}>
            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('ProductsFilter', { filterLayers, filterData })}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 3 }}>
                    <AntDesign name="filter" style={{ fontSize: 18 }} />
                  </View>
                  <View>
                    <Text>Filter</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('ProductsSort', { sortData })}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 3 }}>
                    <FontAwesome name="sort" style={{ fontSize: 18 }} />
                  </View>
                  <View>
                    <Text>Sort By</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity onPress={() => {}}>
              <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome name="sort-amount-desc" style={{ fontSize: 18 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowGrid(!showGrid);
              }}>
              <View style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center' }}>
                {showGrid ? (
                  <SimpleLineIcons name="grid" style={{ fontSize: 18 }} />
                ) : (
                  <FontAwesome name="list-ul" style={{ fontSize: 18 }} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const heightL = React.useMemo(() => {
    if (filterData && filterData.length > 0) {
      return height - 250;
    } else {
      return height - 200;
    }
  }, [filterData]);

  if (!loadingGlobal && products) {
    console.log('filterData: ', filterData);
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ProductListHeader />
        {filterData && filterData.length > 0 ? (
          <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
            <ScrollView style={{ paddingHorizontal: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {filterData.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    const newState = filterData.filter(itemFilter => item.attribute_code !== itemFilter.attribute_code);
                    setFilterData(newState);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'white',
                      padding: 5,
                      paddingHorizontal: 10,
                      borderRadius: 15,
                      marginRight: 15,
                      borderWidth: 1,
                      borderRadius: 99,
                      borderColor: '#e0e0e0',
                    }}>
                    <View style={{ flexDirection: 'row', marginRight: 10 }}>
                      <View style={{ marginRight: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {item.attribute_code == 'category_id'
                            ? 'CATEGORY'
                            : item.attribute_code.includes('_')
                            ? item.attribute_code.split('_')[0]?.toUpperCase() +
                              ' ' +
                              item.attribute_code.split('_')[1]?.toUpperCase()
                            : item.attribute_code?.toUpperCase()}
                          :
                        </Text>
                      </View>
                      <View>
                        <Text>{item.label == '1' ? 'true' : item.label == '0' ? 'false' : item.label}</Text>
                      </View>
                    </View>
                    <View>
                      <AntDesign name="close" style={{ fontSize: 18 }} />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}
        <View style={{ height: heightL }}>
          <Gallery
            showGrid={showGrid}
            isLoadMore={isLoadMore}
            handleRefesh={handleRefesh}
            data={products}
            refesh={refesh}
            loadMore={loadMore}
            handleLoadMore={handleLoadMore}
          />
        </View>
      </View>
    );
  }
  if (loadingGlobal) {
    return <Spinner visible={loadingGlobal} />;
  }
}

export default ProductListPage;
