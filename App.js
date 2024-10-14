import React from 'react';
import ReactDOM from 'react-dom/client';
import tshirts from '../my-app/src/t-shirts'; // Adjust the import path as needed
import './styles.css'; // Optional: import your styles if you have a stylesheet

function TShirt({ tshirt, onBuy }) {
  const [quantity, setQuantity] = React.useState(1);

  const handleBuy = () => {
    if (quantity > 0 && quantity <= tshirt.stock) {
      onBuy(tshirt.title, quantity);
      setQuantity(1); // Reset quantity after purchase
    }
  };

  return (
    <div className="tshirt">
      <h3>{tshirt.title}</h3>
      <img src={require(`./images/${tshirt.image}`).default} alt={tshirt.title} />
      <p>Price: ${tshirt.price.toFixed(2)}</p>
      <p>Remaining Stock: {tshirt.stock > 0 ? tshirt.stock : 'Out of Stock'}</p>
      {tshirt.stock > 0 && (
        <>
          <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            {[...Array(tshirt.stock)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button onClick={handleBuy}>Buy</button>
        </>
      )}
    </div>
  );
}

function App() {
  const [items, setItems] = React.useState(tshirts);

  const handleBuy = (title, quantity) => {
    setItems((prevItems) => {
      // Ensure that prevItems is an array before attempting to map
      if (!Array.isArray(prevItems)) {
        console.error('prevItems is not an array:', prevItems);
        return []; // or handle the error appropriately
      }
      return prevItems.map((item) =>
        item.title === title ? { ...item, stock: item.stock - quantity } : item
      );
    });
  };

  return (
    <div className="tshirts-store">
      <h1>T-Shirt Store</h1>
      <div className="tshirt-list">
        {/* Ensure items is an array before mapping */}
        {Array.isArray(items) ? (
          items.map((tshirt) => (
            <TShirt key={tshirt.title} tshirt={tshirt} onBuy={handleBuy} />
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


export default App;
