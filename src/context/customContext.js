import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import bindActionCreators from '../utils/bindActionCreators';

const CustomContext = createContext();

const CustomContextProvider = props => {
  // const {actions, customState, asyncActions, children} = props;
  //
  // const appApi = useMemo(
  //     () => ({
  //         ...actions,
  //         ...asyncActions
  //     }),
  //     [actions, asyncActions]
  // );
  //
  // const contextValue = useMemo(() => [customState, appApi], [appApi, customState]);
  console.log(Object.keys(props));
  const contextValue = 1;
  return <CustomContext.Provider value={contextValue}>{props.children}</CustomContext.Provider>;
};

const mapStateToProps = ({ customState }) => ({ customState: customState });

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators(ownProps.actions, dispatch),
});

export default connect(
  mapStateToProps,
  null,
  // mapDispatchToProps
)(CustomContextProvider);

export const useCustomContext = () => useContext(CustomContext);
