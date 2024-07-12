import React, { useEffect, useState } from "react";
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json()
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  });

  const selectPage=(selpag)=>{
    if (selpag>=1 && selpag<=products.length/10 && selpag!==page ) 
  
    setPage(selpag)
  }

  return <div>
    <h1 className="head">Store Products </h1>
    {
      products.length>0 && <div className="products">
        {
          products.slice(page * 10 - 10, page*10).map((pro)=>{
            return <span className="products__single" key={pro.id}>
              <img src={pro.thumbnail} alt={pro.title} />
              <span>{pro.title}</span>
            </span>
          })
        }
      </div>
      
    }

    {
      products.length>0 && <div className="pagination">
        <span onClick={()=>selectPage(page-1)} >◀</span>
        {
          [...Array(products.length/10)].map((_, i)=>{
            return <span className={page===i+1?"pagination__selected":""}
            onClick={()=>selectPage(i+1)} key={i}>
              {i+1}
              </span>
          })
        }
      
        <span onClick={()=>selectPage(page+1)}>▶</span>
      </div>
    }
    
  </div>;
};

export default App;
