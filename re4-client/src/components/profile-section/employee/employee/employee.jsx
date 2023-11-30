import { useState } from 'react';
import { UpdateEmployee } from '../update-employee/update-employee';
import { UpdateEmployeePermisions } from '../update-employee-permisions/update-employee-permisions';

import styles from './employee.module.css';

export function Employee({ checked, checkHandler, employee, deleteHandler }) {
  // update modal realated functionality
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const showUpdateModalHandler = () => {
    setShowUpdateModal(true);
  };
  const hideUpdateModalHandler = () => {
    setShowUpdateModal(false);
  };

  // update modal realated functionality
  const [showUpdatePermisionsModal, setShowUpdatePermisionsModal] = useState(false);
  const showUpdatePermisionsModalHandler = () => {
    setShowUpdatePermisionsModal(true);
  };
  const hideUpdatePermisionsModalHandler = () => {
    setShowUpdatePermisionsModal(false);
  };

  const checkChangeHandler = (e) => {
    checkHandler(e.target.checked);
  };
  return (
    <tr>
      <td>
        <span
          className={`material-icons ${styles.toolkit}`}
          onClick={showUpdatePermisionsModalHandler}>
          person
        </span>
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
      <td>{employee?.email}</td>
      <td>{employee?.name}</td>
      <td>{employee?.id}</td>
      <UpdateEmployee
        showUpdateModal={showUpdateModal}
        hideUpdateModal={hideUpdateModalHandler}
        employee={employee}
      />
      <UpdateEmployeePermisions
        showUpdatePermisionsModal={showUpdatePermisionsModal}
        hideUpdatePermisionsModal={hideUpdatePermisionsModalHandler}
        employee={employee}
      />
    </tr>
  );
}
