import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  list: {
    marginLeft: scale(15),
  },
  listItem: {
    width: scale(130),
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: verticalScale(10),
    flex: 1,
  },
  imageListItem: {
    width: 80,
    height: 130,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 10,
  },
  outOfStock: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
  },
  textPriceListProductItem: {
    color: 'red',
  },
  priceListItem: {
    height: verticalScale(20),
  },
  card: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    marginBottom: 5,
    fontSize: 8,
    textAlign: 'center',
  },
});
