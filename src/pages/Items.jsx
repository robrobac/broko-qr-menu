import React from 'react';
import { Stack } from 'react-bootstrap';
import { Element } from 'react-scroll';
import AdminDrinkItem from './AdminDrinkItem';
import AdminFoodItem from './AdminFoodItem';
import ItemCard from '../components/ItemCard';

function Items({ categories, isDrink }) {
  const categoriesPath = isDrink ? "menu/drink/categories" : "menu/food/categories";

  return (
    <div>
      <Stack gap={3}>
        {categories?.map((category) => (
          <Element key={category.id} name={category.id}>
            <Stack gap={3} key={category.id}>
              <h2 className="text-center" id={category.id}>{category.category}</h2>
              {isDrink ? (
                <ItemCard category={category} categoriesPath={categoriesPath} />
              ) : (
                <ItemCard category={category} categoriesPath={categoriesPath} />
              )}
            </Stack>
          </Element>
        ))}
      </Stack>
    </div>
  );
}

export default Items;
