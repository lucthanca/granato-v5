import React, { memo, useEffect, useState, Fragment } from 'react';
import { array } from 'prop-types';
import { View, Text } from 'react-native';
import Constants from '../../constants';
import FinalPrice from '../../components/Price/finalPrice';
import { usePriceTiersDetails } from '../../talons/catalog/product/usePriceTiersDetails';

const TierPriceMessage = props => {
  const { tierPrice, style } = props;
  const talonProps = usePriceTiersDetails({});
  const { priceConfig } = talonProps;

  if (!tierPrice) {
    return null;
  }

  const { quantity, discount } = tierPrice;

  // console.log(tierPrice);
  // const [templateMessage, setAppliedTemplateMessage] = useState(Constants.tierPriceMessageTemplate);
  const templateMessageParts = Constants.tierPriceMessageTemplate;

  // console.log({parts});
  // useEffect(() => {
  //   for (const match of templateMessage.matchAll(/\%\{([a-z\_\-\.]+)\}\%/gm)) {
  //     if (match[1] === 'qty') {
  //       const processed = templateMessage.replace(/\%\{([a-z\_\-\.]+)\}\%/, <Text>{quantity}</Text>);
  //       setAppliedTemplateMessage(() => processed);
  //     }
  //   }
  // }, []);
  const rowFontSize = Constants.fontSize['2sm'];
  const tierPriceFiPStyle = {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    finalPrice: {
      text: { fontSize: rowFontSize, fontWeight: 'bold' },
    },
    exclPriceStyle: {
      root: { marginLeft: Constants.alignSize[1], flexDirection: 'row' },
      text: {
        fontSize: rowFontSize,
      },
    },
  };

  const finalExclTaxTmpl = {
    position: ['(', '%{label}%', ' ', '%{value}%', ')'],
  };

  const predefinedProcessor = {
    qty: <Text style={{ fontSize: rowFontSize }}>{quantity}</Text>,
    final_price: (
      <FinalPrice
        config={priceConfig}
        finalPrice={{ ...{}, final_price: tierPrice.final_price_incl_tax, final_price_excl_tax: tierPrice.final_price }}
        style={tierPriceFiPStyle}
        template={{ finalExclTaxTmpl }}
      />
    ),
    discount: <Text style={{ fontSize: rowFontSize, fontWeight: 'bold' }}>{`${discount.percent_off}%`}</Text>,
  };
  return (
    <View style={{ flexDirection: 'row', fontSize: rowFontSize, flexWrap: 'wrap', ...style.root }}>
      <>
        {templateMessageParts.map((part, index) => {
          const match = part.match(/%\{([a-z_\-.]+)}%/);
          let output = null;
          if (!match) {
            output = <Text style={{ fontSize: rowFontSize }}>{part}</Text>;
          } else if (predefinedProcessor.hasOwnProperty(match[1])) {
            output = predefinedProcessor[match[1]];
          }
          return <Fragment key={'tierPricePart' + index}>{output}</Fragment>;
        })}
      </>
    </View>
  );
};

const PriceTiersDetails = props => {
  const { tierPrices } = props;
  // console.log(tierPrices);
  return (
    <>
      {tierPrices?.length > 0 &&
        tierPrices.map((tierPrice, index) => {
          return <TierPriceMessage key={`tierPrice.${index}`} tierPrice={tierPrice} style={{ root: { ...Constants.my[1] } }} />;
        })}
    </>
  );
};

export default memo(PriceTiersDetails);
PriceTiersDetails.propTypes = {
  tierPrices: array.isRequired,
};
