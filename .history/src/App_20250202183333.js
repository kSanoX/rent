import './styles/reset.scss';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PropertiesPage from './components/PropertiesPage/PropertiesPage';
import PropertyDetailsPage from './components/PropertiesDetailsPage/PropertyDetailsPage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import SignUp from './components/Auth/SignUp';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
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
