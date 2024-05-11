import { gql } from '@apollo/client';

export const GET_HELLO = gql`
  query GetHello {
    hello { message }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products { name, id }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!) {
    addProduct(name: $name) { name, id }
  }
`;

export const ADD_CONTRACT = gql`
  mutation AddContract($firstName: String!, $lastName: String!, $email: String!) {
    addContract(firstName: $firstName, lastName: $lastName, email: $email) { id }
  }
`;

export const SIGN_CONTRACT = gql`
  mutation SignContract($id: String!) {
    signContract(id: $id) { id, signed }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: String!) {
    removeProduct(id: $id)
  }
`;

export const PRODUCT_ADDED_SUBSCRIPTION = gql`
  subscription OnProductAdded {
    productAdded { name, id }
  }
`;
