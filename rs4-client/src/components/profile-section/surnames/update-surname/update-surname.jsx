import { useState } from 'react';
import styles from './update-surname.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

export function UpdateSurname({ showUpdateModal, hideUpdateModal, surname }) {
  const { isLoading, error, success, sendRequest: updateSurname } = useHttp();

  const [locale, setLocale] = useState(surname?.locale);
  const [surnameIn, setSurnameIn] = useState(surname?.surname);

  const localeHandler = (e, value) => {
    e.preventDefault();
    setLocale(value);
  };

  const SurnameInHandler = (e) => {
    e.preventDefault();
    setSurnameIn(e.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //updateSurnameHandler();
      hideUpdateModal();
    };

    console.log(surnameIn);
    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    const id = surname.id;
    let url = `http://localhost:8080/api/v1/central/surnames/${id}`;
    updateSurname(
      {
        url,
        method: 'Put',
        body: JSON.stringify({
          surname: surnameIn,
          locale
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.updateSurname} ${showUpdateModal ? styles.active : ''}`}>
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
            <form onSubmit={submitHandler}>
              <input
                className={`${styles.content__textInput}`}
                placeholder="اللقب"
                onChange={SurnameInHandler}
                value={surnameIn}
              />
              <div className={`${styles.content__localeButtons}`}>
                <button
                  className={`${styles.content__localeButtons__button} ${
                    locale == 'en' ? styles.content__localeButtons__button__active : ''
                  }`}
                  onClick={(e) => localeHandler(e, 'en')}>
                  انجليزي
                </button>
                <button
                  className={`${styles.content__localeButtons__button} ${
                    locale == 'ar' ? styles.content__localeButtons__button__active : ''
                  }`}
                  onClick={(e) => localeHandler(e, 'ar')}>
                  عربي
                </button>
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
