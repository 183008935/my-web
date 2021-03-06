import PT from 'prop-types';
let propTtype ={
    todo:PT.object,
    onDestroy:PT.func,
    onToggle:PT.func,
    itemEditDone:PT.func
}
export default class Ietm extends React.Component{
    constructor(){
        super();
        this.local = localStorage;
        this.state={
            inEdit:false,
            val:""
        }
        this.onEdit=this.onEdit.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.onEnter=this.onEnter.bind(this);
        this.itemEditDone=this.itemEditDone.bind(this);
        this.inputChange=this.inputChange.bind(this);
        this.onKeyUp=this.onKeyUp.bind(this);
    }
     inputChange(ev){
         this.setState({
             val:ev.target.value
         })   
     }
    itemEditDone(){ 
        this.setState({
            inEdit:false
        })      
       let {itemEditDone,todo}=this.props;
       
       itemEditDone(todo,this.state.val);    
    }
   onBlur(){
       
      this.itemEditDone();
   
   }
   onEnter(ev){
    if(ev.keyCode!==13) return;
    this.itemEditDone();  
   }
   onKeyUp(ev){
    
    if(ev.keyCode !==27)return;
    let {value}=this.props.todo;
    this.setState({
        inEdit:false,
        val:value
    });
    
}
    onEdit(){
        let {value}=this.props.todo;
        
        this.setState({
            inEdit:true,
            val:value
        },()=>this.refs.editInput.focus());     
    }
   
    render(){
 
        // console.log(this.refs.editInput,"render")

        let {onEdit,onBlur,onEnter,inputChange,onKeyUp}=this;

        let {todo,onDestroy,onToggle}=this.props;

        let {inEdit,val}=this.state;
       
        

        let intemClassName=todo.hasCompleted?"completed":"";

        if(inEdit){
            intemClassName+=' editing'
        }

        return(
            <li className={intemClassName}>
                <div className="view">
                    <input type="checkbox" 
                    className="toggle"
                    checked={todo.hasCompleted}
                    onChange={(ev)=>onToggle(todo)}
                    />
                    <label
                      onDoubleClick={onEdit} 
                    >
                     {todo.value}
                    </label>
                   <button className="destroy" onClick={(ev)=>onDestroy(todo)}
                   ></button>
                </div>
                 <input 
                 type="text"
                  className="edit"
                  value={val}
                  onBlur={onBlur}
                  onKeyDown={onEnter}
                  onKeyUp={onKeyUp}
                  onChange={inputChange}
                  ref="editInput"
                  />
            </li>
        )
    }
}
Ietm.propTtype=propTtype;