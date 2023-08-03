// components/SplashScreen.js
import { useEffect, useState } from 'react';
import styles from './SplashScreen.module.css'; // Import CSS file
import ColorEffect from './ColorEffect';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set showSplash to false after the animation ends
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Change 4000 to the total duration of your animation in milliseconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {showSplash && (
        <div className={`bg-black min-h-screen flex items-center justify-center text-white ${styles['splash-screen']} ${styles.fadeOut}`}>
          <div className="relative isolate px-6 lg:px-8">
            {/* Color */}
            <ColorEffect />

            {/* Logos */}
            <div className={styles['logo-container']}>
              {/* First logo */}
              <img src="/logo1.png" alt="Logo 1" className={`${styles.logo} ${styles['logo-1']}`} />
              {/* Second logo (hidden initially) */}

              <img src="/logo2.png" alt="Logo 2" className={`${styles.logo} ${styles['logo-2']}`} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SplashScreen;
