'use client';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import React from 'react';

const AllProducts = () => {
  const { data } = useGetAllProductsQuery(undefined);
  console.log(data);

  return <div>all products</div>;
};

export default AllProducts;
