import React, { useState } from 'react';
import { View, TextInput, Text, Keyboard, Platform } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './form.styles';
import Constants from '../../../constants';
import Identify from '../../../utils/identify';

function FloatingInput(props) {
  const {
    lable,
    type,
    req,
    handleChange,
    value,
    isSignIn,
    setCheckList,
    iconName,
    inputKey,
    isSignedIn,
    setIsChangePass,
    setList,
    listRef,
  } = props;
  const [status, setStatus] = useState('begin');
  let refArray = [];
  for (let key in listRef) {
    refArray.push(key);
  }
  const indexRef = refArray.indexOf(inputKey);
  const nextRef = refArray[indexRef + 1];

  function validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,100})+$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  }

  function validatePassword(password) {
    if (password && password.length >= 6) {
      return true;
    }
    return false;
  }

  function validate(inputKey, text) {
    if (type == 'password') {
      let tmp = validatePassword(text);
      setCheckList(prevState => ({
        ...prevState,
        [inputKey]: tmp,
      }));
      if (tmp) {
        setStatus('ok');
      } else {
        setStatus('err');
      }
    } else if (inputKey == 'email') {
      let tmp = validateEmail(text);

      setCheckList(prevState => ({
        ...prevState,
        [inputKey]: tmp,
      }));
      if (tmp) {
        setStatus('ok');
      } else {
        setStatus('err');
      }
    } else {
      if (req) {
        if (text.length > 0) {
          setCheckList(prevState => ({
            ...prevState,
            [inputKey]: true,
          }));
          setStatus('ok');
        } else {
          setCheckList(prevState => ({
            ...prevState,
            [inputKey]: false,
          }));
          setStatus('err');
        }
      }
    }
  }

  return (
    <View style={{ paddingVertical: Constants.alignSize[3] }}>
      {isSignIn ? null : (
        <Text style={styles.title}>
          {Identify.__(lable)}
          {req ? <Text style={{ color: 'red' }}> *</Text> : <Text>{Identify.__(' (optional)')}</Text>}
        </Text>
      )}
      <View
        style={[
          styles.border,
          {
            paddingHorizontal: isSignIn ? Constants.alignSize[3] : 0,
            borderColor: isSignIn
              ? status == 'begin'
                ? Constants.border_color
                : status == 'ok'
                ? Constants.success_border_color
                : Constants.error_border_color
              : null,
            borderWidth: isSignIn ? 1 : 0,
            borderBottomColor: isSignIn
              ? null
              : status == 'begin'
              ? Constants.border_color
              : status == 'ok'
              ? Constants.success_border_color
              : Constants.error_border_color,
          },
        ]}>
        <View style={styles.textInputView}>
          {isSignIn && iconName ? (
            <FontAwesome5
              name={iconName}
              style={[
                styles.iconTitle,
                {
                  color:
                    status == 'begin'
                      ? Constants.border_color
                      : status == 'ok'
                      ? Constants.success_border_color
                      : Constants.error_border_color,
                },
              ]}
            />
          ) : null}
          <TextInput
            // style={{ width: iconNaemail1me ? '89%' : '96%'}}
            style={{ flex: 9, paddingVertical: !isSignIn && Platform.OS == 'android' ? 0 : null }}
            defaultValue={value}
            returnKeyType='done'
            ref={listRef[inputKey]}
            editable={inputKey == 'email' && isSignedIn ? false : true}
            onSubmitEditing={() => {
              if (nextRef) {
                if ((nextRef == 'email') == isSignedIn) {
                  Keyboard.dismiss();
                } else {
                  listRef[nextRef].current.focus();
                }
              } else {
                Keyboard.dismiss();
              }
            }}
            keyboardType={type == 'phone' ? 'phone-pad' : 'default'}
            secureTextEntry={type == 'password' ? true : false}
            onChangeText={handleChange(inputKey)}
            onChange={({ nativeEvent: { eventCount, target, text } }) => {
              validate(inputKey, text);
              if (type == 'password' && isSignedIn) {
                setIsChangePass(true);
              }
              if (setList) {
                setList(prevState => ({
                  ...prevState,
                  [inputKey]: text,
                }));
              }
            }}
            placeholder={isSignIn ? Identify.__(lable) + (req ? ' *' : '') : null}
            clearButtonMode='while-editing'
            blurOnSubmit={false}
          />
        </View>
        {status != 'begin' ? (
          <AntDesign
            style={{
              fontSize: Constants.fontSize.md,
              color: status == 'ok' ? Constants.success_border_color : Constants.error_border_color,
            }}
            name={status == 'ok' ? 'checkcircle' : 'closecircle'}
          />
        ) : null}
      </View>
    </View>
  );
}

export default FloatingInput;
