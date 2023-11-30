import { React, useContext } from 'react';
import classes from './header.module.css';
import  AuthContext  from '../../store/auth-context';

export function Header({showSideNav}) {
  const authContext = useContext(AuthContext);

  return (
    <section className={`${classes.header } ${showSideNav ? classes.translateX : ''}`}>
      <div className={classes['logout']}>
        <a onClick={authContext.logout}>تسجيل الخروج</a>
      </div>
      <div className={classes['helloSupport']}>
        <span>مرحبا  {authContext.profile?.name},</span>
      </div>
    </section>
  );
}
