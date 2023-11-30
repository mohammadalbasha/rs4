import { useState } from 'react';
import { UpdateGroup } from '../update-group/update-group';
import styles from './group.module.css';
export function Group({ checked, checkHandler, group, deleteHandler }) {
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
      <td>
        <div
          style={{
            background: group?.color,
            width: 25,
            height: 25
          }}></div>
      </td>
      <td>{group?.group}</td>
      <td>{group?.id}</td>
      <UpdateGroup
        showUpdateModal={showUpdateModal}
        hideUpdateModal={hideUpdateModalHandler}
        group={group}
      />
    </tr>
  );
}
