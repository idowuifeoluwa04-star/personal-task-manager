import { Routes, Route } from "react-router-dom";
import CoverPage from "./pages/CoverPage";
import MyTasks from "./pages/MyTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/new-task" element={<NewTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;
