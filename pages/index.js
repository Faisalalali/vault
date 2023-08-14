// pages/index.js
import SplashScreen from '../components/Splash/SplashScreen';
import LandingPage from '../components/Landing/LandingPage';
import Dashboard from '../components/Dashboard/Dashboard';

import Collection from '@/models/Collection';
import dbConnect from '@/lib/dbConnect';

export default function Home({ collections }) {
  return (
    <div>
      {/* <SplashScreen /> */}
      <LandingPage />
      <Dashboard collections={collections} />
    </div>
  );
};


export async function getServerSideProps() {
  await dbConnect();

  const collections = await Collection.find({}).populate("items");

  // Convert Date objects to strings
  const collectionsJSON = JSON.parse(JSON.stringify(collections));

  return {
    props: { collections: collectionsJSON },
  };
}
