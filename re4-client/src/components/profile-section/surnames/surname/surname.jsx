import { useState } from 'react';
import { UpdateSurname } from '../update-surname/update-surname';
import styles from './surname.module.css';

export function Surname({ checked, checkHandler, surname, deleteHandler, setRefresh }) {
  // update modal realated functionality
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const showUpdateModalHandler = () => {
    setShowUpdateModal(true);
  };
  const hideUpdateModalHandler = () => {
    setShowUpdateModal(false);
    // refresh workflow could be better
    setRefresh(prev => !prev)
  };

  const checkChangeHandler = (e) => {
    checkHandler(e.target.checked);
  };
  return (
    <tr>
      <td>
        <span className={`material-icons ${styles.toolkit}`} onClick={deleteHandler}>
          close
        </span>

        <span className={`material-icons ${styles.toolkit}`} onClick={showUpdateModalHandler}>
          launch
        </span>
      </td>
      <td>
        {' '}
        <input type="checkbox" checked={checked} onChange={checkChangeHandler} />
      </td>
      <td>{surname?.locale == 'en' ? 'انجليزي' : 'عربي'}</td>
      <td>{surname?.surname}</td>
      <td>{surname?.id}</td>
      <UpdateSurname
        showUpdateModal={showUpdateModal}
        hideUpdateModal={hideUpdateModalHandler}
        surname={surname}
      />
    </tr>
  );
}
