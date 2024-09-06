import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ListGroup() {
  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    const storedDoneItems = localStorage.getItem("doneItems");

    if (storedItems) setItems(JSON.parse(storedItems));
    if (storedDoneItems) setDoneItems(JSON.parse(storedDoneItems));
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("doneItems", JSON.stringify(doneItems));
  }, [doneItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setItems([...items, { text: input, done: false }]);
      setInput("");
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    const item = updatedItems.splice(index, 1)[0];
    setItems(updatedItems);
    setDoneItems([...doneItems, item]);
  };

  const handleDelete = (index) => {
    const updatedDoneItems = [...doneItems];
    updatedDoneItems.splice(index, 1);
    setDoneItems(updatedDoneItems);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter an item"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            Add Activity
          </button>
        </div>
      </form>

      <h4>To-Do-Activities</h4>
      <ul className="list-group mb-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.text}
            <input
              type="checkbox"
              className="form-check-input ms-3"
              onChange={() => handleCheckboxChange(index)}
            />
          </li>
        ))}
      </ul>

      <h4>Completed-Activities</h4>
      <ul className="list-group">
        {doneItems.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.text}
            <button
              className="btn btn-danger btn-sm ms-3"
              onClick={() => handleDelete(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
