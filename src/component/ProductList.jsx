
import React, { useEffect, useState } from "react";


const ProductList = (props) => {
    const [products, setProducts] = useState([]);
  
    function fetchProducts() {
      fetch("http://localhost:3004/Products")
        .then((response) => {
          if (!response.ok) {
            throw Error("server problem");
          }
          return response.json();
        })
  
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  
    useEffect(() => fetchProducts(), []);
  
    function deleteProduct(id) {
      fetch("http://localhost:3004/Products/" + id, {
        method: "DELETE",
      })
        .then((response) => response.json())
  
        .then((data) => fetchProducts());
    }
  
    return (
      <>
        <h2 className="text-center mb-3">List Of Product</h2>
        <button onClick={() => props.showForm({})} type="button"
          className="btn btn-primary me-2">
          Create
        </button>
        <button onClick={() => fetchProducts()} type="button"
          className="btn btn-outline-primary me-2">
          Refresh
        </button>
  
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((products, index) => {
              return (
                <tr key={index}>
                  <td>{products.id}</td>
                  <td>{products.name}</td>
                  <td>{products.brand}</td>
                  <td>{products.category}</td>
                  <td>{products.price}</td>
                  <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                    <button
                      onClick={() => props.showForm(products)}
                      type="button"
                      className="btn btn-success btn-sm me-2" >
                       Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(products.id)}
                      type="button"
                      className="btn btn-danger btn-sm" >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }


  export default ProductList;