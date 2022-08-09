import {Fragment} from 'react'
import {Outlet} from 'react-router-dom'
import {connect} from 'react-redux'
import SideBar from './sideBar'
import Them from '../../component/them'
import style from './index.module.scss'
import CSSModules from 'react-css-modules'
function Layout (props){
    console.log(props,'layout')
    return (
        <Fragment>
            <SideBar/>
            <h2 styleName="name">这里是layout</h2>
            <Them />
                <Outlet/>
        </Fragment>
    )

}

export default connect()(CSSModules(Layout, style, {
    allowMultiple: true //允许多个class一起使用
}))
