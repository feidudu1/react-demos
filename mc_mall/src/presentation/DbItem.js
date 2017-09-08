import React, {Component} from 'react';
import '../assets/block/DbItem.less'

const DbItem = ({productListData}) => {
    console.log(productListData);
    return (
        <li>
            <a href={productListData.targetUrl}>
                <div className="pro-img">
                    <img src={productListData.imageUrl} alt=""/>
                </div>
                <p className="item-title">{productListData.text}</p>
                <div className="price-box">
                    <span className="price">{(productListData.wirelessPrice/100).toFixed(2)}</span>
                    <span className="original-price">{(productListData.marketPrice/100).toFixed(2)}</span>
                </div>
            </a>
        </li>
    )
}

export default DbItem;
