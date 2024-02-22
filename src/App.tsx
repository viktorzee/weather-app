import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";


function App() {
  return (
  
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Homepage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
