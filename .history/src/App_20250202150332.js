import './styles/reset.scss';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import AuthPage from './components/AuthPage/AuthPage.jsx';
import RegisterPage from './components/AuthPage/RegisterPage.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PropertiesPage from './components/PropertiesPage/PropertiesPage';
import PropertyDetailsPage from './components/PropertiesDetailsPage/PropertyDetailsPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<AuthPage />} />
            <Route path='/properties' element={<PropertiesPage></PropertiesPage>}></Route>
            <Route path="/property-details/:_id" element={<PropertyDetailsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
