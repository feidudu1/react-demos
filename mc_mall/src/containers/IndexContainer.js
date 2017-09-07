import React, {Component} from 'react';
import SearchBar from '../presentation/SearchBar'
import DbItemList from '../presentation/DbItemList'
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
            dbItemList = tmsData.map((item,index) => {
                if (item.valueType == 'product') {
                    return (
                        <DbItemList
                            productListData={item.value.productList}
                            key={index}
                        />

                    )
                }
            })
        }

        return (
            <div>
                <SearchBar />
                {dbItemList}
            </div>
        )
    }
}
