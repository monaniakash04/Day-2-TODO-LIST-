import { Home } from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import TODO from "./Components/TODO";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
 
  return (
    <>
  
      <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/todo" element={<TODO/>}/>
      </Routes>
  
     
    </>
  );
}

export default App;
