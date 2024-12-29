import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Categories from "./pages/Categories/Categories"
import Home from "./pages/Home/Home"
import Recipe from "./pages/Recipe/Recipet"
import './styles/App.css'

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/categories" element={<Categories/>}></Route>
          <Route path="/recipe" element={<Recipe/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
