import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_CATEOGRY, GET_CATEOGRY_ROOT } from './useCategories.gql';

export const useCategories = () => {
    const { data, loading, error } = useQuery(GET_CATEOGRY_ROOT);
    const [getCategory, { data: dataLazy, loading: loadingLazy, error: errorLazy }] = useLazyQuery(GET_CATEOGRY);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSelectCategory = (id) => {
        setSelectedCategory(id)
        getCategory({
            variables: {
                categoryId: id
            }
        })
    };

    const category_id = React.useMemo(() => {
        return selectedCategory;
    }, [selectedCategory])
    const categoryRootData = React.useMemo(() => {
        if (!loading && data) {
            return data?.categoryList[0]?.children;
        } else {
            return null;
        }
    }, [data, loading]);

    const products = React.useMemo(() => {
        return dataLazy?.products ? dataLazy?.products?.items : [];
    }, [dataLazy, loadingLazy])

    const categories = React.useMemo(() => {
        return dataLazy?.categoryList ? dataLazy?.categoryList : [];
    }, [dataLazy])

    React.useEffect(() => {
        if (!selectedCategory && categoryRootData) {
            setSelectedCategory(categoryRootData[0].id);
            getCategory({
                variables: {
                    categoryId: categoryRootData[0].id
                }
            })
        }
    }, [selectedCategory, categoryRootData])

    return {
        categoryRootData,
        loading: loading || loadingLazy,
        selectedCategory,
        products,
        categories,
        handleSelectCategory,
        category_id
    }
}