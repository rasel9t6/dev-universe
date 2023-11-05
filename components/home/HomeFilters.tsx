'use client';
import React from 'react';
import { HomePageFilters } from '../shared/filters';
import { Button } from '../ui/button';

const HomeFilters = () => {
  const active = '';
  return (
    <div className='mt-10 hidden flex-wrap gap-3 md:flex '>
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active
              ? 'bg-primary-100'
              : ' bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500'
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
