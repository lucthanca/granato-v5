import React, { Fragment, memo, forwardRef } from 'react';
import { shape, object, func, array, string } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { useFinalPrice } from '../../talons/price/useFinalPrice';
import { SinglePrice } from '.';
import t from '../../utils/identify';
import defaultStyles from './finalPrice.style';
import RegularPrice from './regularPrice';
import mergeStyles from '../../utils/mergeStyles';

const FinalPrice = forwardRef((props, ref) => {
  const { template, minimumPriceText, style: propStyle, ...restProps } = props;
  const talonProps = useFinalPrice({ ref, ...restProps });
  const styles = mergeStyles(defaultStyles, propStyle);

  // console.log('RENDER PRICE');
  const { finalPrice, finalExclTaxPrice, regularPrice, minimumPrice, hasCustomPrice } = talonProps;

  return (
    <View style={styles.root}>
      {minimumPrice && !hasCustomPrice && <Text style={styles.asLowAsText}>{minimumPriceText || t.__('As low as')}</Text>}
      <SinglePrice value={finalPrice?.value} currencyCode={finalPrice?.currency || 'USD'} style={styles.finalPrice} />
      {finalExclTaxPrice && (
        <View style={styles.exclPriceStyle.root}>
          <>
            {template?.finalExclTaxTmpl?.position.map(part => {
              const match = part.match(/%\{([a-z_\-.]+)}%/);
              let output = null;
              switch (match?.[1]) {
                case 'label':
                  output = (
                    <Text style={[styles.exclPriceStyle.text, styles.exclPriceStyle.label]}>
                      {template?.finalExclTaxTmpl?.label || t.__('Excl. Tax: ')}
                    </Text>
                  );
                  break;
                case 'value':
                  output = (
                    <SinglePrice
                      value={finalExclTaxPrice.value}
                      currencyCode={finalExclTaxPrice.currency}
                      style={{ text: { ...styles.exclPriceStyle.text, ...styles.exclPriceStyle.value } }}
                    />
                  );
                  break;
                default:
                  output = <Text style={styles.exclPriceStyle.text}>{part}</Text>;
              }
              return <Fragment key={'finalExclTaxPrice-render-with-tmpl' + part}>{output}</Fragment>;
            })}
          </>
          {!template?.finalExclTaxTmpl?.position && (
            <>
              <Text style={[styles.exclPriceStyle.text, styles.exclPriceStyle.label]}>
                {template?.finalExclTaxTmpl?.label || t.__('Excl. Tax: ')}
              </Text>
              <SinglePrice
                value={finalExclTaxPrice.value}
                currencyCode={finalExclTaxPrice.currency}
                style={{ text: { ...styles.exclPriceStyle.text, ...styles.exclPriceStyle.value } }}
              />
            </>
          )}
        </View>
      )}
      <RegularPrice price={regularPrice} style={styles.regularPrice} />
    </View>
  );
});

export default memo(FinalPrice);

FinalPrice.propTypes = {
  style: shape({
    asLowAsText: object,
    root: object,
    finalPrice: object,
    regularPrice: shape({
      root: object,
      text: object,
      value: object,
      label: object,
    }),
    exclPriceStyle: shape({
      root: object,
      text: object,
      value: object,
      label: object,
    }),
  }),
  finalPrice: object.isRequired,
  minimumPrice: object,
  priceTiers: array,
  getApi: func,
  config: object,
  template: shape({
    finalExclTaxTmpl: shape({
      label: string,
      position: array,
    }),
  }),
  minimumPriceText: string,
};
