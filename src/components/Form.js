import React from 'react';

const Form = ({ submitSearch }) => {
  return (
    <div>
      <form onSubmit={submitSearch}>
        <input type="text" name="receiptName" className="form__input" />
        <button className="form__button">Search</button>
      </form>
    </div>
  );
};

export default Form;
