import { View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import React from 'react';
import { useCategories } from '../../talons/catalog/categories/useCategories';
import Spinner from '../../components/Spinner';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const CategoryPage = () => {
  const navigation = useNavigation();
  const { categoryRootData, loading, selectedCategory, products, categories, category_id, handleSelectCategory } =
    useCategories();

  const renderViewAll = React.useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductList', { category_id: category_id });
        }}>
        <Text style={{ fontSize: 14, marginTop: 10, fontWeight: 'bold', color: '#150826', marginBottom: 5 }}>VIEW ALL</Text>
      </TouchableOpacity>
    );
  }, [category_id]);

  const renderSubCategory = () => {
    // return (
    //   <Text style={{ fontSize: 14, lineHeight: 22, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>{Identify.__('SUB CATEGORIES')}</Text>
    // )
    return (
      <Text style={{ fontSize: 14, lineHeight: 22, fontWeight: 'bold', color: '#000', marginBottom: 10 }}>SUB CATEGORIES</Text>
    );
  };

  const renderProductItem = (item, index) => {
    if (item) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('ProductFullDetail', { urlKey: item?.url_key });
          }}
          style={{ width: (width * 0.65 - 48) / 3, marginRight: 8, alignItems: 'center', justifyContent: 'center' }}>
          <View style={[styles.imageListItem, { borderWidth: 0.5, borderColor: '#e0e0e0' }]}>
            <FastImage
              style={{ width: 70, height: 90, overflow: 'hidden' }}
              source={{ uri: item.image.url }}
              resizeMode={FastImage.resizeMode.center}
            />
            <Text numberOfLines={2} style={styles.title}>
              {item.name}
            </Text>
          </View>

          {/* {this.renderContent(item)} */}
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          handleSelectCategory(item.id);
        }}
        style={{ width: (width * 0.65 - 48) / 3, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
        {item.image ? (
          <FastImage
            resizeMode={FastImage.resizeMode.center}
            style={{ width: '100%', aspectRatio: 1 }}
            source={{ uri: item.image }}
          />
        ) : (
          <FastImage
            resizeMode={FastImage.resizeMode.center}
            source={{
              uri: 'https://www.simicart.com/media/simicart/appdashboard/app_image/65a0ae54c08dd0b2f68c03ca6c496ebd.png',
            }}
            style={{ width: '100%', aspectRatio: 1 }}
          />
        )}
        <Text style={{ marginTop: 4, fontSize: 8 }} numberOfLines={1} ellipsizeMode='tail'>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const RightProducts = React.useMemo(() => {
    if (products.length > 0) {
      return (
        <FlatList
          data={products}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ paddingLeft: 15, paddingRight: 15, flexGrow: 0, height: products.length > 3 ? 320 : 200 }}
          contentContainerStyle={{ justifyContent: 'space-evenly' }}
          renderItem={({ item, index }) => renderProductItem(item, index)}
          ListHeaderComponent={renderViewAll}
        />
      );
    } else {
      return null;
    }
  }, [products]);

  const RightCategoris = React.useMemo(() => {
    if (categories.length > 0) {
      return (
        <FlatList
          data={categories}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={{ paddingLeft: 15, paddingRight: 15 }}
          renderItem={({ item, index }) => renderItem(item, index)}
          ListHeaderComponent={renderSubCategory}
        />
      );
    } else {
      return null;
    }
  }, [categories]);

  const categoryItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleSelectCategory(item.id)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'white',
          padding: 5,
          width: width * 0.3,
          backgroundColor: selectedCategory === item.id ? '#FFF' : '#F2F2F2',
        }}>
        {item.image ? (
          <FastImage
            style={{ width: width * 0.3, aspectRatio: 1 }}
            source={{ uri: item.image.url }}
            resizeMode={FastImage.resizeMode.center}
          />
        ) : (
          <FastImage
            source={{
              uri: 'https://www.simicart.com/media/simicart/appdashboard/app_image/65a0ae54c08dd0b2f68c03ca6c496ebd.png',
            }}
            style={{ width: 80, height: 80, aspectRatio: 1, marginLeft: 'auto', marginRight: 'auto' }}
            resizeMode={FastImage.resizeMode.center}
          />
        )}
        <Text style={{ marginTop: 5 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Spinner visible={loading} />;
  }
  if (!loading && categoryRootData) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <FlatList
          style={{ width: width * 0.3, backgroundColor: '#F2F2F2', height: height }}
          data={categoryRootData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          key='ONE COLUMN'
          renderItem={categoryItem}
        />
        <View style={{ width: width * 0.7, overflow: 'scroll' }}>
          {RightProducts}
          {RightCategoris}
        </View>
      </View>
    );
  }
};

export default CategoryPage;
