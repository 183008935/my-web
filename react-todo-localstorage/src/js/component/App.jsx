require('../../css/index.css');
require('../../css/app.css');
import Ietm from './Ietm';
import Footer from './Footer';

class App extends React.Component{
    constructor(){
      super();
      this.local=localStorage;
      if(!this.local.getItem('react-todos')){
        local=JSON.parse(this.local.setItem("react-todos"));
    }  
      this.state={
        local: [] || this.local.getItem('react-todos'),
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
    itemEditDone(todo,value){

      let {local}=this.state;
      local=JSON.parse(this.local.getItem('react-todos'));
      
      local=local.map(elt=>{
       
           if(todo.id===elt.id){
                
             elt.value=value;  
           } 
           return  elt ;
      }) 
      if(todo.value==""){
        local=local.filter(elt=>{
            return elt.id!==todo.id
        })
    }
      this.setState({local})
      this.local.setItem('react-todos',JSON.stringify(local));
}

    keyDownPost(ev){

      if(ev.keyCode!==13){return  };

      let {inputVal}=this.state;

      let value=inputVal.trim();

      if(value===''){return};

      let todo={};

      todo.id = new Date().getTime();

      todo.value=value;

      todo.hasCompleted=false;
      // localStorage.setItem('react-todos',JSON.stringify({id:todo.id,value:todo.value,hasCompleted:todo.hasCompleted}))
      let {local}=this.state;
      local=JSON.parse(this.local.getItem('react-todos'));
      local.push(todo);
     
      this.setState({
        local:this.local,
        inputVal:''
      }) 
      this.local.setItem('react-todos',JSON.stringify(local))
      // this.local.setItem('react-todos',JSON.stringify(local))
   }
   
    onclearCompleted(){

      let {local}=this.state;
      local=JSON.parse(this.local.getItem('react-todos'));
      local=local.filter((elt)=>{

          return  !elt.hasCompleted;
      })

      this.setState({local}) 
      this.local.setItem('react-todos',JSON.stringify(local));
      
      // localStorage.clear();
    }
  
changeView(view){

 this.setState({view});
 
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
  // this.local.setItem('react-todos', JSON.stringify({id:elt.id,value:elt.value,hasCompleted:elt.hasCompleted}))
    this.local.setItem('react-todos',JSON.stringify(local));
    elt.hasCompleted=checked;
  
   return elt;
 }); 
  this.local.setItem('react-todos',JSON.stringify(local));
  this.setState({local});


 
}
onToggle(todo){

      let {local}=this.state;

      local= JSON.parse(this.local.getItem('react-todos'));
      local=local.map(elt=>{

       if(elt.id===todo.id){ 

         elt.hasCompleted=!elt.hasCompleted;
       }  
       return elt;
 
 });
this.local.setItem('react-todos',JSON.stringify(local));

this.setState({local})
 
}

onDestroy(todo){

 let {local}=this.state;
 local= JSON.parse(this.local.getItem('react-todos'));
 local=local.filter((elt)=>{
   
     return  elt.id!==todo.id
 })
 
  this.setState({local}); 
  this.local.setItem('react-todos',JSON.stringify(local));
}

componentWillMount(){

}

  componentDidMount(){
 
  }

    render(){
      let {keyDownPost,onDestroy,onclearCompleted,inputChange,toggleAll,onToggle,changeView,itemEditDone}=this;
     
      let {local,inputVal,view}=this.state;
     
      //  if(local===null){
      //   this.local.setItem('react-todos',JSON.stringify(local));
      // }
     

      let items=null,footer=null,itemsBox=null; 
      
       // this.local.setItem('react-todos',JSON.stringify(local)) 
       local=JSON.parse(this.local.getItem('react-todos')); 

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
     
    
      items=items.map((elt,i)=>{
        // this.local.setItem('react-todos',JSON.stringify(local)) 
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

         <div className="todoapp">
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
  