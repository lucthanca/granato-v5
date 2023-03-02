import React from 'react';
import Item from "./item";
const TabAccount = props => {
  return (
    <Item iconName='person-outline' label='My Account' {...props} />
  );
};

export default TabAccount;
