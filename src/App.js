import React, { Component } from 'react';

const Task = ({ value }) => {
  return (
    <div>
      <label>{value}</label>
      <input type="checkbox" id="completedTask" />
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
    }
  }

  createTask = () => {
    this.state.tasks.push(this.state.newTask);
    this.setState({ index: this.state.index + 1 });
  }

  onChange = (e) => {
    this.setState({ newTask: e.target.value });
  }

  clearInput = () => {
    this.setState({ newTask: '' });
  }

  render() {
    return (
      <>
        <h1>ToDo List</h1>
        <form action='#'>
          <input type='text' />
          <div>
            <input type="radio" id="activeTasks" name="filterTasks" value="activeTasks"></input>
            <label htmlFor="activeTasks">active</label>
            <input type="radio" id="completedTasks" name="filterTasks" value="completedTasks"></input>
            <label htmlFor="completedTasks">completed</label>
            <input type="radio" id="allTasks" name="filterTasks" value="allTasks"></input>
            <label htmlFor="allTasks">all</label>
          </div>

          {this.state.tasks.length === 0
            ? null
            : this.state.tasks.map((task) => (<Task key={task} value={task} />))
          }
          {/* пока key и value равны, не знаю откуда еще брать key */}
          <div>
            <input type='text' value={this.state.newTask} onChange={this.onChange} />
            <button type='submit' onClick={this.createTask}>Submit</button>
            <button type='submit' onClick={this.clearInput}>Reset</button>
          </div>
        </form>
      </>
    )
  }
}

export default App;

