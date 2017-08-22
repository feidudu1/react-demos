import React from 'react'
import ReactDOM from 'react-dom';
import Header from '../components/header'
import Progress from '../components/progress'

ReactDOM.render(
    <div>
        <Header />
        <Progress progress="2"></Progress>
    </div>
    ,
    document.getElementById('root')
)
