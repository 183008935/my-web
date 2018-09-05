import React, { Component } from 'react';
import Item from './item';
import Footer from './footer';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            todoDatas:JSON.parse(window.localStorage.getItem("todo-wm")),
            todoNum:JSON.parse(localStorage.getItem("todo-wm")).length
        }
        this.insertTodos=this.insertTodos.bind(this);
        this.removeTodo=this.removeTodo.bind(this);
        this.toggleAllTodos=this.toggleAllTodos.bind(this);
        this.toggleSelf=this.toggleSelf.bind(this);
        this.clearCompletedTodos=this.clearCompletedTodos.bind(this);
        this.changeTodoValue=this.changeTodoValue.bind(this);
    }
     //添加todo
    insertTodos(ev){
          let {todoDatas} = this.state;
          if(ev.keyCode!==13) return ;
          let value = ev.target.value.trim();
          if(value.length===0) return ;
          let todo={};
          todo.value=value;
          todo.id=new Date().getTime();
          todo.completed=false;
          todoDatas.push(todo);
          this.setState({
              todoDatas:todoDatas,
              todoNum:todoDatas.length
          })
          
          let localData=JSON.stringify(todoDatas);
          window.localStorage.setItem("todo-wm",localData);
          ev.target.value="";
    }
    //删除todo
     removeTodo(todo){
        let {todoDatas,todoNum} = this.state;
       todoDatas=todoDatas.filter(elt=>{
           return todo.id!==elt.id
       })
          let localData=JSON.stringify(todoDatas);
          window.localStorage.setItem("todo-wm",localData);
          this.setState({
            todoDatas:todoDatas,
            todoNum:JSON.parse(localStorage.getItem("todo-wm")).length
        })
     }   
      
    //  全选功能
    toggleAllTodos(ev){
       let {todoDatas} = this.state;
       todoDatas.map(elt=>{
         elt.completed=ev.target.checked;
         return elt;
       })
       this.setState({
           todoDatas:todoDatas
       })
       let localData=JSON.stringify(todoDatas);
       window.localStorage.setItem("todo-wm",localData);
    }

    //单选
    toggleSelf(todo,status){
        let {todoDatas} = this.state;
        todoDatas=todoDatas.map(elt=>{
            if(todo.id === elt.id){
                elt.completed=status
            }
            return elt;
        })
        this.setState({
            todoDatas:todoDatas
        })
        let localData=JSON.stringify(todoDatas);
        window.localStorage.setItem("todo-wm",localData);
    }

    //清除completed为true的todos
    clearCompletedTodos(){
          let {todoDatas} = this.state;
          todoDatas=todoDatas.filter(elt=>{
             return !elt.completed
          })
          this.setState({
              todoDatas:todoDatas,
              todoNum:todoDatas.length
          })
          let localData=JSON.stringify(todoDatas);
          window.localStorage.setItem("todo-wm",localData);
    }
    //编辑todos
    changeTodoValue(todo,value){
         let {todoDatas} = this.state;
         todoDatas=todoDatas.map(elt=>{
             if(todo.id === elt.id){
                 elt.value=value
             }
             return elt;
         })
         this.setState({
             todoDatas:todoDatas
         })
         let localData=JSON.stringify(todoDatas);
         window.localStorage.setItem("todo-wm",localData);
    }
    // 渲染
    render() {
        let {todoDatas,todoNum} = this.state;
        let {location:{pathname}} = this.props;
        let {insertTodos,removeTodo,toggleAllTodos,toggleSelf,clearCompletedTodos,changeTodoValue} = this;
        let items=null;
        items=todoDatas.filter(elt=>{
                switch(pathname){
                    case "/active" :
                    return !elt.completed;
                    break;
                    case "/completed" :
                    return elt.completed;
                    break;
                    default :
                    return true;
                }
        })
        items = items.map((elt,index)=>{
            if(elt.completed){todoNum--}
            return(
                //Item组建传值
                <Item
                todo={elt}
                key={index}
                removeTodo={removeTodo}
                toggleSelf={toggleSelf}
                changeTodoValue={changeTodoValue}
                />
                 )
        })
        let footer=null;
        if(todoDatas.length>0){
            footer = (
                <Footer 
                todoDatas={todoDatas}
                pathname={pathname}
                clearCompletedTodos={clearCompletedTodos}
                todoNum={todoNum}
                />
            )
        }
        return (
            <div className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input 
                    placeholder="Please Type someThing Here?????"
                    type="text" 
                    
                    className="new-todo"
                    onKeyDown={insertTodos}
                     />
                </header>
                <section className="main">
                     <input 
                     type="checkbox" 
                     checked={todoNum===0?true:false}
                     className={todoDatas.length===0?'none':'toggle-all'}
                     
                     onChange={toggleAllTodos}
                      />
                     <ul className="todo-list">
                        {items}
                     </ul>
                </section>
                {footer}
            </div>
        )
    }
}
