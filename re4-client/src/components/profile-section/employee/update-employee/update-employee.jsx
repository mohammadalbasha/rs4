import { useState } from 'react';
import styles from './update-employee.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

export function UpdateEmployee({ showUpdateModal, hideUpdateModal, employee }) {
  const { isLoading, error, success, sendRequest: updateEmployee } = useHttp();

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const nameChangeHandler = (e) => {
    console.log(e);
    e.preventDefault();
    setName(e.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //updateEmployeeHandler();
      hideUpdateModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/centralUsers/${employee.id}`;
    updateEmployee(
      {
        url,
        method: 'Put',
        body: JSON.stringify({
          name,
          email,
          ...(passwordRef.current?.value?.length > 0 && {
            password: passwordRef.current.value,
            confirmPass: confirmPassRef.current.value
          })
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.updateEmployee} ${showUpdateModal ? styles.active : ''}`}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {error && <Error error={error} />}
          <section className={`${styles.header} `}>
            <span className={`${styles.header__span} `}>تحرير</span>
            <a className={`${styles.header__update} `} onClick={hideUpdateModal}>
              <i
                className={`material-icons ${styles.header__update__icon} `}
                style={{ fontSize: '20px', verticalAlign: 'middle' }}>
                cancel
              </i>
            </a>
          </section>

          <section className={`${styles.content}`}>
            <h3 className={`${styles.content__heading}`}>معلومات المدعو</h3>

            <form onSubmit={submitHandler}>
              <div className={`${styles.content__inputField}`}>
                <div className={`${styles.content__inputField__spans}`}>
                  <span className={`${styles.content__inputField__spans__span}`}>ء </span>

                  <span className={`${styles.content__inputField__spans__span}`}>اسم الموظف</span>
                </div>
                <input
                  className={`${styles.content__textInput}`}
                  value={name}
                  onChange={nameChangeHandler}
                />
              </div>

              <div className={`${styles.content__inputField}`}>
                <div className={`${styles.content__inputField__spans}`}>
                  <span className={`${styles.content__inputField__spans__span}`}>ء </span>

                  <span className={`${styles.content__inputField__spans__span}`}>
                    البريد الاكتروني
                  </span>
                </div>
                <input
                  className={`${styles.content__textInput}`}
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>

              <div className={`${styles.content__inputField}`}>
                <div className={`${styles.content__inputField__spans}`}>
                  <span className={`${styles.content__inputField__spans__span}`}>ء </span>

                  <span className={`${styles.content__inputField__spans__span}`}>كلمة المرور </span>
                </div>
                <input
                  type="password"
                  className={`${styles.content__textInput}`}
                  ref={passwordRef}
                />
              </div>

              <div className={`${styles.content__inputField}`}>
                <div className={`${styles.content__inputField__spans}`}>
                  <span className={`${styles.content__inputField__spans__span}`}>
                    {' '}
                    تأكيد كلمة المرور
                  </span>
                  <span className={`${styles.content__inputField__spans__span}`}> </span>
                </div>
                <input
                  type="password"
                  className={`${styles.content__textInput}`}
                  ref={confirmPassRef}
                />
              </div>

              <div className={`${styles.content__submitButton}`}>
                <button type="subimt" className={`${styles.content__submitButton__button} `}>
                  حفظ
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
