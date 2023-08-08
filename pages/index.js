// pages/index.js
import SplashScreen from '../components/Splash/SplashScreen';
import LandingPage from '../components/Landing/LandingPage';
import Dashboard from '../components/Dashboard/Dashboard';

const Home = () => {
  return (
    <div>
      {/* <SplashScreen /> */}
      <LandingPage />
      <Dashboard />
    </div>
  );
};

export default Home;
