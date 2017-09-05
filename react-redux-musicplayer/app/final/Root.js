import React, {Component} from 'react'
import Header from '../components/header'
import Player from '../page/Player'
import MusicList from '../page/musiclist'
import { MUSIC_LIST } from '../config/musiclist'  // 没有default时，要用大括号扩起来
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'


class App extends Component {
    constructor(){
        super();
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST
        }
    };
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
        Pubsub.subscribe('DELETE_MUSIC',(msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            })
        });
        Pubsub.subscribe('PLAY_MUSIC',(msg, musicItem) => {

        });
    };
    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
    };
    render(){
        return (
            <div className="container">
                <Header />
                { React.cloneElement(this.props.children, this.state) }
            </div>
        )
    };
}

export default class Root extends Component {
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </Route>
            </Router>
        )
    }
}
