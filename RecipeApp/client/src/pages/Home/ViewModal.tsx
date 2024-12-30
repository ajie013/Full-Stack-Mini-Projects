import React, { useEffect } from 'react'
import './style/ViewModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState} from 'react';
import axios from 'axios';



interface modalProps {
    setModalToggler: React.Dispatch<React.SetStateAction<boolean>>;
    id: string | null;
};

interface ingredientsInfo {
    name: string;
    img_url: string;
}
interface mealInfo{
    strInstructions: string;
    strMeal: string;
    strTags: string;
    strCategory: string;
    strMealThumb: string;
}

const ViewModal : React.FC<modalProps> = ({setModalToggler,id}) =>{

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<mealInfo | null>(null);
    const [ingredients, setIngredients] = useState<ingredientsInfo[]>([])
    const [measure, setMeasure] = useState<string[]>([])
    
   
    const fetchData = () : void =>{
        isLoading
        setIngredients([])
        axios.get(`http://localhost:8080/home/meals/info/${id}`)
        .then((res) => {
            
            setData({
                strInstructions:  res.data.meals[0].strInstructions,
                strMeal:  res.data.meals[0].strMeal,
                strTags:  res.data.meals[0].strTags,
                strCategory:  res.data.meals[0].strCategory,  
                strMealThumb: res.data.meals[0].strMealThumb      
            });

            for(let i  = 1; i <= 20;i++){
                let ingredient = res.data.meals[0][`strIngredient${i}`]
                let arr = ingredient.split(" "); 
                let result = arr.join("%20");
                let url = `https://www.themealdb.com/images/ingredients/${result}.png`
                
                const newIngredient = {
                    name: res.data.meals[0][`strIngredient${i}`],
                    img_url: url
                }
               
                if(ingredient !== "" && ingredient !== " "){
                    setIngredients(prev => [...prev, newIngredient])
                }            
            }

            for(let i  = 1; i <= 20;i++){
                let measure = res.data.meals[0][`strMeasure${i}`]
                if(measure !== "" && measure !== " "){
                    setMeasure(prev => [...prev, measure])
                }            
            }
        })
        .catch((err) => {
            console.log(err);
          
          
        });
    };
   
    useEffect(() =>{
        fetchData(); 
    },[])

    useEffect(() =>{
        if(data){
          console.log(data)
        }
    },[data])

    useEffect(() =>{
        if(ingredients.length !== 0){
            console.log(ingredients)
        }
    },[ingredients])

    useEffect(() =>{
        if(measure.length !== 0){
            console.log(measure)
        }
    },[measure])


    const CloseModal = () =>{
        setModalToggler(prev => !prev);
    };
    
    return(
        <>
            <div className='modal-bg'>
                <div className='view-modal-container'>
                    {data && ingredients && measure ?
                     <div className="content">
                        <div className="modal-header"><p>{data?.strMeal}</p></div>

                        <div className='meal-photo-container'>
                            <img src={data?.strMealThumb} className='meal-photo' alt="" />
                        </div>
                        <p className='ingredients-header'>Ingredients</p>
                        <div className='ingredients-wrapper'>
                            
                            {ingredients.map((item, index) => <div key={index} className='ingredient-item'>
                                <p>{measure[0]} {item.name}</p>
                                <img src={item.img_url} className='ingredient-item-photo' alt="" />
                            </div>)}
                        </div>
                        <div className='instructions-wrapper'>
                            <p className='instructions-header'>Instruction</p>
                           
                            <p className='instruction-text'>
                            {data.strInstructions.split('.').map(item => <p>{item}.</p>)}
                            </p>
                        </div>


                    </div> : <span className="loader-modal"></span>}
                   
                   
                
                <FontAwesomeIcon icon={faXmark} className='x-mark' onClick={CloseModal} />
                </div>
            </div>
            
        </>
    )
}

export default ViewModal