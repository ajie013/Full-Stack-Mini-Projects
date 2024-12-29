import 'bootstrap/dist/css/bootstrap.min.css'
import truncateText from '../../utils/truncateText';

interface MealItemProps {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
};


const MealItem: React.FC<MealItemProps> = ({idMeal, strMealThumb, strMeal}) =>{
    return(
        <>
            <div className="meal-item" title={strMeal}>
                <div className="img-wrapper">
                    <img src={strMealThumb} alt="" />
                </div>
                
                <div className="info-wrapper">
                    <p>{truncateText(strMeal)}</p>
                </div>

                <div className='button-wrapper'>
                    <button className='d-block mx-auto viewRecipeBtn'>View Recipe</button>
                </div>
                
            </div>
            
        </>
    )
}

export default MealItem