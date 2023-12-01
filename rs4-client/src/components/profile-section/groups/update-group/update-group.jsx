import { useState } from 'react';
import ColorPicker from 'react-pick-color';
import styles from './update-group.module.css';
import { useRef } from 'react';
import useHttp from '../../../../hooks/use-http';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';

function ColorPickerComponent({ color, colorHandler, showColorPicker, hideColorPicker }) {
  return (
    <div className={`${styles.colorPicker} ${showColorPicker ? styles.active : ''}`}>
      <section className={`${styles.header} `}>
        <span className={`${styles.header__span} `}>اللون</span>
        <a className={`${styles.header__update} `} onClick={hideColorPicker}>
          <i
            className={`material-icons ${styles.header__update__icon} `}
            style={{ fontSize: '20px', verticalAlign: 'middle' }}>
            cancel
          </i>
        </a>
      </section>

      <ColorPicker color={color} onChange={(color) => colorHandler(color.hex)} />
    </div>
  );
}

export function UpdateGroup({ showUpdateModal, hideUpdateModal, group }) {
  const { isLoading, error, success, sendRequest: updateGroup } = useHttp();

  const [color, setColor] = useState(group?.color);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const hideColorPicker = () => {
    setShowColorPicker(false);
  };

  const [groupIn, setGroupIn] = useState(group?.group);

  const colorHandler = (value) => {
    setColor(value);
  };

  const groupInHandler = (value) => {
    setGroupIn(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //updateGroupHandler();
      hideUpdateModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/groups/${group?.id}`;
    updateGroup(
      {
        url,
        method: 'Put',
        body: JSON.stringify({
          group: groupIn,
          color
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.updateGroup} ${showUpdateModal ? styles.active : ''}`}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {showColorPicker && (
            <ColorPickerComponent
              color={color}
              colorHandler={colorHandler}
              showColorPicker={setShowColorPicker}
              hideColorPicker={hideColorPicker}
            />
          )}
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
              <div className={`${styles.content__colorSection}`}>
                <div
                  style={{
                    background: color,
                    cursor: 'pointer',
                    width: 25,
                    height: 25,
                    color: 'white'
                  }}
                  onClick={() => setShowColorPicker(true)}></div>
                <span>اللون</span>
              </div>
              <input
                className={`${styles.content__textInput}`}
                placeholder="الفئة"
                onChange={groupInHandler}
                value={groupIn}
              />

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
