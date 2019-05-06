import React, { useState } from 'react';
import '../App.css';
import Form from './Form';
import RecipesList from './RecipesList';

const App = () => {
  const [term, setTerm] = useState('');

  const submitSearch = e => {
    e.preventDefault();
    console.log(e.target.elements.receiptName.value);
    setTerm(e.target.elements.receiptName.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Recipe Search</h1>
      </header>
      <Form submitSearch={submitSearch} />
      <RecipesList term={term} />
    </div>
  );
};

export default App;
