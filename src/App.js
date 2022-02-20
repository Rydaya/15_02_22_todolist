import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Task = ({ value, checked, onChange, id, onClick }) => {
  return (
    <div className='d-flex justify-content-between align-items-center border-bottom mb-1 pb-1'>
      <label className='fw-bold'>{value}</label>
      <div className='d-flex align-items-center'>
        <input className='form-check-input mt-0 mx-1' type="checkbox" checked={checked} onChange={() => onChange(id)} />
        <button className='btn btn-primary mx-1 btn-sm' type='submit'>Edit</button>
        <button className='btn btn-primary btn-sm' type='submit' onClick={() => onClick(id)}>Delete</button>
      </div>
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
        <div className='container col-md-3 border border-2 rounded mt-5 p-3'>
          <div>
            <h1 className='text-center'>ToDo List</h1>
          </div>
          <form action='#'>
            <div className='mb-3'>
              <label className="form-label fs-6">Search</label>
              <input type='text' className='form-control' />
            </div>
            <div className='mb-3'>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type="radio" id="activeTasks" name="filterTasks" value="activeTasks" onChange={this.filterTasks} />
                <label className='fs-6' htmlFor="activeTasks">Active</label>
              </div>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type="radio" id="completedTasks" name="filterTasks" value="completedTasks" onChange={this.filterTasks} />
                <label className='fs-6' htmlFor="completedTasks">Completed</label>
              </div>
              <div className='form-check form-check-inline'>
                <input className='form-check-input' type="radio" id="allTasks" name="filterTasks" value="allTasks" onChange={this.filterTasks} />
                <label className='fs-6' htmlFor="allTasks">All</label>
              </div>
            </div>

            {this.state.tasks.length === 0
              ? null
              : this.state.currentTasks.map((task) => (
                <Task key={task.id} id={task.id} value={task.taskValue} checked={task.checked} onChange={this.checkboxHandler} onClick={this.removeTask} />
              ))
            }

            <div className='mt-3'>
              <input type='text' className='form-control mb-3' value={this.state.newTask} onChange={this.onChange} />
              <div className='d-grid gap-2 d-md-flex mx-auto'>
                <button type='submit' onClick={this.createTask} className='btn btn-primary'>Submit</button>
                <button type='reset' onClick={this.clearInput} className='btn btn-primary'>Reset</button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default App;

