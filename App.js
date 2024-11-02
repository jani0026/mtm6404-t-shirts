
const style = document.createElement('style');
style.textContent = `
.tshirts-store {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.tshirt-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.tshirt {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

select {
  margin-right: 10px;
  padding: 5px;
}

button {
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.tshirt img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}
`;
document.head.appendChild(style);


function TShirt({ tshirt, onBuy }) {
  const [quantity, setQuantity] = React.useState(1);

  const handleBuy = () => {
    if (quantity > 0 && quantity <= tshirt.stock) {
      onBuy(tshirt.title, quantity);
      setQuantity(1);
    }
  };

  return React.createElement(
    'div',
    { className: 'tshirt' },
    React.createElement('h3', null, tshirt.title),
    React.createElement('img', {
      src: tshirt.image,
      alt: tshirt.title
    }),
    React.createElement('p', null, `Price: $${tshirt.price.toFixed(2)}`),
    React.createElement(
      'p',
      null,
      `Remaining Stock: ${tshirt.stock > 0 ? tshirt.stock : 'Out of Stock'}`
    ),
    tshirt.stock > 0 && React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'select',
        {
          value: quantity,
          onChange: (e) => setQuantity(Number(e.target.value))
        },
        [...Array(tshirt.stock)].map((_, index) =>
          React.createElement(
            'option',
            {
              key: index + 1,
              value: index + 1
            },
            index + 1
          )
        )
      ),
      React.createElement(
        'button',
        { onClick: handleBuy },
        'Buy'
      )
    )
  );
}


function App() {
  const initialTshirts = [
    {
      title: 'Blue T-Shirt',
      image: './images/blue-t-shirt.jpg',
      price: 7.99,
      stock: 4,
      quantity: 1
    },
    {
      title: 'Bright Purple T-Shirt',
      image: './images/bright-purple-t-shirt.jpg',
      price: 5.99,
      stock: 1,
      quantity: 1
    },
    {
      title: 'Cobalt Blue T-Shirt',
      image: './images/cobalt-blue-t-shirt.jpg',
      price: 9.99,
      stock: 5,
      quantity: 1
    },
    {
      title: 'Green T-Shirt',
      image: './images/green-t-shirt.jpg',
      price: 6.99,
      stock: 0,
      quantity: 1
    },
    {
      title: 'Grey T-Shirt',
      image: './images/blue-t-shirt.jpg',
      price: 4.99,
      stock: 2,
      quantity: 1
    },
    {
      title: 'Light Green T-Shirt',
      image: './images/light-green-t-shirt.jpg',
      price: 7.99,
      stock: 4,
      quantity: 1
    },
    {
      title: 'Purple T-Shirt',
      image: './images/purple-t-shirt.jpg',
      price: 7.99,
      stock: 0,
      quantity: 1
    },
    {
      title: 'Red T-Shirt',
      image: './images/red-t-shirt.jpg',
      price: 6.99,
      stock: 3,
      quantity: 1
    },
    {
      title: 'Teal T-Shirt',
      image: './images/teal-t-shirt.jpg',
      price: 7.99,
      stock: 2,
      quantity: 1
    }
  ];

  const [items, setItems] = React.useState(initialTshirts);

  const handleBuy = (title, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, stock: item.stock - quantity } : item
      )
    );
  };

  return React.createElement(
    'div',
    { className: 'tshirts-store' },
    React.createElement('h1', null, 'T-Shirt Store'),
    React.createElement(
      'div',
      { className: 'tshirt-list' },
      items.map((tshirt) =>
        React.createElement(TShirt, {
          key: tshirt.title,
          tshirt: tshirt,
          onBuy: handleBuy
        })
      )
    )
  );
}


document.body.innerHTML = '<div id="root"></div>';


function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}


Promise.all([
  loadScript('https://unpkg.com/react@18/umd/react.development.js'),
  loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js')
]).then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
});