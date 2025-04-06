import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home/Home';
import GameDetails from './pages/GameDetails/GameDetails';
import Library from './pages/Library/Library';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useEffect } from 'react';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Force dark theme
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route
            path="/library"
            element={
              <SignedIn>
                <Library />
              </SignedIn>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </ClerkProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProviderWithRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;