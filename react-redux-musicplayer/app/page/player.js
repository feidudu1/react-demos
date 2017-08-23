import React, {Component} from 'react'
import Header from '../components/header'
import Progress from '../components/progress'

let duration = null;
export default class Player extends Component {
    constructor() {
        super();
        this.state = {
            progress: '-'
        }
    };
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            })
        })
    };
    componentWillUnMount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
    };
    progressChangeHandler(progress){
           $('#player').jPlayer('play', duration * progress);
    };
    render(){
        return (
            <div>
                <Progress
                    progress={this.state.progress} onProgressChange={this.progressChangeHandler}
                    barColor="#ff0000"
                >
                </Progress>
            </div>
        )
    };
}
