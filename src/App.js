import React, { Component } from 'react';

const Task = ({ value, changeCheckbox, checked}) => {
  return (
    <div>
      <label>{value}</label>
      <input type="checkbox" id="completedTask" checked={checked} onChange={changeCheckbox} />
      <button type='submit'>Edit</button>
      <button type='submit'>Delete</button>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTask: '',
      tasks: [],
      taskIndex: 0,
      complitedTasks: [],
      activeTasks: [],
      currentTasks: [],
      checked: true,
    }
  }

  createTask = () => {
    this.setState({ taskIndex: this.state.taskIndex + 1 });
    this.state.tasks.push({ taskValue: this.state.newTask, key: this.state.taskIndex });
    this.setState({ currentTasks: this.state.tasks.slice(0) });
  }

  onChange = (e) => {
    this.setState({ newTask: e.target.value });
  }

  clearInput = () => {
    this.setState({ newTask: '' });
  }

  changeCheckbox = (e) => {
    this.setState({ checked: !this.state.checked });
  }

  filterTasks = (e) => {
    if (e.target.id === "activeTasks" && e.target.checked) {
      this.setState({ currentTasks: [] });
    } else if (e.target.id === "completedTasks" && e.target.checked) {
      this.setState({ currentTasks: [] });
    } else {
      this.setState({ currentTasks: this.state.tasks.slice(0) });
      //this.state.tasks.map((task) => this.state.currentTasks.push(task));
    }
  }

  render() {
    return (
      <>
        <h1>ToDo List</h1>
        <form action='#'>
          <input type='text' />
          <div>
            <input type="radio" id="activeTasks" name="filterTasks" value="activeTasks" onChange={this.filterTasks}></input>
            <label htmlFor="activeTasks">active</label>
            <input type="radio" id="completedTasks" name="filterTasks" value="completedTasks" onChange={this.filterTasks}></input>
            <label htmlFor="completedTasks">completed</label>
            <input type="radio" id="allTasks" name="filterTasks" value="allTasks" onChange={this.filterTasks}></input>
            <label htmlFor="allTasks">all</label>
          </div>

          {this.state.tasks.length === 0
            ? null
            : this.state.currentTasks.map((task) => (<Task key={task.key} value={task.taskValue} checked={this.state.checked} onChange={this.changeCheckbox}/>))
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

