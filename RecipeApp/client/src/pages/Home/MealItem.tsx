interface MealItemProps {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
};


const MealItem: React.FC<MealItemProps> = ({idMeal, strMealThumb, strMeal}) =>{
    return(
        <>
            <div className="meal-item">
                <div className="img-wrapper">
                    <img src={strMealThumb} alt="" />
                </div>
                
                <div className="info-wrapper">
                    <p>{strMeal}</p>
                </div>
            </div>
            
        </>
    )
}

export default MealItem