import "./App.css";
import Header from "./components/Header/Header";
import Infopanel from "./components/Infopanel/Infopanel";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Home from "./pages/Workflows";
import Dictionary from './pages/Dictionary'
import Forms from './pages/Forms'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Routes,
  BrowserRouter,
} from "react-router-dom";
function App() {
  return (
    <>
      <div className="flex h-full">
        <Sidebar>
          <SidebarItem />
        </Sidebar>
        <div className="w-full">
          <Header />
          <Infopanel />
          <BrowserRouter>
            <Routes>
              <Route path="/workflow" element={<Home />} />
              <Route path="/dictionary" element={<Dictionary/>}/>
              <Route path="/forms" element={<Forms/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
