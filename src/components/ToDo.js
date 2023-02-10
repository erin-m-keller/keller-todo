import React, { Component } from "react";
import deleteLogo from '../assets/images/delete.svg';
 
class ToDo extends Component {
  render() {
    return (
        // displays each todo with a checkbox and delete option
        <div className={`todo ${this.props.todo.isCompleted ? 'complete' : 'incomplete'}`}>
          <form>
            <input type="checkbox" id={`todo-${this.props.index}`} name="source" onClick={() => this.props.toggleTodo(this.props.index,this.props.checkFlag)} value={this.props.todo.text} />
            <label htmlFor={`todo-${this.props.index}`} data-content={this.props.todo.text}>{this.props.todo.text}</label>
          </form>
          <a href="#" onClick={(e) => this.props.removeTodo(this.props.index,e)}>
            <img src={deleteLogo} alt="Delete Todo" />
          </a>
        </div>
    );
  }
}
 
export default ToDo;