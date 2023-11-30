import { useState, useContext } from 'react';
import styles from './login.module.css';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import Spinner from '../Spinner/spinner';
import Error from '../Spinner/error';

import { useNavigate } from 'react-router-dom';

export function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const changeHandler = (key, value) => {
    setCredentials((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };

  //  const history = useHistory();
  const navigate = useNavigate(); // react router 6
  const authCtx = useContext(AuthContext);
  const { isLoading, error, success, sendRequest: login } = useHttp();

  console.log(authCtx.ability, authCtx.profile);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    //  history.push("/signUp");
    //  navigate('/signUp'); react router 6
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const { email, password } = credentials;

    const responseHandler = (response) => {
      authCtx.login(response.tokens, response.user, response.ability);

      //authCtx.profileHandler(response.user)
      //  history.replace("/main");
      navigate('/'); // reactt router 6
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = 'http://localhost:8080/api/v1/central/auth/login';
    login(
      {
        url,
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={`${styles.login}`}>
          {/* {error && <p className={styles.error}>{error}</p>} */}
          {error && <Error error={error} />}

          <form onSubmit={submitHandler}>
            <div className={`${styles.fieldItem}`}>
              <span className={`${styles.fieldItem__span}`}> * البريد الاكتروني </span>
              <input
                className={`${styles.fieldItem__input}`}
                onChange={(e) => {
                  changeHandler('email', e.target.value);
                }}></input>
            </div>

            <div className={`${styles.fieldItem}`}>
              <span className={`${styles.fieldItem__span}`}> * كلمة المرور </span>
              <input
                className={`${styles.fieldItem__input}`}
                type="password"
                onChange={(e) => {
                  changeHandler('password', e.target.value);
                }}></input>
            </div>

            <div className={styles.fieldItem__checkbox}>
              <span className={`${styles.fieldItem__span}`}> تذكرني </span>
              <input type="checkbox" />
            </div>

            <div className={styles.fieldItem}>
              <button type="submit" className={`${styles.submitButton}`}>
                تسحيل الدخول
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
