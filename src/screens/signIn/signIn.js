import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { useSignIn } from '../../talons/customer/signIn/useSignIn';
import FloatingInput from '../../base/components/form/FloatingInput';
import Constants from '../../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppStorage from '../../utils/simpleStorage';

import Toast from 'react-native-toast-message';
import Spinner from '../../components/Spinner';
import styles from './signIn.styles';
import Identify from '../../utils/identify';
import { useUserContext } from '../../context/user';

const SignIn = props => {
  const [rememberInfo, setRememberInfo] = useState(null);
  const info = props.info ? props.info : rememberInfo ? rememberInfo : null;
  const { navigation } = props;
  const { handleSubmit, token, signIn_error, signInLoading, mergeCartsLoading, fetchCartIdLoading } = useSignIn();
  const [checkList, setCheckList] = useState({ email: false, password: false });
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(rememberInfo ? true : false);
  const [acc, setAcc] = useState({ email: '', password: '' });
  const [, { setToken }] = useUserContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const listRef = { email: emailRef, password: passwordRef };

  useMemo(() => {
    if (info) {
      setCheckList({ email: true, password: true });
      setAcc({ email: info.email, password: info.password });
      if (rememberInfo) {
        setIsRememberMe(true);
      }
    }
  }, [props.info, info]);

  useEffect(() => {
    async function getRemembeInfo() {
      await AppStorage.getData('Remember_Info').then(res => {
        setRememberInfo(JSON.parse(res));
      });
    }
    getRemembeInfo();
  }, []);
  // useMemo(() =>{
  //     if (signInLoading || mergeCartsLoading || fetchCartIdLoading) {
  //         setGlobalLoading();
  //     } else {
  //         removeGlobalLoading();
  //     }
  // },[signInLoading, mergeCartsLoading, fetchCartIdLoading])

  const isLoading = useMemo(() => {
    return signInLoading || mergeCartsLoading || fetchCartIdLoading;
  }, [signInLoading, mergeCartsLoading, fetchCartIdLoading]);

  useMemo(() => {
    if (checkList.email && checkList.password) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  }, [checkList]);

  useMemo(async () => {
    if (token) {
      Toast.show({
        type: 'customSuccess',
        props: {
          text2: 'Sign in successfully',
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
      if (isRememberMe) {
        await AppStorage.setData('Remember_Info', JSON.stringify(acc));
      } else {
        await AppStorage.removeData(['Remember_Info']);
      }
      await navigation.navigate('Home');
      await setToken(token);
    } else {
      Toast.show({
        type: 'customError',
        props: {
          text2: signIn_error.toString(),
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, [token, signIn_error]);

  function renderRemember() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setIsRememberMe(!isRememberMe)} style={styles.rememberMeButton}>
          <MaterialIcons name={isRememberMe ? 'check-circle' : 'radio-button-off'} style={styles.rememberMeIcon} />
          <Text style={styles.rememberMeText}>{Identify.__('Remember me')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFogotPass() {
    return (
      <View style={styles.forgotPassView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPass')}
          // onPress={() => setIsFogotPassPage(true)}
          style={{ marginVertical: 15 }}>
          <Text style={styles.forgotPassText}>{Identify.__('Forgot your password?')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCreateAccount() {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('CustomerPage')} style={styles.createAccountButton}>
        <Text style={styles.createAccountText}>{Identify.__('Create an Account')}</Text>
      </TouchableOpacity>
    );
  }

  // if(!isFogotPassPage){
  return (
    <TouchableOpacity style={styles.signInContainer} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
      <View>
        <Spinner visible={isLoading} animDuration={750} />
        <Formik
          enableReinitialize={true}
          initialValues={{ email: acc.email, password: acc.password }}
          onSubmit={values => {
            handleSubmit({
              email: values.email,
              password: values.password,
            });
            Keyboard.dismiss();
            setAcc({ email: values.email, password: values.password });
          }}>
          {({ handleChange, handleSubmit }) => (
            <View>
              <FloatingInput
                inputKey='email'
                lable="Email"
                type='email'
                listRef={listRef}
                req={true}
                handleChange={handleChange}
                value={acc.email}
                isSignIn={true}
                setCheckList={setCheckList}
                iconName='user-alt'
              />
              <FloatingInput
                inputKey='password'
                lable="Password"
                type='password'
                listRef={listRef}
                req={true}
                handleChange={handleChange}
                value={acc.password}
                isSignIn={true}
                setCheckList={setCheckList}
                iconName='lock'
              />
              {renderRemember()}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={buttonStatus ? false : true}
                style={[
                  styles.signInButton,
                  { backgroundColor: buttonStatus ? Constants.button.color.primary : Constants.button.color.disabled },
                ]}>
                <Text style={styles.signInText}>{Identify.__('Sign In')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        {renderFogotPass()}
        <View style={styles.orView}>
          <View style={styles.line} />
          <Text style={styles.orText}>{Identify.__('OR')}</Text>
          <View style={styles.line} />
        </View>
        {renderCreateAccount()}
      </View>
    </TouchableOpacity>
  );
};

export default SignIn;
