import axios from "axios"

const fetchData = async (url) =>{
    return axios.get(url)
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

const getAllCategories = async (req, res) =>{
    try {
        const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    
}
const getFilterByCategory = async (req, res) =>{

    let category = req.params.category
    console.log(category)
    try {
        const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    
}
export {getAllCategories,getFilterByCategory}
