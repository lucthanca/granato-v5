import React, { Fragment, memo, forwardRef } from 'react';
import { shape, object, func, array, string } from 'prop-types';
import { View, Text } from 'react-native';
import { useFinalPrice } from '../../talons/price/useFinalPrice';
import { SinglePrice } from '.';
import t from '../../utils/identify';
import defaultStyles from './finalPrice.style';
import RegularPrice from './regularPrice';
import mergeStyles from '../../utils/mergeStyles';
import composeStyles from '../../utils/composeStyles';

const FinalPrice = forwardRef((props, ref) => {
  const { template, minimumPriceText, style: propStyle, ...restProps } = props;
  const talonProps = useFinalPrice({ ref, ...restProps });
  // const styles = mergeStyles(defaultStyles, propStyle);
  const styles = composeStyles(defaultStyles, propStyle);
  // console.log(styles);

  // console.log('RENDER PRICE');
  const { finalPrice, finalExclTaxPrice, regularPrice, minimumPrice, hasCustomPrice } = talonProps;

  // stylesheet spread
  const {
    regularPrice_root,
    regularPrice_text,
    regularPrice_label,
    finalPrice_root,
    finalPrice_text,
    exclPriceStyle_root,
    exclPriceStyle_text,
    exclPriceStyle_label,
    exclPriceStyle_value,
    root,
    ...rest
  } = styles;

  return (
    <View style={root}>
      {minimumPrice && !hasCustomPrice && <Text style={styles.asLowAsText}>{minimumPriceText || t.__('As low as')}</Text>}
      <SinglePrice
        value={finalPrice?.value}
        currencyCode={finalPrice?.currency || 'USD'}
        style={{ root: finalPrice_root, text: finalPrice_text, ...rest }}
      />
      {finalExclTaxPrice && (
        <View style={exclPriceStyle_root}>
          <>
            {template?.finalExclTaxTmpl?.position.map(part => {
              const match = part.match(/%\{([a-z_\-.]+)}%/);
              let output = null;
              switch (match?.[1]) {
                case 'label':
                  output = (
                    <Text style={[exclPriceStyle_text, exclPriceStyle_label]}>
                      {template?.finalExclTaxTmpl?.label || t.__('Excl. Tax: ')}
                    </Text>
                  );
                  break;
                case 'value':
                  output = (
                    <SinglePrice
                      value={finalExclTaxPrice.value}
                      currencyCode={finalExclTaxPrice.currency}
                      style={{ text: { ...exclPriceStyle_text, ...exclPriceStyle_value } }}
                    />
                  );
                  break;
                default:
                  output = <Text style={exclPriceStyle_text}>{part}</Text>;
              }
              return <Fragment key={'finalExclTaxPrice-render-with-tmpl' + part}>{output}</Fragment>;
            })}
          </>
          {!template?.finalExclTaxTmpl?.position && (
            <>
              <Text style={[exclPriceStyle_text, exclPriceStyle_label]}>
                {template?.finalExclTaxTmpl?.label || t.__('Excl. Tax: ')}
              </Text>
              <SinglePrice
                value={finalExclTaxPrice.value}
                currencyCode={finalExclTaxPrice.currency}
                style={{ text: { ...exclPriceStyle_text, ...exclPriceStyle_value } }}
              />
            </>
          )}
        </View>
      )}
      <RegularPrice
        price={regularPrice}
        style={{ root: regularPrice_root, text: regularPrice_text, label: regularPrice_label, ...rest }}
      />
    </View>
  );
});

export default memo(FinalPrice);

FinalPrice.propTypes = {
  style: shape({
    root: object,
    asLowAsText: object,
    regularPrice_root: object,
    regularPrice_text: object,
    regularPrice_label: object,
    finalPrice_root: object,
    finalPrice_text: object,
    exclPriceStyle_root: object,
    exclPriceStyle_text: object,
    exclPriceStyle_label: object,
    exclPriceStyle_value: object,
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
