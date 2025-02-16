import './styles/reset.scss';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PropertiesPage from './components/PropertiesPage/PropertiesPage';
import PropertyDetailsPage from './components/PropertiesDetailsPage/PropertyDetailsPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProfilePage from "./components/ProfilePage/ProfilePage"
import SellerProfile from './components/SellerProfile';
import Test from './components/Test';
import Header from './components/HomePage/Header/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Header></Header>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/properties' element={<PropertiesPage></PropertiesPage>}></Route>
            <Route path="/property-details/:_id" element={<PropertyDetailsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path="/profile/:id" element={<SellerProfile />} />
            <Route path="/test" element={<Test></Test>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
