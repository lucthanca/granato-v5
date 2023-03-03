import { FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import GalleryItem from './item';
const md5 = require('md5');
import { NativeBaseProvider, Spinner } from "native-base";
// import { Spinner } from 'native-base';
const Gallery = (props) => {
    const {
        showGrid = true,
        isLoadMore = false, data = [], refesh = false, handleRefesh = () => { }, handleLoadMore = () => { }, loadMore = true } = props;
    const loadingFooter = React.useMemo(() => {
        if (isLoadMore) {
            return <ActivityIndicator />;
        }
        else {
            return null;
        }
    }, [isLoadMore]);
    const galleryItems = React.useMemo(() => {
        return (
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (<GalleryItem item={item} index={index} showGrid={showGrid} />)
                }}
                keyExtractor={(item) => md5(JSON.stringify(item?.id + Math.random() * 100000))}
                numColumns={showGrid ? 2 : 1}
                key={showGrid ? 'TWO COLUMN' : 'ONE COLUMN'}
                initialNumToRender={15}
                onRefresh={() => handleRefesh()}
                refreshing={refesh}
                onEndReached={() => {
                    if (loadMore) {
                        handleLoadMore();
                    }
                }}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={loadingFooter}

            />
        )
    }, [refesh, loadMore, handleLoadMore, handleRefesh, data, showGrid]);
    return (
        // <NativeBaseProvider>
        //     {galleryItems}
        // </NativeBaseProvider>
        <>
            {galleryItems}
        </>
    )
}

export default Gallery