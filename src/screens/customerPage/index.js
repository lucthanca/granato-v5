import React, { useEffect, useState, useMemo, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { Formik } from 'formik';
import FloatingInput from '../../base/components/form/FloatingInput';
import Constants from '../../constants';
import { createAccount } from '../../talons/customer/createAccount/createAccount';

import Toast from 'react-native-toast-message';
import { useMyAccount } from '../../talons/customer/myAccount/useMyAccount';
import Spinner from '../../components/Spinner';
import styles from './customer.styles';
import Identify from '../../utils/identify';
import { useUserContext } from '../../context/user';

const width = Dimensions.get('window').width;

function CustomerPage(props) {
  const [{ isSignedIn, currentUser }, { getUserDetails }] = useUserContext();
  const { navigation } = props;
  const tmp = isSignedIn ? true : false;
  const [checkList, setCheckList] = useState({
    first_name: tmp,
    last_name: tmp,
    email: tmp,
    password: false,
    new_password: false,
    con_password: false,
  });
  const [isChangePass, setIsChangePass] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const { handleSubmit, loading } = createAccount({ navigation: navigation });
  const {
    updateInfo,
    fetchUserDetails,
    changePassword,
    ChangePassError,
    fetchUserDetailsLoading,
    updateInfoLoading,
    changePasswordLoading,
  } = useMyAccount();

  const email = currentUser.email;
  const last_name = currentUser.lastname;
  const first_name = currentUser.firstname;

  const fitstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const newPassRef = useRef();

  const listRef = isSignedIn
    ? {
        first_name: fitstNameRef,
        last_name: lastNameRef,
        email: emailRef,
        password: passRef,
        new_password: newPassRef,
        con_password: conPassRef,
      }
    : { first_name: fitstNameRef, last_name: lastNameRef, email: emailRef, password: passRef, con_password: conPassRef };

  useMemo(() => {
    if (ChangePassError) {
      Toast.show({
        type: 'customError',
        props: {
          text2: Identify.__(ChangePassError.toString()),
        },
        topOffset: 16,
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, [ChangePassError]);

  const isLoading = useMemo(() => {
    return fetchUserDetailsLoading || updateInfoLoading || changePasswordLoading || loading;
  }, [fetchUserDetailsLoading, updateInfoLoading, changePasswordLoading, loading]);

  function createField(inputKey, type, lable, req = false, value = '', handleChange) {
    return (
      <FloatingInput
        inputKey={inputKey}
        lable={lable}
        type={type}
        req={req}
        listRef={listRef}
        handleChange={handleChange}
        value={value}
        isSignIn={false}
        isSignedIn={isSignedIn}
        setIsChangePass={setIsChangePass}
        setCheckList={setCheckList}
        iconName={null}
      />
    );
  }
  useEffect(() => {
    let button_enable = true;
    for (let key in checkList) {
      if (isSignedIn) {
        if (isChangePass) {
          if (!checkList[key]) {
            button_enable = false;
            break;
          }
        } else {
          if (key == 'password' || key == 'new_password' || key == 'con_password') {
            continue;
          }
          if (!checkList[key]) {
            button_enable = false;
            break;
          }
        }
      } else {
        if (key == 'new_password') {
          continue;
        }
        if (!checkList[key]) {
          button_enable = false;
          break;
        }
      }
    }

    setButtonStatus(button_enable);
  }, [checkList]);

  function registerPassFields(handleChange) {
    return (
      <View>
        {createField('password', 'password', 'Password', true, '', handleChange)}
        {createField('con_password', 'password', 'Confirm Password', true, '', handleChange)}
      </View>
    );
  }

  function profilePassFields(handleChange) {
    return (
      <View>
        {createField('password', 'password', 'Current Password', false, '', handleChange)}
        {createField('new_password', 'password', 'New Password', false, '', handleChange)}
        {createField('con_password', 'password', 'Confirm Password', false, '', handleChange)}
      </View>
    );
  }

  async function onPressButton(values) {
    //register
    if (!isSignedIn) {
      if (values.con_password != values.password) {
        Toast.show({
          type: 'customError',
          props: {
            text2: Identify.__('Password and Confirm password don\'t match'),
          },
          topOffset: 16,
          autoHide: true,
          visibilityTime: 2000,
        });
      } else {
        handleSubmit({
          email: values.email,
          password: values.password,
          firstname: values.first_name,
          lastname: values.last_name,
        });
      }
    }

    //edit profile
    else {
      //has change pass
      if (isChangePass) {
        const infoVariables = { email: values.email, firstname: values.first_name, lastname: values.last_name };
        const changePassVariables = { currentPassword: values.password, newPassword: values.new_password };

        if (values.con_password !== values.new_password) {
          Toast.show({
            type: 'customError',
            props: {
              text2: Identify.__('New password and Confirm password don\'t match'),
            },
            topOffset: 16,
            autoHide: true,
            visibilityTime: 2000,
          });
        } else {
          await changePassword({ variables: changePassVariables });
          if (!ChangePassError) {
            Toast.show({
              type: 'customSuccess',
              props: {
                text2: Identify.__('The account infomation has been saved'),
              },
              topOffset: 16,
              autoHide: true,
              visibilityTime: 2000,
            });
            await updateInfo({ variables: infoVariables });
            navigation.navigate('MyAccount');
            await getUserDetails({ fetchUserDetails });
          }
        }
      }

      //hasn't change password
      else {
        const variables = { email: values.email, firstname: values.first_name, lastname: values.last_name };
        await updateInfo({ variables });
        Toast.show({
          type: 'customSuccess',
          props: {
            text2: Identify.__('The account infomation has been saved'),
          },
          topOffset: 16,
          autoHide: true,
          visibilityTime: 2000,
        });
        navigation.navigate('MyAccount');
        await getUserDetails({ fetchUserDetails });
      }
      // await getUserDetails({fetchUserDetails})
    }
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
      <Spinner visible={isLoading} animDuration={750} />
      <Formik
        initialValues={{
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: '',
          new_password: '',
          con_password: '',
        }}
        enableReinitialize={true}
        onSubmit={values => {
          Keyboard.dismiss();
          onPressButton(values);
        }}>
        {({ handleChange, handleSubmit }) => (
          <View style={styles.formikContainer}>
            <ScrollView style={styles.form}>
              {createField('first_name', 'text', 'First Name', true, first_name, handleChange)}
              {createField('last_name', 'text', 'Last Name', true, last_name, handleChange)}
              {createField('email', 'email', 'Email', true, email, handleChange)}
              {isSignedIn ? profilePassFields(handleChange) : registerPassFields(handleChange)}
            </ScrollView>
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={buttonStatus ? false : true}
              style={[
                styles.customerButton,
                { backgroundColor: buttonStatus ? Constants.button.color.primary : Constants.button.color.disabled },
              ]}>
              <Text style={styles.customerTextInButton}>{isSignedIn ? Identify.__('Save') : Identify.__('Register')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </TouchableOpacity>
  );
}

export default CustomerPage;
