import React, { Component } from 'react';

const Task = ({ value, checked, onChange, id, onClick }) => {
  return (
    <div>
      <label>{value}</label>
      <input type="checkbox" checked={checked} onChange={() => onChange(id)} />
      <button type='submit'>Edit</button>
      <button type='submit' onClick={() => onClick(id)}>Delete</button>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: '',
      tasks: [], //общий массив тасков
      taskIndex: 0,
      complitedTasks: [], //массив для фильтра радиокнопок
    }
  }

  createTask = () => {
    this.setState({ taskIndex: this.state.taskIndex + 1 });
    this.state.tasks.push({ taskValue: this.state.newTask, id: this.state.taskIndex, checked: false });
    this.setState({ currentTasks: this.state.tasks.slice(0) });
  }

  onChange = (e) => {
    this.setState({ newTask: e.target.value });
  }

  clearInput = () => {
    this.setState({ newTask: '' });
  }

  checkboxHandler = (id) => {
    const filterTasks = this.state.tasks.map((task) => {
      if (id === task.id) {
        task.checked = !task.checked;
      }
    })
    this.setState({ task: filterTasks })
  }

  removeTask = (id) => {
    this.state.currentTasks.forEach((task, index) => {
      if (id === task.id) {
        this.state.currentTasks.splice(index, 1)
      }
    })
    this.setState({ currentTasks: this.state.currentTasks })

    this.state.tasks.forEach((task, index) => {
      if (id === task.id) {
        this.state.tasks.splice(index, 1)
      }
    })
    this.setState({ tasks: this.state.tasks })
    //тут пришлось применять функцию к массиву по радиокнопкам и общему с тасками, чтобы параллельно удалялась одна и та же кнопка
  }

  filterTasks = (e) => {
    if (e.target.id === "activeTasks" && e.target.checked) {
      const filterTasks = this.state.tasks.filter((task) => task.checked === false);
      this.setState({ currentTasks: filterTasks })
    } else if (e.target.id === "completedTasks" && e.target.checked) {
      const filterTasks = this.state.tasks.filter((task) => task.checked === true);
      this.setState({ currentTasks: filterTasks })
    } else {
      this.setState({ currentTasks: this.state.tasks.slice(0) });
    }
  }

  render() {
    return (
      <>
        <h1>ToDo List</h1>
        <form action='#'>
          <input type='text' />
          <div>
            <input type="radio" id="activeTasks" name="filterTasks" value="activeTasks" onChange={this.filterTasks} />
            <label htmlFor="activeTasks">active</label>
            <input type="radio" id="completedTasks" name="filterTasks" value="completedTasks" onChange={this.filterTasks} />
            <label htmlFor="completedTasks">completed</label>
            <input type="radio" id="allTasks" name="filterTasks" value="allTasks" onChange={this.filterTasks} />
            <label htmlFor="allTasks">all</label>
          </div>

          {this.state.tasks.length === 0
            ? null
            : this.state.currentTasks.map((task) => (
              <Task key={task.id} id={task.id} value={task.taskValue} checked={task.checked} onChange={this.checkboxHandler} onClick={this.removeTask} />
            ))
          }

          <div>
            <input type='text' value={this.state.newTask} onChange={this.onChange} />
            <button type='submit' onClick={this.createTask}>Submit</button>
            <button type='reset' onClick={this.clearInput}>Reset</button>
          </div>
        </form>
      </>
    )
  }
}

export default App;

