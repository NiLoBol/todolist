import React, { Component } from "react";
import "./style.css";
import bgdl from "./images/bg-desktop-light.jpg";
import { Tooltip } from "react-tooltip";
class TodoList extends Component {
  constructor(props) {
    super(props);
    const todosFromStorage = JSON.parse(localStorage.getItem("todos")) || [];
    const completedTodos = todosFromStorage.filter(
      (todo) => todo.completed === true
    );
    this.state = {
      todos: completedTodos || [],
    };
  }

  addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      editstate: false,
    };
    const updatedTodos = [...this.state.todos, newTodo];
    this.setState({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  toggleCompletion = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  toggleEdit = (id) => {
    console.log('Edit:'+id);
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, editstate: true } : todo
    );
    this.setState({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  editvalue = (id, value) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, text: value, editstate: false } : todo
    );
    console.log(value);
    this.setState({ todos: updatedTodos });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  render() {
    return (
      <div>
        <header>
          <img
            id="imgheader"
            class="w-100 position-absolute z-0 pc"
            src={bgdl}
            alt=""
          />
          <img
            id="imgheadermobile"
            class="w-100 position-absolute z-0 mobile"
            src="/images/bg-mobile-light.jpg"
            alt=""
          />
        </header>
        {/* ส่วนฟอร์มเพิ่ม Todo */}
        <div class="alert z-3 text-center-flex w33 mx-auto justify-content-between top50">
          <h1 class="text-align-center my-auto">TODO</h1>
          <div id="icon" class="" onclick="toggleDarkLightMode()">
            <img src="images/icon-moon.svg" alt="" />
          </div>
        </div>
        <div class="alert alert-primary w33 mx-auto top50" role="alert">
          <div class="d-flex align-items-center">
            <input
              id="todo"
              type="text"
              class="form-control bg-input fw700"
              aria-label="Text input with checkbox"
              onKeyPress={(event) => {
                if (event.keyCode === 13 || event.which === 13)
                  this.addTodo(event.target.value);
              }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Click ENTER to add todo"
              data-tooltip-place="top"
              placeholder="Creat a new todo..."
            />
          </div>
        </div>

        {/* ส่วนแสดงรายการ Todo */}
        {this.state.todos.length == 0 ? null : (
          <div class="alert alert-primary w33 mx-auto top50" role="alert">
            {this.state.todos.map((value) => (
              <div class="d-flex align-items-center elem">
                <div class="checkbox-wrapper-15 me-3 col-1">
                  <input
                    class="inp-cbx"
                    id={value.id}
                    type="checkbox"
                    checked={value.completed}
                    style={{ display: "none" }}
                    onClick={() => {
                      this.toggleCompletion(value.id);
                    }}
                  />
                  <label class="cbx" for={value.id}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="9"
                      >
                        <path
                          fill="none"
                          stroke="#FFF"
                          stroke-width="2"
                          d="M1 4.304L3.696 7l6-6"
                        />
                      </svg>
                    </span>
                  </label>
                </div>

                {value.editstate === false ? (
                  <div class="fs-3 text-dark col-10">
                    <span
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Click to Edit"
                      data-tooltip-place="top"
                      onClick={() => {
                        this.toggleEdit(value.id);
                      }}
                    >
                      {value.text}
                    </span>
                  </div>
                ) : (
                  <input
                    id="todo"
                    type="text"
                    class="form-control bg-input fw700"
                    aria-label="Text input with checkbox"
                    onKeyPress={(event) => {
                      if (event.keyCode === 13 || event.which === 13)
                        this.editvalue(value.id, event.target.value);
                    }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Click ENTER to add todo"
                    data-tooltip-place="top"
                    placeholder="Edit todo..."
                  />
                )}
                <svg
                  onClick={() => this.deleteTodo(value.id)}
                  class="cross"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Click to remove todo"
                  data-tooltip-place="top"
                >
                  <path
                    fill="#5f5f5f"
                    fill-rule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  ></path>
                </svg>
              </div>
            ))}
          </div>
        )}
        <Tooltip id="my-tooltip" />
      </div>
    );
  }
}

export default TodoList;
