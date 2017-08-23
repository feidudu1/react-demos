import React, {Component} from 'react'
import Progress from '../components/progress'
import './player.less'

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
            <div className="player-page">
                <h1 className="caption">我的私人音乐坊 &gt;</h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title"></h2>
                		<h3 className="music-artist mt10"></h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev"></i>
	                			<i ></i>
	                			<i className="icon next ml20"></i>
                			</div>
                			<div className="-col-auto">
                				<i ></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img />
                	</div>
                </div>
            </div>
        )
    };
}
