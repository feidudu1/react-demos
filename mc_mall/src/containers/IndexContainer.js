import React, {Component} from 'react';
import SearchBar from '../presentation/SearchBar'
import DbItem from '../presentation/DbItem'
import axios from 'axios'
import fetchJsonp from 'fetch-jsonp'

export default class IndexContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            tms: '{}'
        }
    }
    fetchData(cb){
        fetchJsonp('http://tms.mockuai.com/service/json?file=ydxindex&type=jsonp&jsonpCallback=callback',{
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            cb(json);
        }).catch(function (err) {
            console.log(err);
        })
    }
    componentDidMount(){
        this.fetchData(res => {
            this.setState({
                tms: res
            });
        })

    }
    render(){
        var dbItemList = null;
        if (this.state.tms != '{}') {
            var tmsData = JSON.parse(this.state.tms).data.component;
            dbItemList = tmsData.map((itemlist,index) => {
                if (itemlist.valueType == 'product') {
                    var items = itemlist.value.productList;
                    return items.map((item,index) => {
                        return (
                            <DbItem
                                productListData={item}
                                key={index}
                            />

                        )
                    })

                }
            })
            console.log(dbItemList);
        }

        return (
            <div>
                <SearchBar />
                <ul> {dbItemList} </ul>
            </div>
        )
    }
}
