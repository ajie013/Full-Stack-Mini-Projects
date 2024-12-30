import React, { ChangeEvent, useState } from "react";
import Navigation from "../../component/Navigation/Navigation";
import './style/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import searchIcon from '../../assets/search.png'
import MealItem from "./MealItem.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faCheck} from '@fortawesome/free-solid-svg-icons';

type searchType = string

type mealType = {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    
}

const Home: React.FC = () =>{
   
    const [selectedMeals, setSelectedMeals] = useState<mealType[]>([]);
    const [search, setSearch] = useState<searchType>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<mealType[] | null>(null);
   
    const fetchData = () : void =>{
        setData(null)
        setIsLoading(true)
        axios.get(`http://localhost:8080/home/meals/${search}`)
        .then((res) => {
            
            if (Array.isArray(res.data.meals)) {
                setData(res.data.meals);
               
            } else {
                setData([]); 
               
            }
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setData([])
            setIsLoading(false)
        });
    };
  
    const searchChange = (e: ChangeEvent<HTMLInputElement>) : void =>{
        setSearch(prev => prev = e.target.value);
       
    };

    const SearchMeal = () : void =>{
        fetchData();
    };

    return(
        <>
           <Navigation/>
         
           <div className="home-container">
               
                <div className="search-recipe-wrapper">
                    <img src={searchIcon} alt="" onClick={SearchMeal} />
                    <input type="search" className="input-search" placeholder="Search Meal Name" value={search} onChange={searchChange} required />
                </div>          
               
                <div className="grid-meals">
                    {data === null ? 
                        ("") : 
                        ( data.length > 0 ? (data.map((item, index) =>  <MealItem key={index} meal={item} selectedMeals={selectedMeals}
                        setSelectedMeals={setSelectedMeals} />)) : (<div className="no-data">No Data...</div>))
                    }
                </div>
            
                {isLoading &&  <span className="loader"></span>}
                {selectedMeals.length > 0 &&  
                    <div className="action-menu">
                          <button className="btn btn-success">
                            <FontAwesomeIcon icon={faCheck} className='check'/>
                            <span>{selectedMeals.length === 1 ? "Save Recipe" : "Save Recipes"}</span>
                          </button>

                          <button className="btn btn-danger"> 
                            <FontAwesomeIcon icon={faXmark} className='x-mark'/>
                             <span>Cancel</span>
                          </button>
                        
                         <div> {selectedMeals.length === 1 ? "Selected Item" : "Selected Items"}:&nbsp;{selectedMeals.length} </div>
                       
                    </div>
                }
              
           </div>
        </>
    )
};


export default Home