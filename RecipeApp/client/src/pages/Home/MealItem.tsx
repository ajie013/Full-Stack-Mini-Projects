import 'bootstrap/dist/css/bootstrap.min.css'
import truncateText from '../../utils/truncateText';
import './style/MealItem.css'
import { useEffect, useState } from 'react';
import ViewModal from "./ViewModal.tsx";

interface Meal {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
}


interface MealItemProps {
    meal : Meal;
    selectedMeals: Meal[]
    setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
    
  
};


const MealItem: React.FC<MealItemProps> = ({ meal,selectedMeals, setSelectedMeals} ) =>{
    const [modalToggler, setModalToggler] = useState<boolean>(false);
    const [selected, setSelected] = useState(false)
 
    const ViewRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        setModalToggler(prev => !prev);
    };


    useEffect(() =>{
        const isSelected = selectedMeals.some(selectedMeal => selectedMeal.idMeal === meal.idMeal);

        if (isSelected) {
            setSelected(true)
           
        } else {
           
            
            setSelected(false)
        }
    },[])
    const ClickMeal = () => {
        
        const isSelected = selectedMeals.some(selectedMeal => selectedMeal.idMeal === meal.idMeal);

        if (isSelected) {
            setSelected(false)
            setSelectedMeals(selectedMeals.filter(selectedMeal => selectedMeal.idMeal !== meal.idMeal));
        } else {
           
            setSelectedMeals([...selectedMeals, meal]);
            setSelected(true)
        }

    };
    console.log(selectedMeals)

    return(
        <>
            {modalToggler &&  <ViewModal setModalToggler={setModalToggler} id={meal.idMeal} />}

            <div className={`meal-item ${selectedMeals.some(selectedMeal => selectedMeal.idMeal === meal.idMeal) ? "selected-meal" : ""}`} title={meal.strMeal} onClick={ClickMeal}>
                {selected &&  <input type='checkbox' className='item-checkbox' checked readOnly/> }
               
                <div className="img-wrapper">
                    <img src={meal.strMealThumb} alt="" />
                </div>
                
                <div className="info-wrapper">
                    <p>{truncateText(meal.strMeal)}</p>
                </div>

                <div className='button-wrapper'>
                    <button className='d-block mx-auto viewRecipeBtn' onClick={ViewRecipe}>View Recipe</button>
                </div>
                
            </div>
            
        </>
    )
}

export default MealItem