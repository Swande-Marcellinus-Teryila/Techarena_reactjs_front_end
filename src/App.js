
import './'
import './App.css';
import './css/styles.css'
import './css/admin.css'

//defualt imports for primereact
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//end of default imports for primereact
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useCountUp } from 'react-countup';

import MiniDrawer from './components/admin/dashboardMenu/DashboardMenu';
import AdminDashboard from './components/admin/index';


import Header from './components/header.jsx'
import Gallery from './components/gallery.jsx'
import RegForm from './components/create-student';

import EditUser from './components/edit';

import Index from './components/admin/roles/index.role';
import Create from './components/admin/roles/create.role';
import Edit from './components/admin/roles/edit.role';

/* course categories */
import CategoryIndex from './components/admin/course-categories/index.course-category';
import CreateCategory from './components/admin/course-categories/create.course-category';
import EditCategory from './components/admin/course-categories/edit.course-category';
/*departments*/
import DepartmentIndex from './components/admin/departments/index.department';
import CreateDepartment from './components/admin/departments/create.department';
import EditDepartment from './components/admin/departments/edit.department';
function App() {
  return (

    <div>
      <Router>

        <Routes>
          <Route exact path='/' element={<MiniDrawer panelcomponent={<AdminDashboard />} />} />
          <Route path='/tai/main/' element={<MiniDrawer panelcomponent={<AdminDashboard />} />} />
          <Route path="/tai/main/gallery" element={<MiniDrawer panelcomponent={<Gallery />} />} />


          <Route path='/tai/main/roles' element={<MiniDrawer panelcomponent={<Index />} />} />
          <Route path='/tai/main/roles/create' element={<MiniDrawer panelcomponent={<Create />} />} />
          <Route path='/tai/main/roles/edit/:id' element={<MiniDrawer panelcomponent={<Edit />} />} />

          /* COURSE categories */
          <Route path='/tai/main/course-categories' element={<MiniDrawer panelcomponent={<CategoryIndex />} />} />
          <Route path='/tai/main/course-categories/create' element={<MiniDrawer panelcomponent={<CreateCategory />} />} />
          <Route path='/tai/main/course-categories/edit/:id' element={<MiniDrawer panelcomponent={<EditCategory />} />} />

        /*Departments */
          <Route path='/tai/main/departments' element={<MiniDrawer panelcomponent={<DepartmentIndex />} />} />
          <Route path='/tai/main/departments/create' element={<MiniDrawer panelcomponent={<CreateDepartment />} />} />
          <Route path='/tai/main/departments/edit/:id' element={<MiniDrawer panelcomponent={<EditDepartment />} />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;
