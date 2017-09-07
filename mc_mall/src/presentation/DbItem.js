import React, {Component} from 'react';
import '../assets/block/DbItem.less'

const DbItem = ({productData}) => {
    return (
        <li>
            <a href={productData.targetUrl}>
                <p className="item-title"></p>
                {productData.text}
            </a>
        </li>
    )
}

export default DbItem;
