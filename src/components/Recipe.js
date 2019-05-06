import React, { useState, useEffect } from 'react';
import food2Fork from '../apis/food2Fork';
import { Link } from 'react-router-dom';

// props is passed to this component only because of react-router-dom and to={{}} inside RecipeList.js
// We use it only to determine the title, which we need for us API request here.
// Instead of title we could have passed recipe_id from RecipeLists.js to this component via to={{}}
const Recipe = props => {
  console.log('props(because of react-router-dom): ', props);

  const [activeRecipe, setActiveRecipe] = useState([]);

  // state comes from RecipesList component via react-router and to={{}}
  const title = props.location.state.recipe;

  useEffect(
    props => {
      // props.title comes from RecipesList because of to={{ state: { recipe: item.title } }}
      (async title => {
        const response = await food2Fork.get('/search', {
          params: {
            q: title,
            count: 1
          }
        });

        console.log('Our Response: ', response.data.recipes[0]);
        setActiveRecipe(response.data.recipes[0]);
      })(title);
    },
    [title]
  );

  return (
    <div className="container">
      {activeRecipe.length !== 0 && (
        <div className="active-recipe">
          <img
            src={activeRecipe.image_url}
            alt={activeRecipe.title}
            className="active-recipe__img"
          />
          <h3 className="active-recipe__title">{activeRecipe.title}</h3>
          <h4 className="active-recipe__publisher">
            Publisher: <span>{activeRecipe.publisher}</span>
          </h4>
          <p className="active-recipe__website">
            Website:
            <a href={activeRecipe.publisher_url}>
              {activeRecipe.publisher_url}
            </a>
          </p>
          <button className="active-recipe__button">
            <Link to="/">Back to Home</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
