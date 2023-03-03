import React, { useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Formik } from 'formik';
import FloatingInput from "../../../lib/base/components/form/FloatingInput"; 
import Constants from "@helper/constants";
import { useForgotPassword } from '../../../talon/customer/signIn/forgotPassword/useForgotPassword'
import Toast from 'react-native-toast-message'
import Spinner from "../../../lib/components/Spinner";
import styles from './signIn.styles'
import Identify from '@utils/Identify'

const ForgotPass = (props) => {
    // const { signIn } = useSignIn(navigation);
    // const { setIsFogotPassPage } = props;
    const { navigation } = props
    const {handleFormSubmit, formErrors, resetPasswordData, isResettingPassword} = useForgotPassword();
    const [checkList, setCheckList]= React.useState({email: false});
    
    const emailRef = useRef();
    const listRef = ({email: emailRef})

    const isLoading = useMemo(() => {
        return isResettingPassword
    }, [isResettingPassword]);

    useMemo(() =>{
        if(formErrors){
            Toast.show({
                type: 'customError',
                props: {
                  text2: formErrors.toString()
                },
                topOffset: 16,
                autoHide: true,
                visibilityTime: 2000,
              });
        }
        else if(resetPasswordData){
            Toast.show({
                type: 'customSuccess',
                props: {
                  text2: "Please check your email to reset password"
                },
                topOffset: 16,
                autoHide: true,
                visibilityTime: 2000,
              });
            navigation.navigate('MyAccount');
        }

    },[resetPasswordData, formErrors])

    React.useEffect(() => {
        if(checkList.email) {
            setButtonStatus(true)
        }
        else setButtonStatus(false)
    }, [checkList])
    const [buttonStatus, setButtonStatus]= React.useState(false);

    return(
        <TouchableOpacity 
            onPress={() => Keyboard.dismiss()}
            activeOpacity={1}
            style={styles.forgotPassPageContainer}>
            <Spinner visible={isLoading} animDuration={750}/>
            <Formik
                initialValues={{ email: ''}}
                onSubmit={values => {
                    handleFormSubmit({email: values.email});
                    Keyboard.dismiss();
                }  
                }
            >
                {({ handleChange, handleSubmit }) => (
                <View >
                    <Text style={styles.titleForgotPassPage}>{Identify.__('ENTER YOUR EMAIL')}</Text>
                    <FloatingInput
                        inputKey='email' 
                        lable="Email"
                        type='email'
                        req={false}
                        handleChange={handleChange}
                        value={null}
                        listRef={listRef}
                        isSignIn={true}
                        setCheckList={setCheckList}
                    />
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        disabled={buttonStatus ? false : true}
                        style={[styles.resetPassButton , {backgroundColor: buttonStatus ? Constants.button.color.primary : Constants.button.color.disabled}]}>
                        <Text style={styles.resetPassText}>{Identify.__('Reset my password')}</Text>
                    </TouchableOpacity>
                </View>
                )}
            </Formik>
        </TouchableOpacity>
    )
}

export default ForgotPass;