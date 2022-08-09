import connects from '../../utill/connect'
import variableWhite from '../../styles/variable-white'
import variableRed from '../../styles/variable-red'
import variable from '../../styles/variable'
import {useCallback} from 'react'
const thems={
    white:'white',
    red:'red',
    dark:'dark'
}
function Them(props){
    let flag=true
    
    const {setThem,them}=props
    console.log(them,'每一次都要执行一次吗')
    const themMap={
        [thems.white]:{
            title:'白色',
            file:variableWhite
        },
        [thems.red]:{
            title:'红色',
            file:variableRed
        },
        [thems.dark]:{
            title:'默认',
            file:variable
        }
    }
    // const [s,setS]=useState(1)
    function changeThem(event,them){
        console.log(event)
        setThem(them)
        // setS((pre)=>pre+1)

    }
    const a=useCallback(()=>{
        console.log(flag)
        flag=false
        return them
    },[them])()
    console.log(a)
    // useEffect(()=>{
       
    //     a()
    //     // return function(){
    //     //     console.log(them)
    //     // }
        
    // },[a])
    // useEffect(()=>{

    //     console.log('主题变了','s变了',them,s)
        
        
    // })
   
    // useEffect(()=>{
    //     function a(){
    //         console.log('s变了',s)
    //     }
    //     a()
    //     return function (){
    //         console.log(s)
    //     }
    // },[s])
    return (
        <div>
            {Object.keys(themMap).map(key=>{
                return (<button key={key}
                    onClick={(event)=>{changeThem(event,key)}}
                        >{key}</button>
                    
                    )
            })}
        </div>
    )

}
export default connects(Them)
