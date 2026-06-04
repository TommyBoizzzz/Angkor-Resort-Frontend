import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room/:id" element={<RoomDetail />} />
    </Routes>
  );
}

export default App;