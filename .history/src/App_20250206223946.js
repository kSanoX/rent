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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes className="What">
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path='/properties' element={<PropertiesPage></PropertiesPage>}></Route>
            <Route path="/property-details/:_id" element={<PropertyDetailsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
