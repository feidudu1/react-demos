import React, {Component} from 'react'
import './header.less'

export default class Progress extends Component {
    render() {
        return (
            <div className="component-progress row">
                {this.props.progress} s
            </div>
        )
    }
}
