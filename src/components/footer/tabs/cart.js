import React from 'react';
import Item from "./item";

const TabHome = props => {
  return (
    <Item label='Cart' iconName='cart-outline' {...props} />
  );
};

export default TabHome;
