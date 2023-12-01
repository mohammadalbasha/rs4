import { router } from './routes/routes';
import { RouterProvider } from 'react-router-dom';

function App() {
  // Show side nav
  // this st ate is a navigation related state , it is better to not be in the APP component
  // const [showSideNav, setShowSideNav] = useState(false);

  // const authCtx = useContext(AuthContext);

  return (
    <RouterProvider router={router} />

    // <div className={classes.App}>
    //   {authCtx.isLoggedIn && <Header />}

    //   <Navigation showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
    //   <div className={`${classes.main} ${showSideNav ? classes.translateX : ''}`}>
    //     {!authCtx.isLoggedIn && <Login />}
    //     {authCtx.isLoggedIn && <Attentions />}
    //   </div>
    // </div>
  );
}

// import React, { useState } from 'react';
// import styles from './App.module.css';

// const App = () => {
//   const [showSideNav, setShowSideNav] = useState(false);

//   const toggleSideNav = () => {
//     setShowSideNav(!showSideNav);
//   };

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>Header</header>

//       <div className={`${styles.sideNav} ${showSideNav ? styles.active : ''}`}>
//         {/* Side Navigation items */}
//         hello
//         {/* ... */}
//       </div>

//       <div className={styles.mainContent}>
//         {/* Content of the page */}
//         {/* ... */}
//       </div>

//       {/* Hamburger Icon */}
//       <div className={`${styles.hamburger} ${showSideNav ? styles.active : ''}`} onClick={toggleSideNav}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </div>
//   );
// };

export default App;
