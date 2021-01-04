import React, { Component } from 'react';
import './styles.css';
import TodoItem from './components/TodoItem';
import total from './img/entire.svg';
import imgBackground from './img/back.svg';
class App extends Component {
  constructor() {
    super();
    this.state = {
      newItems: '',
      currentFilter: [],
      todoItems: [],
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onClickRm = this.onClickRm.bind(this);
    this.onTotal = this.onTotal.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }
  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }
  onClickRm(index) {
    const { todoItems } = this.state;
    this.setState({
      todoItems: [...todoItems.slice(0, index), ...todoItems.slice(index + 1)],
    });
  }
  onTotal() {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.map((item) => ({ ...item, isComplete: true })),
    });
  }
  onFilter(type) {
    const { todoItems } = this.state;
    if (type === 'active') {
      this.setState({
        currentFilter: todoItems.filter((item) => !item.isComplete),
      });
    } else if (type === 'completed') {
      this.setState({
        currentFilter: todoItems.filter((item) => item.isComplete),
      });
    } else {
      this.setState({
        currentFilter: [],
      });
    }
  }
  onKeyUp(event) {
    let text = event.target.value;
    if (event.keyCode === 13) {
      if (!text) {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState({
        newItems: '',
        todoItems: [
          ...this.state.todoItems,
          { title: text, isComplete: false },
        ],
      });
    }
  }
  onChange(event) {
    this.setState({
      newItems: event.target.value,
    });
  }

  render() {
    const { todoItems, newItems, currentFilter } = this.state;
    const list = currentFilter.length ? currentFilter : todoItems;
    return (
      <div className='Title'>
        <p>todolist</p>
        <div className='App' style={{ background: `url(${imgBackground})` }}>
          <div className='Header'>
            <img src={total} width={30} onClick={this.onTotal} alt='icon' />
            <input
              type='text'
              placeholder='Work to do'
              value={newItems}
              onChange={this.onChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
          <div className='Scroll'>
            {list.map((item, index) => (
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)}
                onRemove={() => this.onClickRm(index)}
              />
            ))}
          </div>
          <div className='Footer'>
            <button onClick={() => this.onFilter('all')}>All</button>
            <button onClick={() => this.onFilter('active')}>Active</button>
            <button onClick={() => this.onFilter('completed')}>
              Completed
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
