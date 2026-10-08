import { BrowserRouter, Routes, Route } from "react-router-dom";


import PublicLayout from "../layoutsPublic/PublicLayouts";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "../components/common/ProtectedRoute";

// Public Website
import LandingPage from "../landing-page/LandingPage";
import PublicArticles from "../landing-page/Articles";
import ArticleDetail from "../landing-page/ArticleDetail";
import Team from "../landing-page/Team";
import Approach from "../landing-page/Approach";

// Auth
import Login from "../pages/Login";

// Error
import NotFound from "../pages/NotFound";


// Dashboard
import Dashboard from "../pages/Dashboard";
import Contacts from "../pages/DashboardContacts";


// Admin Articles
import Articles from "../pages/Articles/Articles";
import CreateArticle from "../pages/Articles/CreateArticle";
import EditArticle from "../pages/Articles/EditArticle";


// Categories
import Categories from "../pages/Categories";
import CreateCategory from "../pages/Categories/CreateCategory";
import EditCategory from "../pages/Categories/EditCategory";


// Users
import Users from "../pages/Users/Users";
import CreateUser from "../pages/Users/CreateUser";
import EditUser from "../pages/Users/EditUser";


// Services
import AdminServices from "../pages/Services/Services";
import CreateService from "../pages/Services/CreateService";
import EditService from "../pages/Services/EditService";


// Admin
import Settings from "../pages/Settings/Settings";
import AdminTeam from "../pages/Team";
import About from "../pages/About";
import TeamProfile from "../landing-page/TeamProfile";
import MFA from "../pages/Login/MFA/MFA";
import Feedback from "../pages/Feedback/Feedback";


export default function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

      
    <Route element={<PublicLayout />}>

          <Route
            index
            element={<LandingPage />}
          />


          <Route
            path="articles"
            element={<PublicArticles />}
          />


       <Route
  path="articles/:slug"
  element={<ArticleDetail />}
/>


          <Route
            path="team"
            element={<Team />}
          />

          <Route
 path="team/:slug"
 element={<TeamProfile />}
/>


          <Route
            path="approach"
            element={<Approach />}
          />
 <Route path="feedback" element={<Feedback />} />
        
        </Route>





        <Route
          path="/login"
          element={<Login />}
        />
<Route
  path="/login/mfa"
  element={<MFA />}
/>


       

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >


          

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />



         
          <Route
            path="/dashboard/about"
            element={<About />}
          />



         

          <Route
            path="/dashboard/contacts"
            element={<Contacts />}
          />



         

          <Route
            path="/dashboard/articles"
            element={<Articles />}
          />

          <Route
            path="/dashboard/articles/create"
            element={<CreateArticle />}
          />

          <Route
            path="/dashboard/articles/:id/edit"
            element={<EditArticle />}
          />



         

          <Route
            path="/dashboard/categories"
            element={<Categories />}
          />

          <Route
            path="/dashboard/categories/create"
            element={<CreateCategory />}
          />

          <Route
            path="/dashboard/categories/:id/edit"
            element={<EditCategory />}
          />




          <Route
            path="/dashboard/users"
            element={<Users />}
          />

          <Route
            path="/dashboard/users/create"
            element={<CreateUser />}
          />

          <Route
            path="/dashboard/users/:id/edit"
            element={<EditUser />}
          />



        

          <Route
            path="/dashboard/team"
            element={<AdminTeam />}
          />



          <Route
            path="/dashboard/settings"
            element={<Settings />}
          />




          <Route
            path="/dashboard/services"
            element={<AdminServices />}
          />

          <Route
            path="/dashboard/services/create"
            element={<CreateService />}
          />

          <Route
            path="/dashboard/services/:id/edit"
            element={<EditService />}
          />


        </Route>




        <Route
          path="*"
          element={<NotFound />}
        />


      </Routes>

    </BrowserRouter>
  );
}