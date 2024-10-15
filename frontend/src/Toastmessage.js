import {toast} from 'react-toastify';


export const handleSucess=(msg) =>{
  toast.success(msg,{
    position:'top-right',
    style:{backgroundColor:'green',color:'white'}
  })
}

export const handleError=(msg)=>{
  toast.error(msg,{
    position:'top-right',
    style:{backgroundColor:'red',color:'white'}
  })
}