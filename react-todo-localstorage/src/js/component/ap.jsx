require('../../css/index.css');
require('../../css/app.css');
import Ietm from './Ietm';
import Footer from './Footer';

class App extends React.Component{
  
    constructor(){
      super();
      this.local = localStorage;
      this.state={
        local:[],
        inputVal:'',
        view:'all'
      }
      
      this.keyDownPost=this.keyDownPost.bind(this);
      this.onDestroy=this.onDestroy.bind(this);
      this.onclearCompleted=this.onclearCompleted.bind(this);
      this.inputChange=this.inputChange.bind(this);
      this.toggleAll=this.toggleAll.bind(this);
      this.onToggle=this.onToggle.bind(this);
      this.changeView=this.changeView.bind(this);
      this.itemEditDone=this.itemEditDone.bind(this);
     
    }
    
    keyDownPost(ev){
      if(ev.keyCode!==13){return };
      let {inputVal}=this.state;
      let value=inputVal.trim();
      if(value===''){return};
      let todo={};
      todo.id = new Date().getTime();
      todo.value=value;
      todo.hasCompleted=false;
      
      // todo = JSON.parse(localStorage.getItem(todo.id));
      let {local}=this.state;
      local.push(todo);
      // this.local.setItem('react-todos',JSON.stringify(local));
      // local= JSON.parse(this.local.getItem('react-todos'));
      this.setState({
        local:local,
        inputVal:''
      })
      // this.local.setItem('react-todos',JSON.stringify(local));
      // console.log(this.state.local)
    //  this.local.setItem(todo.id,JSON.stringify([todo.value,todo.hasCompleted]));
     
   }
   
    onclearCompleted(){
      let {local}=this.state;
      // this.local.setItem('react-todos',JSON.stringify(local));
      // local= JSON.parse(this.local.getItem('react-todos'));
      local=local.filter((elt)=>{
         if(elt.hasCompleted===true){        
            this.local.removeItem(elt.id);    
           }
          return  !elt.hasCompleted;
      })
      this.setState({local:local}) 
      this.local.setItem('react-todos',JSON.stringify(this.state.local));
        // this.local.clear();
    }
    itemEditDone(todo,value){
      let {local}=this.state;
      local=local.map(elt=>{
           if(todo.id===elt.id){
             elt.value=value;
           } 
          //  this.local.setItem('react-todos',JSON.stringify({id:elt.id,value:elt.value,hasCompleted:elt.hasCompleted}))
           return elt;
      })
  
   // this.local.setItem('local',JSON.stringify(local));
}
changeView(view){
 this.setState({view})
}
inputChange(ev){
 this.setState({
   inputVal:ev.target.value
 })
}
toggleAll(ev){
 let {checked}=ev.target;
 let {local}=this.state;
 local=JSON.parse(this.local.getItem('react-todos'));
 local = local.map(elt=>{
   elt.hasCompleted=checked;
  //  this.local.setItem('react-todos', JSON.stringify({id:elt.id,value:elt.value,hasCompleted:elt.hasCompleted}))
  //  this.local.setItem('local',JSON.stringify(local));
   return elt;
 });
 this.setState({local:local});
 this.local.setItem('react-todos',JSON.stringify(this.state.local));
}
onToggle(todo){
 let {local}=this.state;
this.local.setItem('react-todos',JSON.stringify(local));
local= JSON.parse(this.local.getItem('react-todos'));
this.setState({local:local})
      local=local.map(elt=>{
       if(elt.id===todo.id){ 
         elt.hasCompleted=!elt.hasCompleted;
        // this.local.setItem('todo.id', JSON.stringify({id:elt.id,value:elt.value,hasCompleted:elt.hasCompleted}))
       // this.local.setItem('local',JSON.stringify(local));
       }  
       return elt;
 });
this.setState({local:local})
}

onDestroy(todo){
 let {local}=this.state;
 local= JSON.parse(this.local.getItem('react-todos'));
 this.setState({
   local:local
 })
 local=local.filter((elt)=>{
     return  elt.id!==todo.id
 })
 this.local.removeItem(todo.id);
 this.setState({local:local});
 this.local.setItem('react-todos',JSON.stringify(this.state.local));
}
    render(){
     
      let {keyDownPost,onDestroy,onclearCompleted,inputChange,toggleAll,onToggle,changeView,itemEditDone}=this;
     
      let {local,inputVal,view}=this.state;
     
      let items=null,footer=null,itemsBox=null;
  
      let leftCount=local.length;

      items=local.filter(elt=>{
        if(elt.hasCompleted){leftCount--};
        switch(view){
          case 'active':
          return !elt.hasCompleted;
          case 'completed':
          return  elt.hasCompleted;
          default:return true;
        }
      })
      this.local.setItem('react-todos',JSON.stringify(local));
      local= JSON.parse(this.local.getItem('react-todos'));
      items=local.map((elt,i)=>{
        // local= JSON.parse(this.local.getItem('react-todos'));
        return <Ietm {
          ...{
            onDestroy,
            todo:elt,
            onToggle,
            itemEditDone
  
          }}
          key={i}
        />
      });
       if(local.length){
         itemsBox = (
          <section className="main">
          <input type="checkbox"
           className="toggle-all"
           onChange={toggleAll}
           checked={leftCount===0}
          
          />
          <ul className="todo-list">
            {items}
          </ul>
          </section>
  
         )
        footer =(<Footer 
             {...{
               leftCount,
               showClearBtton:leftCount<local.length,
               onclearCompleted,
               changeView,
               view
             }}
          />)
       }
        
      return(
         <div>
           <header className="header">
             <h1>钟声-todos</h1> 
             <input type="text"  
              className="new-todo"
              placeholder="您需要做什么？"
              value={inputVal}
              onChange={inputChange}
              onKeyDown={keyDownPost}
              // onClick={handleClick}
              
              />
           </header>
            {itemsBox}
            {footer}
         </div>
      )
    }
  }
  export default App;
  