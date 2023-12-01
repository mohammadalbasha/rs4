import { useState, useEffect } from 'react';
import styles from './update-employee-permisions.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

export function UpdateEmployeePermisions({
  showUpdatePermisionsModal,
  hideUpdatePermisionsModal,
  employee
}) {
  const { isLoading, error, success, sendRequest: updateEmployeePermisions } = useHttp();

  // fetch permisions
  const [permisions, setPermisions] = useState([]);
  const {
    isLoading: isFetchingPermisions,
    error: fetchingPermisionsError,
    sendRequest: listPermisions
  } = useHttp();
  useEffect(() => {
    const responseHandler = (response) => {
      setPermisions(response);
      setSelected(employee.permisions?.map((permision) => permision.id));
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/auth/permisions`;
    listPermisions(
      {
        url,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  }, []);

  // selected permisions

  // selected invitaions related functionality
  const [selected, setSelected] = useState([]);
  const checkHandler = (id, value) => {
    if (value) {
      setSelected([...selected, id]);
    } else {
      setSelected((prev) => {
        return selected.filter((item) => item != id);
      });
    }
  };

  // update perimsions

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //updateEmployeePermisionsEmployeeHandler();
      hideUpdatePermisionsModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/auth/permisions/update-central-permisions`;
    updateEmployeePermisions(
      {
        url,
        method: 'Put',
        body: JSON.stringify({
          permisions: [...selected],
          userId: employee.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div
      className={`${styles.updateEmployeePermisions} ${
        showUpdatePermisionsModal ? styles.active : ''
      }`}>
      {(isLoading || isFetchingPermisions) && <Spinner />}

      {!(isLoading || isFetchingPermisions) && (
        <>
          {error && <Error error={error} />}
          {fetchingPermisionsError && <Error error={fetchingPermisionsError} />}

          <section className={`${styles.header} `}>
            <span className={`${styles.header__span} `}>الصلاحيات</span>
            <a
              className={`${styles.header__updateEmployeePermisions} `}
              onClick={hideUpdatePermisionsModal}>
              <i
                className={`material-icons ${styles.header__updateEmployeePermisions__icon} `}
                style={{ fontSize: '20px', verticalAlign: 'middle' }}>
                cancel
              </i>
            </a>
          </section>

          <section className={`${styles.content}`}>
            <form onSubmit={submitHandler}>
              <div className={`${styles.updateEmployeePermisions__fieldsItems}`}>
                {permisions?.map((permision) => {
                  return (
                    <div className={`${styles.updateEmployeePermisions__fieldsItems__fieldItem}`}>
                      <span>{permision.subject}</span>
                      <input
                        type="checkbox"
                        checked={selected.includes(permision.id)}
                        onChange={(e) => {
                          checkHandler(permision.id, e.target.checked);
                        }}
                      />
                    </div>
                  );
                })}
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
