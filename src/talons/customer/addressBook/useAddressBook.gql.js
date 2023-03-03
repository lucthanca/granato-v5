import { gql } from '@apollo/client';

export const LIST_ADDRESSES = gql`
    query listAddresses{
        customer {
            addresses {
                city
                company
                country_code
                fax
                firstname
                id
                lastname
                postcode
                region{
                    region
                    region_id
                }
                region_id
                street
                suffix
                telephone
            }
        }
    }
`;

export const GET_COUNTRY_NAME = gql`
    query getCountryName($id: String!){
        country(id: $id) {
            full_name_locale
            id
            available_regions {
                code
                id
                name
            }
        }
    }
`;

export const DELETE_ADDRESS = gql`
    mutation deleteAddress($id: Int!){
        deleteCustomerAddress(id: $id)
    }
`;
export const GET_ALL_COUNTRIES = gql`
    query getAllCountries{
        countries {
            full_name_locale
            id
        }
    }
`;
export const ADD_ADDRESS = gql`
mutation addAddress(
    $region: String!, 
    $country_code: CountryCodeEnum!,
    $telephone: String!,
    $postcode: String!,
    $company: String!,
    $city: String!,
    $firstname: String!,
    $lastname: String!,
    $fax: String!
    $region_id: Int
    $street: [String!]){
    createCustomerAddress(input: {
        region: {
            region: $region
            region_id: $region_id
            },
        country_code: $country_code,
        street: $street,
        telephone: $telephone,
        postcode: $postcode,
        city: $city,
        firstname: $firstname,
        lastname: $lastname,
        fax: $fax,
        company: $company
    }) {
        city
        company
        country_code
        fax
        firstname
        id
        lastname
        postcode
        region {
            region
            region_id
        }
        street
        telephone
    }
}
`;

export const UPDATE_ADDR = gql`
mutation updateAddress(
    $id: Int!
    $region: String!, 
    $country_code: CountryCodeEnum!,
    $telephone: String!,
    $postcode: String!,
    $company: String!,
    $city: String!,
    $firstname: String!,
    $lastname: String!,
    $fax: String!
    $region_id: Int
    $street: [String!]){
    updateCustomerAddress(id: $id, input: {
        region: {
            region: $region
        region_id: $region_id
        },
        country_code: $country_code,
        street: $street,
        telephone: $telephone,
        postcode: $postcode,
        city: $city,
        firstname: $firstname,
        lastname: $lastname,
        fax: $fax,
        company: $company
    }) {
      city
      company
      country_code
      fax
      firstname
      id
      lastname
      postcode
      region {
        region
        region_id
      }
      street
      telephone
    }
  }  
`;

export default {
    listAddresses: LIST_ADDRESSES,
    getCountryName: GET_COUNTRY_NAME,
    deleteAddress: DELETE_ADDRESS,
    getAllCountries: GET_ALL_COUNTRIES,
    addAddress: ADD_ADDRESS,
    updateAddress: UPDATE_ADDR
}