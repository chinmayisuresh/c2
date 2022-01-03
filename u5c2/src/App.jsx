import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [form,setform]=useState(null)
  
  const [recipe,setRecipe]=useState([]);
  const [display , setDisplay]=useState(null);
 
  useEffect(()=>{
    getdish();
  },[])
  
  const  getdish= async ()=>{
    let res=await fetch('http://localhost:3001/dish');
    let data=await res.json();
    console.log(data);
    setRecipe(data);

  }

   const handleChange=(e)=>{
    
     let{name,value}=e.target;
      setform({
        ...form,
          [name]:value,

      })
   }

   const handleSubmit=(e)=>{
     e.preventDefault();
     

     fetch('http://localhost:3001/dish',{
      method:"POST",
      body:JSON.stringify(form),
      headers:{
        'content-type':'application/json'
      }
    }).then(()=>{
      getdish();
    })

   }
   
  //  const ti=async()=>{
  //   let res=await fetch('http://localhost:3001/dish?_sort=time&_order=asc');
  //   let data=await res.json();
  //   //console.log(data);
  //   setRecipe(data);

  //  }
    


  return (
   <div className='bigborder'> 

    <div className='inputborder'>
      <h1>Add a recipe</h1>
      <form onSubmit={handleSubmit}>
        TITLE:<br></br>
         <input  type='text'name='title' onChange={handleChange}  /><br></br>
        INGREDIENTS:<br></br><input type='text' name='ingredients' onChange={handleChange} /><br></br>
        TIME : <br></br><input type='number' name='time' onChange={handleChange}/><br></br>
        INSTRUCTIONS: <br></br><input type='text' name='instructions' onChange={handleChange}/><br></br>
        IMAGE:<br></br><input type='text' name='image' onChange={handleChange}/><br></br>
        <br></br><input className='easy' type='submit'></input>

      </form>
    </div>
      
      <div className='allrecipeborder'>
        <h1>List of Recipe</h1>
         {/* <button onClick={()=> ti} className='easy'>View From Least Time required</button> */}

        {recipe.map((e)=>(
          <div  className='each'key={e.id}>
               <div>Name of Recipe</div>
              <div className='each1' onClick={() => setDisplay(e)}>{e.title}</div>
              Cooking time:<div>{e.time}  Minutes</div>
              {/* <p>{e.ingredients}</p>
              <p>{e.time}</p>
              <p>{e.instructions}</p>
              <img src={e.image}/> */}
              
          </div>
        ))}
      </div>
          <div className='showrecipe'>
            {display?
              <div>
                <h2 className='a'>Name of recipe:{display.title}</h2>
                <h2 className='b'>Cooking time:{display.time}</h2>
                <img src={display.image}></img>
                <div className='ing'>Ingredients: {display.ingredients}</div>
                <div className='ing'> Instructions: {display.instructions}</div>
              </div>  :null
              }
          </div>
    </div>
  );
}



export default App;
