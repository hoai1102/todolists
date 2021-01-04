import React, { Component } from "react";
import classNames from "classnames";
import "./TodoItem.css";
import check from "../img/check.svg";
import checkComplete from "../img/check-complete.svg";
import remove from "../img/remove.svg";
class TodoItem extends Component {
  render() {
    const { item, onClick, onRemove } = this.props;
    let url = check;
    if (item.isComplete) {
      url = checkComplete;
    }
    return (
      <div
        className={classNames("TodoItem", {
          "TodoItem-complete": item.isComplete,
          Remove: true
        })}
      >
        <img onClick={onClick} src={url} width={30} alt="icon" />
        <p>{this.props.item.title}</p>
        <img
          className="removeicon"
          src={remove}
          width={30}
          alt="icon"
          onClick={onRemove}
        />
      </div>
    );
  }
}
export default TodoItem;
