let One=()=>{
    return <div>hello,world！！</div>
}
let Two=()=>{
  return  <div>你好,世界！！</div>
}
let Thre=()=>{
  return  <div>努力，努力，再努力！！</div>
}
const InShow=(props)=>{
      switch (props.type){
       case '1':return <One />
      
       case '2':return <Two />
       
       case '3':return <Thre />
       
    }
  } 
   
  export default InShow