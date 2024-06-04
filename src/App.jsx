import { useEffect, useState } from "react";
import "./App.css";
import cartImage from "./assets/grocery-cart.png";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [showMessage, setshowMessage] = useState(false);

  useEffect(() => {
    checkMessage();
  }, [items]);

  const handleInpuChangeEvent = (e) => {
    setInputValue((et) => (et = e.target.value.trim()));
  };

  const handleAddItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedItems = [...items];
        var existIndex = updatedItems.findIndex(
          (item) => item.name.toLowerCase() === inputValue.toLowerCase()
        );
        if (existIndex === -1) {
          updatedItems.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          });
        } else {
          updatedItems[existIndex].quantity++;
        }
        setItems((items) => {
          return [...updatedItems];
        });
        setInputValue("");
      }
    }
  };
  function handleDeleteItem(val) {
    const updatedItems1 = [...items];
    var existIndex = updatedItems1.findIndex(
      (item) => item.name.toLowerCase() === val.toLowerCase()
    );
    if (updatedItems1[existIndex].quantity === 1) {
      updatedItems1.splice(existIndex, 1);
    } else {
      updatedItems1[existIndex].quantity--;
    }
    setItems((items) => {
      return [...updatedItems1];
    });
  }
  function checkMessage() {
    if (
      items.length > 0 &&
      items.every(function (v) {
        return v.completed === true;
      })
    ) {
      setshowMessage(true);
    } else setshowMessage(false);
  }
  const handleCompleteStatus = (val, index) => {
    debugger;
    const updatedItems = [...items];
    updatedItems[index].completed = val;
    setItems((e) => (e = updatedItems));
  };
  return (
    <>
      <main className="App">
        <div>
          <div>
            {showMessage && <h4 className="success">You are done !</h4>}
            <div className="header">
              <h1>Shopping List</h1>
              <img src={cartImage} alt="Shopping Cart" />
              <input
                onChange={handleInpuChangeEvent}
                value={inputValue}
                type="text"
                className="item-input"
                name=""
                id=""
                onKeyDown={handleAddItem}
                placeholder="Add an item"
              />
            </div>
          </div>
          <ul>
            {items.map((item, index) => (
              <li key={item.name}>
                <div className="container">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={item.completed}
                    value={item.completed}
                    onChange={(e) => {
                      handleCompleteStatus(e.target.checked, index);
                    }}
                  />
                  <p>
                    {item.name}
                    {item.quantity > 1 && <span>x{item.quantity}</span>}
                  </p>
                </div>
                <div>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteItem(item.name)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
