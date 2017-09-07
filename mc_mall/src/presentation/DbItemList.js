import React, {Component} from 'react';
import DbItem from './DbItem'

const DbItemList = ({productListData}) => {
    let itemlist = null;
    itemlist = productListData.map((item,index) => {
        return (
            <DbItem
                key={index}
                productData={item}
            />
        )
    })
    return (
        <ul>
            {itemlist}
        </ul>
    )
}

export default DbItemList;
