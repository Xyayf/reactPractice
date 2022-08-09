import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../../redux/actions'

function Login (){
    return (
        <h1>这里是登录页面</h1>
    )
}

export default connect(null,dispath=>bindActionCreators(actions,dispath))(Login)
