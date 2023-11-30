import { UpdateAttention } from '../update-attention/update-attention';
import { useState } from 'react';
import styles from './attention.module.css';

export function Attention({ checked, checkHandler, attention, deleteHandler }) {
  // update modal realated functionality
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const showUpdateModalHandler = () => {
    setShowUpdateModal(true);
  };
  const hideUpdateModalHandler = () => {
    setShowUpdateModal(false);
  };

  const checkChangeHandler = (e) => {
    checkHandler(e.target.checked);
  };
  return (
    <tr>
      <td>
        {' '}
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
      <td>{attention?.attendConfirmation ? 'نعم' : 'لا'}</td>
      <td>{attention?.email}</td>
      <td>{attention.whatsappNumber}</td>
      <td>{attention?.fullName}</td>
      <td>{attention?.createdAt}</td>
      <td>{attention?.id}</td>
      <UpdateAttention
        showAddModal={showUpdateModal}
        hideAddModal={hideUpdateModalHandler}
        attention={attention}
      />
    </tr>
  );
}
