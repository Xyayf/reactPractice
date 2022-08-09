export function setItem(key,val){
    let value=val
    if(typeof val==='object'&& val!==null){
      value=JSON.stringify(val)
    }
    return window.localStorage.setItem(key,value)
}

export function getItem(key){
    const val=window.localStorage.getItem(key)
    try{
        return JSON.parse(val)
    }catch(err){
        return val
    }
}

export function removeItem(key){
    window.localStorage.removeItem(key)
}

export function clearAll(){
    window.localStorage.clear()
}