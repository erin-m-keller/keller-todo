import React, {useEffect} from 'react';
import ToDo from './components/ToDo.js';
import ToDoForm from './components/ToDoForm.js';
import logo from './assets/images/logo.svg';
import './assets/css/styles.css';


function App() {

  /* initialize react hooks */
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [name, setName] = React.useState("");
  const [nameFlag, setNameFlag] = React.useState(false);
  const [checkFlag, setCheckFlag] = React.useState(false);

  /* add a todo item to the list */
  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    console.log(newTodos);
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  };

  /* toggle when checked or unchecked
   * applies line-through on the todo
   * sets isCompleted true/false and
   * updates list of todos 
   */
  const toggleTodo = (index,checkFlag) => {
    if (!checkFlag) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = true;
      setTodos(newTodos);
      localStorage.setItem("todoList", JSON.stringify(newTodos));
      setCheckFlag(true);
    } else {
      const newTodos = [...todos];
      newTodos[index].isCompleted = false;
      setTodos(newTodos);
      localStorage.setItem("todoList", JSON.stringify(newTodos));
      setCheckFlag(false);
    }
  };

  /* remove todo from the list */
  const removeTodo = (index,e) => {
    e.preventDefault();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  };

  /* submit the form and add the todo */
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  /* update todo input hook as the user types */
  const handleOnChange = val => {
    setValue(val);
  };

  /* update the name */
  const updateName = event => {
    setName(event.target.value)
    localStorage.setItem("FirstName", JSON.stringify(event.target.value));
  };

  /* set name flag true when user enters name */
  const confirmName = () => {
    setNameFlag(true)
  };

  /* get data from localstorage and update hooks if available */
  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("FirstName"));
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    if (name) { 
      setName(name); 
      setNameFlag(true)
    }
    if (todoList) { 
      setTodos(todoList); 
    }
  }, []);

  return (
    <div className="app">
      <header className="header">
        <img src={logo} className="react-logo" alt="logo" />
        <h1><strong>React Powered</strong>&nbsp;To-Do List</h1>
      </header>
      <main>
        {!nameFlag &&
          <div className="name-wrapper">
            <div className="content">
              <h2>Enter your name to add to the list.</h2>
              <form onSubmit={confirmName}>
                <input
                type="text"
                name="name"
                value={name}
                placeholder="Your name here"
                onChange={updateName}
                />
                <input type="submit" className="btn" value="Add Name" />
              </form>
            </div>
          </div>
        }
        <div className="todo-list">
          {nameFlag &&
            <h2>
              {name}'s List<sup>&#42;</sup>
            </h2>
          }
          <small><sup>&#42;</sup>Data is stored in local storage, to start fresh clear your local storage.</small>
          <div className="pattern">
            <div className="content">
            {todos.map((todo, index) => (
              <ToDo
                key={index}
                index={index}
                todo={todo}
                checkFlag={checkFlag}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />
            ))}
            <ToDoForm 
              handleSubmit={handleSubmit} 
              handleOnChange={handleOnChange} 
              addTodo={addTodo} 
              value={value} 
            />
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <h4>&copy; 2023 <a href="https://erin-m-keller.github.io/keller-portfolio/" target="_blank" rel="noreferrer">Erin Keller</a></h4>
      </footer>
    </div>
  );
}

export default App;
