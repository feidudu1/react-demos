import React, {Component} from 'react'
import Header from '../components/header'
import Player from '../page/Player'

export default class Root extends Component {
    componentDidMount(){
        $('#player').jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia',{
                    mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    };
    componentWillUnMount(){
    };
    render(){
        return (
            <div>
                <Header />
                <Player />
            </div>
        )
    };
}
