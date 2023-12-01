import React, { useState, useContext, useEffect } from 'react';
import styles from './navigation.module.css';
import AuthContext from '../../store/auth-context';
import { Link } from 'react-router-dom';

export const Navigation = ({ showSideNav, setShowSideNav }) => {
  const authCtx = useContext(AuthContext);

  // Show side navigation
  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setShowSideNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Selected tabs
  // selected link

  const [selectedTap, setSeletedTap] = useState('');
  const [selectedLink, setSelectedLink] = useState('');
  const selectedLinkHandler = (e, value) => {
    //e.preventDefault();
    setSelectedLink(value);
  };

  useEffect(() => {
    ['profile', 'day'].forEach((item) => {
      if (window.location.href.includes(item)) {
        setSeletedTap(item);
      }
    });
    ['attentions', 'general', 'surnames', 'groups', 'employees'].forEach((item) => {
      if (window.location.href.includes(item)) {
        setSelectedLink(item);
      }
    });
  }, []);

  // side drawer
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <>
      <section className={`${styles.appBarContainer} ${showSideNav ? styles.translateX : ''}`}>
        <div className={`${styles.hamburger} `} onClick={toggleSideNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`${styles.appBar}`}>
          <div className={`${styles.appBarNavContainer}`}>
            {authCtx.isLoggedIn && (
              <nav className={`${styles.appBarNav} `}>
                <li
                  className={`${styles.navItem}  ${
                    selectedTap == 'qrcode' ? styles.selectedTab : ''
                  } ${styles.navItem__qr} `}>
                  <a className={`${styles.navItem__qr__a} `}>
                    <span className={`${styles.navItem__qr__span}`}>qrcode </span>
                  </a>
                </li>
                <li
                  className={`${styles.navItem}  ${
                    selectedTap == 'day' ? styles.selectedTab : ''
                  } ${styles.navItem__day} `}>
                  <a className={`${styles.navItem__day__a} `}>
                    <span className={`material-icons ${styles.navItem__day__span}`}>
                      expand_more
                    </span>
                    <span className={`${styles.navItem__day__span}`}>يوم الحفل </span>
                  </a>
                  <div className={`${styles.navItem__day__dropdown}`}>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                  </div>
                </li>
                <li
                  className={`${styles.navItem}  ${
                    selectedTap == 'profile' ? styles.selectedTab : ''
                  } ${styles.navItem__profile} `}>
                  <a className={`${styles.navItem__profile__a} `}>
                    <span className={`material-icons ${styles.navItem__profile__span}`}>
                      expand_more
                    </span>
                    <span className={`${styles.navItem__profile__span}`}>لوحة التحكم</span>
                    <i className={`material-icons-outlined ${styles.navItem__profile__span}`}>
                      contact_mail
                    </i>
                  </a>
                  <div className={`${styles.navItem__profile__dropdown}`}>
                    <Link
                      onClick={(e) => {
                        selectedLinkHandler(e, 'attentions');
                      }}
                      className={`${styles.navItem__profile__dropdown__link} ${
                        selectedLink == 'attentions' ? styles.selectedLink : ''
                      }`}
                      to={'profile/attentions'}>
                      {' '}
                      ارسال الدعوات
                    </Link>
                    <Link
                      onClick={(e) => {
                        selectedLinkHandler(e, 'general');
                      }}
                      className={`${styles.navItem__profile__dropdown__link} ${
                        selectedLink == 'general' ? styles.selectedLink : ''
                      }`}
                      to={'profile/general'}>
                      الدعوات العامة
                    </Link>
                    <Link
                      onClick={(e) => {
                        selectedLinkHandler(e, 'surnames');
                      }}
                      className={`${styles.navItem__profile__dropdown__link} ${
                        selectedLink == 'surnames' ? styles.selectedLink : ''
                      }`}
                      to={'profile/surnames'}>
                      الالقاب
                    </Link>
                    <Link
                      onClick={(e) => {
                        selectedLinkHandler(e, 'groups');
                      }}
                      className={`${styles.navItem__profile__dropdown__link} ${
                        selectedLink == 'groups' ? styles.selectedLink : ''
                      }`}
                      to={'profile/groups'}>
                      الفئات
                    </Link>
                    <Link
                      onClick={(e) => {
                        selectedLinkHandler(e, 'employees');
                      }}
                      className={`${styles.navItem__profile__dropdown__link} ${
                        selectedLink == 'employees' ? styles.selectedLink : ''
                      }`}
                      to={'profile/employees'}>
                      إضافة موظفين
                    </Link>
                  </div>
                </li>
              </nav>
            )}
          </div>

          <div className={`${styles.logoContainer}`}>
            <img
              className={`${styles.logo}`}
              src="https://hstp-events.com/templates/jl_balder_pro/custom/images/logo.png"
            />
          </div>
        </div>
      </section>
      <div className={`${showSideNav ? styles.backdrop : ''}`} onClick={toggleSideNav}></div>

      <div className={`${styles.sideNav} ${showSideNav ? styles.sideNavActive : ''}`}>
        <nav className={styles['sideNav__items']}>
          <li
            className={` ${styles['sideNav__items__item']} ${styles.navItem}  ${
              selectedTap == 'profile' ? styles.selectedTab : ''
            } ${styles.navItem__profile} `}>
            <a className={`${styles.navItem__profile__a} `}>
              <i className={`material-icons-outlined ${styles.navItem__profile__span}`}>
                contact_mail
              </i>
              <span className={`${styles.navItem__profile__span}`}>لوحة التحكم</span>

              <span
                className={`material-icons ${styles.navItem__profile__span}`}
                onClick={() => {
                  setShowSideDrawer(true);
                }}>
                arrow_forward
              </span>
            </a>
            <div
              className={`${styles.navItem__profile__sideDrawer} ${
                showSideDrawer ? styles.navItem__profile__sideDrawer__active : ''
              }`}>
              <span
                className={`material-icons ${styles.navItem__profile__span}`}
                onClick={() => {
                  setShowSideDrawer(false);
                }}>
                arrow_back
              </span>

              <Link
                onClick={(e) => {
                  selectedLinkHandler(e, 'attentions');
                }}
                className={`${styles.navItem__profile__dropdown__link} ${
                  selectedLink == 'attentions' ? styles.selectedLink : ''
                }`}
                to={'profile/attentions'}>
                {' '}
                ارسال الدعوات
              </Link>
              <Link
                onClick={(e) => {
                  selectedLinkHandler(e, 'general');
                }}
                className={`${styles.navItem__profile__dropdown__link} ${
                  selectedLink == 'general' ? styles.selectedLink : ''
                }`}
                to={'profile/general'}>
                الدعوات العامة
              </Link>
              <Link
                onClick={(e) => {
                  selectedLinkHandler(e, 'surnames');
                }}
                className={`${styles.navItem__profile__dropdown__link} ${
                  selectedLink == 'surnames' ? styles.selectedLink : ''
                }`}
                to={'profile/surnames'}>
                الالقاب
              </Link>
              <Link
                onClick={(e) => {
                  selectedLinkHandler(e, 'groups');
                }}
                className={`${styles.navItem__profile__dropdown__link} ${
                  selectedLink == 'groups' ? styles.selectedLink : ''
                }`}
                to={'profile/groups'}>
                الفئات
              </Link>
              <Link
                onClick={(e) => {
                  selectedLinkHandler(e, 'employees');
                }}
                className={`${styles.navItem__profile__dropdown__link} ${
                  selectedLink == 'employees' ? styles.selectedLink : ''
                }`}
                to={'profile/employees'}>
                إضافة موظفين
              </Link>
            </div>
          </li>
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Content of the page */}
        {/* ... */}
      </div>
    </>
  );
};

export default Navigation;
