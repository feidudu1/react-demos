import React, {Component} from 'react'
import './header.less'

export default class Header extends Component {
    render() {
        return (
            <div className="component-header row">
                <img src="/static/images/logo.png" alt="" width="40" className="-col-auto"/>
                <h1 className="caption">React music player</h1>
            </div>
        )
    }
}
