
import './'
import './App.css';
import './css/styles.css'

//defualt imports for primereact
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//end of default imports for primereact
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import MenubarDemo from './components/topbar.jsx';
import MiniDrawer from './dashboardMenu/DashboardMenu';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/header.jsx'
import Gallery from './components/gallery.jsx'
import RegForm from './components/create-student';
import Home from './components/home';
import EditUser from './components/edit';


function App() {
  return (
    <div>


      <Router>
      <MenubarDemo/>
      <MiniDrawer/>
        <Routes>
          <Route path = '/' element               = {<Home/>}/>
          <Route path      = "/gallery" element        = {<Gallery />} />
          <Route path      = '/create-student' element = {<RegForm/>}/>
          <Route path      = '/edit/:id' element       = {<EditUser/>}/>
        
         

        </Routes>
      </Router>
    </div>
  );
}

export default App;
