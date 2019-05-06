import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import food2Fork from '../apis/food2Fork';
import { NavLink } from 'react-router-dom';

const RecipesList = ({ term }) => {
  const [list, setList] = useState([]);

  /* ================================================================================
    In this solution, we put our API call directly inside useEffect, however 
    if we do so, we have to run our API call as an IIFE, because
    You cannot have async or promises inside useEffect unless you run them as IIFE
  ================================================================================= */
  useEffect(() => {
    (async term => {
      const response = await food2Fork.get('/search', {
        params: {
          q: term,
          count: 12
        }
      });

      // console.log(response.data.recipes);

      setList(response.data.recipes);
    })(term);

    // let recipes = JSON.stringify(list);
    // localStorage.setItem('recipes', recipes);

    // const string = localStorage.getItem('recipes');
    // recipes = JSON.parse(string);

    // setList(recipes);
  }, [term]);

  return (
    <div className="container">
      <div className="row">
        {list.map(item => {
          return (
            <div key={item.recipe_id} className="col-md-6 col-lg-4">
              <div className="recipe__box">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="recipe__box--img"
                />
                <div className="recipe__text">
                  <h5 className="recipes__title">
                    {item.title.length < 20
                      ? `${item.title}`
                      : `${item.title.substring(0, 24)}...`}
                  </h5>
                  <p className="recipes__subtitle">
                    Publisher: {item.publisher}
                  </p>
                </div>
                <button className="recipe_buttons">
                  <NavLink
                    // the first { is for writing JS
                    // the second { is for defining a new object with two properties. pathname and state
                    // state is for passing the title to Recipe.js for starting a new API request
                    to={{
                      pathname: `/recipe/${item.recipe_id}`,
                      state: { recipe: item.title }
                    }}
                  >
                    View recipe
                  </NavLink>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipesList;
