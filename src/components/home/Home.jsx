import { useEffect, useState } from "react"

export default function Home() {
  const [name, setName] = useState('')
  const [price, setprice] = useState('')
  const [totalPrice, settotalPrice] = useState(0)
  const [products, setproducts] = useState([])
  const [updateId, setUpdateId] = useState(null)

  const handleCreateProduct=()=>{
   if(updateId==null){
 const newProduct={
      id:Date.now(),
      name:name,
      price:price
    }
    setproducts([...products, newProduct])
 
    // settotalPrice(totalPrice+price);
   }else{
      const arr=[...products];
      console.log(arr);
      
      const productIndex=arr.findIndex((product)=>product.id==updateId)
      console.log(arr[productIndex]);
      arr[productIndex]={
        id:arr[productIndex].id,
        name:name,
        price:price
      }
      setproducts(arr)
      setUpdateId(null)
   }
      setName('')
    setprice('')
  }

  const handleDelete=(id)=>{
    console.log(id);
    setproducts(products.filter((product)=>product.id!=id))
    
    // settotalPrice(totalPrice-products.find((product)=>product.id ==id).price);
    
  }

  const handleUpdate=(id)=>{
    setUpdateId(id)
    setName(products.find((product)=>product.id==id).name)
    setprice(products.find((product)=>product.id==id).price)

    
  }


  useEffect(() => {
    let total=0
    for( let i=0;i<products.length;i++){
      total+=products[i].price
    }
    settotalPrice(total)
    
  }, [products]);
  



  return (<>
      <section className="w-75 m-auto shadow-lg p-3">
        <div className="container mt-5">
          <div className="bg-white">
            <h1 className="text-center">Create New Product</h1>
            <h3 className="bg-primary text-white rounded w-25 text-center p-1">Total : {totalPrice}</h3>
            <input type="text" className="form form-control w-100 my-2" placeholder="Enter Product Name..." value={name} onChange={(e)=>{
              setName(e.target.value)
            }} />
            <input type="number" className="form form-control w-100 my-2" placeholder="Enter Product Price..." value={price} onChange={(e)=>{
              setprice(parseInt(e.target.value))
            }} />
            <button className={`${updateId?'bg-success':'bg-primary'}  text-white w-100 btn`} onClick={handleCreateProduct}>{updateId?'Update':'Create'} </button>
           </div>
           
        </div>
      </section>
      <section className="w-75 m-auto shadow-lg p-3 mt-5">
        <div>
            <table className="table rounded table-striped text-center">
              <thead>
                <tr>
                <th>id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
                {products.map((product)=>{
                  return(
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td><button className="btn btn-danger mx-2" onClick={()=>{handleDelete(product.id)}}>Delete</button>
                <button className="btn btn-info mx-2" onClick={()=>{handleUpdate(product.id)}}>Update</button></td>
              </tr>
                  )
                })}
                
              </tbody>
            </table>
           </div>
      </section>
  
  
  </>
  )
}
