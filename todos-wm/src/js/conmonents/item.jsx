import React, { Component } from 'react'

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            edit:'',
            val:''
        }
        this.onEnterKeyCode=this.onEnterKeyCode.bind(this);
        this.changeEdit=this.changeEdit.bind(this);
        this.changeVal=this.changeVal.bind(this);
        this.onEscKeyCode=this.onEscKeyCode.bind(this);
        this.onBlur=this.onBlur.bind(this);
    }
    //双击出现编辑框
    changeEdit(){
        let {todo} = this.props;
        let {input1} = this.refs;
        this.setState({
            edit:'editing',
            val:todo.value
        },(ex=>{
            input1.focus();
        }))
        
    }
    //改变input值
    changeVal(ev){
        let {val} = this.state;
         this.setState({
             val:ev.target.value
         })
    }
    // 回车改变todo的值，并数去焦点
    onEnterKeyCode(ev){
        let {todo,changeTodoValue} = this.props;
       if(ev.keyCode!==13) return ;
        changeTodoValue(todo,ev.target.value)
        this.setState({
            edit:""
        })
      }
      onEscKeyCode(ev){
        let {todo} = this.props;
       if(ev.keyCode!==27) return ;
        this.setState({
            edit:"",
            val:todo.value
        })
      }
      onBlur(ev){
        let {todo,changeTodoValue} = this.props;
        
         changeTodoValue(todo,ev.target.value)
         this.setState({
             edit:""
         })
      }
    render() {
        let {todo,removeTodo,toggleSelf,changeTodoValue} = this.props;
        let {changeEdit,onEnterKeyCode,changeVal,onEscKeyCode,onBlur} = this;
        let {edit,val} = this.state;
        if(todo.completed){
            edit+=" completed"
        }
        return (
            <li className={edit}>
                <div className="view">
                    <input 
                    type="checkbox" 
                    checked={todo.completed}
                    className="toggle"
                    onChange={ex=>{
                        toggleSelf(todo,ex.target.checked)
                    }}
                    />
                    <label
                    onDoubleClick={changeEdit}
                    >
                        {todo.value}
                    </label>
                    <button 
                    className="destroy"
                    onClick={ex=>{
                        removeTodo(todo)
                    }}
                    ></button>
                </div>
                <input
                value={val}
                ref="input1"
                type="text" 
                className="edit"
                onChange={changeVal}
                onKeyDown={onEnterKeyCode}
                onKeyUp={onEscKeyCode}
                onBlur={onBlur}
                />
            </li>
        
    )
        
    }
}
