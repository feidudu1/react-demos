import React, {Component} from 'react'
import './MusicListItem.less'

export default class MusicListItem extends Component {
    render(){
        let musicItem = this.props.musicItem;
        return (
            <li className={`component-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto delete"></p>
            </li>
        )
    }
}
