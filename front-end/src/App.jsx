import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('http://localhost:3000/notify');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  const registerObserver = async () => {
    try {
      await axios.post('http://localhost:8080/api/observers', { callbackUrl });
      alert('Observador registrado com sucesso!');
    } catch (err) {
      console.error("Erro ao registrar observador:", err);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post('http://localhost:8080/api/products', {
        id: Date.now(),
        name: productName,
        price: parseFloat(productPrice)
      });
      setProductName('');
      setProductPrice('');
      fetchProducts();
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  const updatePrice = async () => {
    try {
      await axios.put(`http://localhost:8080/api/products/${productId}`, {
        price: parseFloat(newPrice)
      });
      setProductId('');
      setNewPrice('');
      fetchProducts();
      simulateNotification(productId, newPrice);
    } catch (err) {
      console.error("Erro ao atualizar preço:", err);
    }
  };

  const simulateNotification = (id, price) => {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      const message = `Produto ${product.name} (ID: ${id}) atualizado para R$ ${price}`;
      setNotifications(prev => [...prev, message]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Sistema Observer de Preços</h1>

      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Registrar Observador</h2>
        <input
          type="text"
          value={callbackUrl}
          onChange={e => setCallbackUrl(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button onClick={registerObserver} style={{ background: '#2563eb', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
          Registrar
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Adicionar Produto</h2>
        <input
          type="text"
          placeholder="Nome"
          value={productName}
          onChange={e => setProductName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          type="number"
          placeholder="Preço"
          value={productPrice}
          onChange={e => setProductPrice(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button onClick={addProduct} style={{ background: '#16a34a', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
          Adicionar
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Atualizar Preço</h2>
        <input
          type="number"
          placeholder="ID do Produto"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <input
          type="number"
          placeholder="Novo Preço"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button onClick={updatePrice} style={{ background: '#facc15', color: 'black', padding: '8px 16px', borderRadius: '4px' }}>
          Atualizar
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Produtos Cadastrados</h2>
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} (ID: {p.id}) - R$ {p.price}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Notificações Recebidas (Simuladas)</h2>
        <ul>
          {notifications.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}