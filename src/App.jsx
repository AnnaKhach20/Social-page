import './styles/global.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import UsersPage from './Pages/UsersPage/UsersPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import LoginPage from './Pages/LoginPage/LoginPage';
import Navigation from './Components/layout/Navigation/Navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/reducers/authReducer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <div className="App">
            <Navigation />
            <div className="content">
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/users' element={<UsersPage />}/>
                    <Route path='/profile/:id' element={<ProfilePage />}/>
                    <Route path='/login' element={<LoginPage />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;