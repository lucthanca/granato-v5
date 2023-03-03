import { useMutation } from "@apollo/client";
import { useEffect, useState, useCallback } from "react";
import { REQUEST_PASSWORD_RESET_EMAIL_MUTATION } from "./forgotPassword.gql";

export const useForgotPassword = props => {

    const [hasCompleted, setCompleted] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState(null);

    const [
        requestResetEmail,
        { error: requestResetEmailError, loading: isResettingPassword, data }
    ] = useMutation(REQUEST_PASSWORD_RESET_EMAIL_MUTATION);

    // useEffect(()=>{
    //     if(isResettingPassword){
    //     console.log("loading...");
    //     }
    //     else if(!isResettingPassword && data){
    //     console.log('data:', data)
    //     }
    //     if(requestResetEmailError){
    //         console.log('requestResetEmailError: ', requestResetEmailError)
    //     }
    // },[isResettingPassword, data, requestResetEmailError])

    const handleFormSubmit = useCallback(
        async ({ email }) => {
            try {
                await requestResetEmail({
                    variables: { email },
                });

                setForgotPasswordEmail(email);
                setCompleted(true);
            } catch (error) {
                // Error is logged by apollo link - no need to double log.

                setCompleted(false);
            }
        },
        [ requestResetEmail]
    );

    return {
        forgotPasswordEmail,
        formErrors: requestResetEmailError,
        handleFormSubmit,
        resetPasswordData: data,
        hasCompleted,
        isResettingPassword: isResettingPassword,
    };
};