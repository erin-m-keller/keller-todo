import React, { Component } from "react";
 
class ToDoForm extends Component {
  render() {
    return (
        // form to allow user to input a todo item
        <form className="todo-form">
            <input
            type="text"
            className="input"
            value={this.props.value}
            onChange={e => this.props.handleOnChange(e.target.value)}
            />
            <input type="submit" className="btn" onClick={(event) => this.props.handleSubmit(event)} value="Add To-Do" />
        </form>
    );
  }
}
 
export default ToDoForm;