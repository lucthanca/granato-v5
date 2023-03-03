import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { useCallback } from "react";
import operations from "./useAddressBook.gql";

export const useAddressBook = (props) => {
    const {listAddresses, getCountryName, deleteAddress, getAllCountries, addAddress, updateAddress} = operations
    const [getListAddr, { data: customerData, loading: getListAddressesLoading }] = useLazyQuery(listAddresses, {fetchPolicy: 'no-cache'});
    const {data: getCountries, loading: getCountriesLoading} = useQuery(getAllCountries);
    
    const [getCountryData, { data: countryData, loading: getCountryDataLoading }] = useLazyQuery(getCountryName);
    const [removeAddress, {data: removeAddressNoti, loading: removeAddressLoading, error: removeError}] = useMutation(deleteAddress)
    const [addAddressBook, {data: addAddressBookData, loading: addAddressBookLoading, error: addAddressBookError}] = useMutation(addAddress)
    const [updateAddressBook, {data: updateAddressBookData, loading: updateAddressBookLoading, error: updateAddressBookError}] = useMutation(updateAddress)

    return {
        listAddresses: customerData ? customerData.customer.addresses : null,
        country: countryData ? countryData.country : null,
        getListAddressesLoading,
        getCountryDataLoading,
        getCountries,
        getCountriesLoading,
        removeAddressLoading,
        removeAddressNoti,
        removeError,
        addAddressBookData,
        addAddressBookLoading,
        addAddressBookError,
        updateAddressBookData,
        updateAddressBookLoading,
        updateAddressBookError,
        getListAddr,
        removeAddress,
        getCountryData,
        addAddressBook,
        updateAddressBook
    }
}

export default useAddressBook;