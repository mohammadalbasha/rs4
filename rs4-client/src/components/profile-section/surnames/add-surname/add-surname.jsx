import { useState } from 'react';
import styles from './add-surname.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

export function AddSurname({ showAddModal, hideAddModal, addSurnameHandler }) {
  const { isLoading, error, success, sendRequest: addSurname } = useHttp();

  const [locale, setLocale] = useState('ar');

  const surnameRef = useRef();
  const localeHandler = (e, value) => {
    e.preventDefault();
    setLocale(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //addSurnameHandler();
      hideAddModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = 'http://localhost:8080/api/v1/central/surnames';
    addSurname(
      {
        url,
        method: 'POST',
        body: JSON.stringify({
          surname: surnameRef.current.value,
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
    <div className={`${styles.addSurname} ${showAddModal ? styles.active : ''}`}>
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
            <form onSubmit={submitHandler}>
              <input
                className={`${styles.content__textInput}`}
                placeholder="اللقب"
                ref={surnameRef}
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
