import React, {Component} from 'react'
import Header from '../components/header'
import Progress from '../components/progress'

let duration;
export default class Root extends Component {
    constructor() {
        super();
        this.state = {
            progress: '-'
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
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        })
    };
    componentWillUnMount(){
        $('#jPlayer').unbind($.jPlayer.event.timeupdate);  // 解除绑定，否则重新进入又会绑定一次
    };
    progressChangeHandler(progress){
           $('#player').jPlayer('play', duration * progress);
    };
    render(){
        return (
            <div>
                <Header />
                <Progress
                    progress={this.state.progress} onProgressChange={this.progressChangeHandler}
                    barColor="#ff0000"
                >
                </Progress>
            </div>
        )
    };
}
