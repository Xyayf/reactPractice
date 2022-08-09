import {connect} from 'react-redux'
import actions from '../redux/actions'
import {bindActionCreators} from'redux'

export default function connects(target){
        return connect((state)=>state,(dispatch)=>bindActionCreators(actions,dispatch))(target)
}