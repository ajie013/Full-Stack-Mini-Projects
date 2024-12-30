import axios from "axios"

const fetchData = (url) =>{
    return axios.get(url)
    .then((res) => {
        return res.data
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });
}

const getMealByName = async (req, res) =>{
    const inputName = req.params.name;
    try {
        const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputName}`);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    
}

const getMealById = async (req, res) =>{
    const inputId = req.params.id;
    try {
        const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${inputId}`);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    
}

export {getMealByName,getMealById}