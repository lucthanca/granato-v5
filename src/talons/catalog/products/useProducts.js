import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_PRODUCTS } from './useProducts.gql';

export const useProducts = props => {
  const { categoryId, filter } = props;
  const [pageSize] = React.useState(12);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [products, setProducts] = React.useState(null);
  const [filterLayers, setFilterLayers] = useState(null);
  const [refesh, setRefesh] = React.useState(false);
  const [filterData, setFilterData] = useState([]);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  const [filterQuery, setFilterQuery] = React.useState({
    category_id: {
      eq: categoryId,
    },
  });
  useEffect(() => {
    if (categoryId) {
      setLoadingGlobal(true);
      setFilterQuery({
        category_id: {
          eq: categoryId,
        },
      });
      setProducts(null);
      setFilterData([]);
      setCurrentPage(1);
      loadGetProducts({
        variables: {
          filter: {
            category_id: {
              eq: categoryId,
            },
          },
          pageSize: pageSize,
          currentPage: 1,
          // sort: sortQuery
        },
      });
    }
  }, [categoryId]);
  const {
    loading,
    error,
    data,
    refetch,
    called: calledData,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {},
      pageSize,
      currentPage: 1,
      sort: {},
    },
  });

  useEffect(() => {
    console.log('calledData: ', calledData);
  }, [calledData]);

  const [loadGetProducts, { called, loading: loadingLazy, data: dataLazy, error: errorLazy }] = useLazyQuery(GET_PRODUCTS);

  useEffect(() => {
    if (filterData.length > 0) {
      setLoadingGlobal(true);
      let newFilterQuery = {
        category_id: {
          eq: categoryId,
        },
      };
      filterData.map(item => {
        if (item.attribute_code == 'price') {
          const newValue = item.value.split('_');
          newFilterQuery[item.attribute_code] = {
            from: newValue[0],
          };
          if (newValue[1] != '*') {
            newFilterQuery[item.attribute_code] = {
              from: newValue[0],
              to: newValue[1],
            };
          }
        } else {
          newFilterQuery[item.attribute_code] = {
            eq: item.value,
          };
        }
      });
      console.log('newFilterQuery: ', newFilterQuery);
      setProducts([]);
      setCurrentPage(1);
      loadGetProducts({
        variables: {
          filter: newFilterQuery,
          pageSize: pageSize,
          currentPage: 1,
          // sort: sortQuery
        },
      });
      setFilterQuery(newFilterQuery);
    } else if (filterData.length == 0) {
      setLoadingGlobal(true);
      setFilterQuery({
        category_id: {
          eq: categoryId,
        },
      });
      setProducts([]);
      setCurrentPage(1);
      loadGetProducts({
        variables: {
          filter: {
            category_id: {
              eq: categoryId,
            },
          },
          pageSize: pageSize,
          currentPage: 1,
          // sort: sortQuery
        },
      });
    }
  }, [filterData, categoryId]);

  React.useEffect(() => {
    console.log('data : ', data);
    console.log(' dataLazy : ', dataLazy);
    console.log('error : ', error);
    console.log('errorLazy : ', errorLazy);
    // if (!dataLazy || refesh && data && data?.products?.items) {
    //   setProducts(data?.products?.items);
    //   setFilterLayers(data?.products?.aggregations);
    // } else
    if (dataLazy && dataLazy?.products?.items) {
      setProducts(prevState => {
        const newState = [...prevState, ...dataLazy?.products?.items].filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        return newState;
      });
      setFilterLayers(dataLazy?.products?.aggregations);
      setLoadingGlobal(false);
    }
  }, [data, dataLazy, refesh, error, errorLazy]);

  React.useEffect(() => {
    if (data && refesh) {
      setRefesh(false);
    }
  }, [data, refesh]);

  const isCanLoadMore = React.useMemo(() => {
    if (!dataLazy && data && data?.products?.items) {
      return data?.products?.total_count > pageSize * currentPage;
    } else if (dataLazy && dataLazy?.products?.items) {
      return dataLazy?.products?.total_count > pageSize * currentPage;
    }
  }, [data, dataLazy]);

  const handleLoadMore = () => {
    if (isCanLoadMore) {
      loadGetProducts({
        variables: {
          filter: filterQuery,
          pageSize,
          currentPage: currentPage + 1,
          sort: {},
        },
      });
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRefetch = () => {
    setRefesh(true);
    // refetch()
  };

  const test = React.useMemo(() => {
    console.log('products: ', products);
    if (products) {
      return products ? products : [];
    }
  }, [products]);
  return {
    loadingGlobal,
    products: test,
    isLoadMore: loadingLazy,
    isLoading: loading,
    isCanLoadMore,
    handleRefetch,
    handleLoadMore,
    refesh,
    filterLayers,
    setFilterData,
    filterData,
  };
};
