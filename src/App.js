import React, {useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {
  
  const [data, setData] =useState({
    selectedValue: '',
    search: ''
  })

  const [result , setResult] = useState([])

  const { selectedValue, search } = data

  const options = ['year', 'rating', 'duration', 'stars', 'genres']



const handleChange = (name) => (event) => {
  setData({...data, [name]: event.target.value})
};

const searchSubmit = (event) => {
  event.preventDefault();
  searchData()
};

const searchData = async () => {
      
      // loadSearchCompanies({search: search || undefined, selectedValue: selectedValue});
     const { data } = await axios.get(`http://localhost:5000/api/v1/movies?${selectedValue}=${search}`);

     setResult(data.data)

  
};



  return (
    <>
    <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('selectedValue')}>
                            <option value="All">Select</option>
                            { options.map((el, index) => (
                                <option key={index}>
                                    {el}
                                </option>
                            )) 
                            }
                        </select>
                    </div>

                    <input 
                        type="search"
                        className="form-control"
                        onChange={handleChange('search')}
                        placeholder="Search by name"
                    />
                </div>

                <div className="btn input-group-append" style={{border: 'none'}}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
        { result.length > 0 ? (<div className="alert alert-success ">
          Total Results : {result.length}
        </div>) : <div  className="alert alert-danger" > No results </div> }
        
        {result.map((el,i) => {
          return(
            <div key={i} className="card" style={{width: "60rem", padding: "5px", margin: "10px", marginLeft: "50px"}}>
            <h2 className="card-header name">{el.name}</h2>
              <div className="card-body">
                <h6>Summary: {el.summery}</h6>
                <h6>Duration: {el.duration} min</h6>
                <h6>Genres: {el.genres}</h6>
                <h6>Year: {el.year}</h6>
                <h6>Rating: {el.rating}</h6>
                <h6>Stars: {el.stars}</h6>
                <h6>Director: {el.director}</h6>
              </div>
            </div>
          )
        } )}
      
      </>
  );
}

export default App;
