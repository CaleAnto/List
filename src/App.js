import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

const itemsData = [
  {
    key: uuid(),
    label: "Have fun",
  },
  {
    key: uuid(),
    label: "Spread Empathy",
  },
  {
    key: uuid(),
    label: "Generate Value",
  },
];

function App() {
  const [itemToDo, setItemTodo] = useState("");
  const [items, setItems] = useState(()=>JSON.parse(localStorage.getItem('items'))||itemsData);
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  

  const handleItemToDo = (event) => {
    setItemTodo(event.target.value);
  };
  
  const handleAddItem = () => {
    const newObj = { key: uuid(), label: itemToDo };

    setItems([newObj, ...items]);
    localStorage.setItem('items', JSON.stringify(items));
  };

  const handleDeleteItem = (key) => {
    setItems(items.filter(item => item.key !== key));
    localStorage.setItem('items', JSON.stringify(items));
  }

  const handleItemDone = (key) => {
    const newArray = items.map((item) => {
      if (item.key === key) {
        return { ...item, isDone: !item.isDone };
      } else return item;
    });

    setItems(newArray);
  };

  const handleItemBold = (key) => {
    const newArray = items.map((item) => {
      if (item.key === key) {
        return { ...item, isBold: !item.isBold };
      } else return item;
    });

    setItems(newArray);
  };

  const handleChangeStatus = (type) => {
    setType(type);
  };

  const doneItems = items.filter((item) => item.isDone);
  const notDoneItems = items.filter((item) => !item.isDone);

  const filteredItems =
    type === "active" ? notDoneItems : type === "done" ? doneItems : items;

  const searchList = filteredItems.filter(item => {
    if(search) {
      return item.label.includes(search)
    } else {return item}

  }
    )

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>
          {notDoneItems.length} more to do, {doneItems.length} done
        </h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange={(text) => setSearch(text.target.value)}
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((itemB) => (
            <button
              key={itemB.type}
              type="button"
              // type
              className={`btn btn${type === itemB.type ? "" : "-outline"}-info`}
              onClick={() => handleChangeStatus(itemB.type)}
            >
              {itemB.label}
            </button>
          ))}
        </div>
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {searchList.map((item) => (
          <li
            key={item.key}
            className="list-group-item"
        
          >
            <span className={`todo-list-item ${item.isDone ? "done" : ""} ${item.isBold ? "important" : ""}`}>
              <span className="todo-list-item-label" onClick={() => handleItemDone(item.key)}>{item.label}</span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={() => handleItemBold(item.key)}
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => handleDeleteItem(item.key)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          onChange={handleItemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;
