import { Routes, Route } from "react-router-dom";
import CoverPage from "./pages/CoverPage";
import MyTasks from "./pages/MyTasks";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/my-tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
      <Route path="/new-task" element={<ProtectedRoute><NewTask /></ProtectedRoute>} />
      <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
