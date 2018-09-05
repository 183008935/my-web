import React, { Component } from 'react'
import {Link} from 'react-router';
export default class Footer extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let {todoDatas,todoNum,clearCompletedTodos,pathname} = this.props;
        return (
            <footer className="footer">
               <span className="todo-count">
                  <strong>{todoNum}</strong>
                  <span> item left</span>
               </span>
               <ul className="filters">
                  <li>
                      <Link
                      to="/"
                      className={pathname==="/"?"selected":""}
                      >All</Link>
                      
                  </li>
                  <li>
                  <Link
                      to="/active"
                      className={pathname==="/active"?"selected":""}
                      >Active</Link>
                  </li>
                  <li>
                  <Link
                      to="/completed"
                      className={pathname==="/completed"?"selected":""}
                      >Completed</Link>
                  </li>
               </ul>
                <button 
                className="clear-completed"
                onClick={clearCompletedTodos}
                >
                      Clear completed
                </button>
            </footer>
        )
    }
}
