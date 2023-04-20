import React, { useEffect, useState } from "react";

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
};

const ProductForm = (props) => {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    //read from data
    const formData = new FormData(event.target);

    //convert fromdata to object
    const product = Object.fromEntries(formData.entries());

    //form validation
    console.log(product);
    if (
      !product.name &&
      !product.brand &&
      !product.category &&
      !product.price
    ) {
      console.log("please provide valid data");
      setErrorMessage(
        <div className="alert alert-danger" role="alert">
          ! please provide valid data
        </div>
      );
      return;
    }

    if(props.product.id){
       //update product
       fetch("http://localhost:3004/Products/"+ props.product.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("network not responsed");
          }
          return response.json();
        })
        .then((data) => props.showList())
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    else{
    //create a new product

    // product.createdAt=new Date();
    fetch("http://localhost:3004/Products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("network not responsed");
        }
        return response.json();
      })
      .then((data) => props.showList())
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

  return (
    <>
      <h2 className="text-center mb-3">{props.product.id? "Edit Product":"Create New Product"}</h2>

      <div className="row">
        <div className="col-lg-6 mx-auto">
          {errorMessage}

          <form onSubmit={(event) => handleSubmit(event)}>
           {props.product.id && <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Id</label>
              <div className="col-sm-8">
                <input readOnly
                  className="form-control"
                  name="name"
                  defaultValue={props.product.id}/>
              </div>
            </div>
            }

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="name"
                  defaultValue={props.product.name}/>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Brand</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="brand"
                  defaultValue={props.product.brand}/>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">category</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="category"
                  defaultValue={props.product.category}/>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Price</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  name="price"
                  defaultValue={props.product.price}/>
              </div>
            </div>

            <div className="row ">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary btn-sm me-3">
                  Save
                </button>
              </div>
              <div className="col-sm-4 d-grid">
                <button
                  onClick={() => props.showList()}
                  type="button"
                  className="btn btn-secondary me-2">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Products;
