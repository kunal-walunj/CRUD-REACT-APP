import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const Products = () => {
  const [content, setcontent] = useState(<ProductList showForm={showForm} />);

  function showList() {
    setcontent(<ProductList showForm={showForm} />);
  }

  function showForm(product) {
    setcontent(<ProductForm product={product} showList={showList} />);
  }

  return (
    <div>
      <div className="container my-5">{content}</div>
    </div>
  );
};

export default Products;
