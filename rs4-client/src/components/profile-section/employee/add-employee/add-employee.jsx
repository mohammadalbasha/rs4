import { useState } from 'react';
import styles from './add-employee.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

export function AddEmployee({ showAddModal, hideAddModal, addEmployeeHandler }) {
  const { isLoading, error, success, sendRequest: addEmployee } = useHttp();

  const employeeRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //addEmployeeHandler();
      hideAddModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = 'http://localhost:8080/api/v1/central/centralUsers';
    addEmployee(
      {
        url,
        method: 'POST',
        body: JSON.stringify({
          name: employeeRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPass: confirmPassRef.current.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.addEmployee} ${showAddModal ? styles.active : ''}`}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {error && <Error error={error} />}
          <section className={`${styles.header} `}>
            <span className={`${styles.header__span} `}>اضافة</span>
            <a className={`${styles.header__add} `} onClick={hideAddModal}>
              <i
                className={`material-icons ${styles.header__add__icon} `}
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
                <input className={`${styles.content__textInput}`} ref={employeeRef} />
              </div>

              <div className={`${styles.content__inputField}`}>
                <div className={`${styles.content__inputField__spans}`}>
                  <span className={`${styles.content__inputField__spans__span}`}>ء </span>

                  <span className={`${styles.content__inputField__spans__span}`}>
                    البريد الاكتروني
                  </span>
                </div>
                <input className={`${styles.content__textInput}`} ref={emailRef} />
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
