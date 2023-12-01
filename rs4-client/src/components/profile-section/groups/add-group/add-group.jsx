import { useState } from 'react';
import ColorPicker from 'react-pick-color';
import styles from './add-group.module.css';
import { useRef } from 'react';
import  useHttp  from '../../../../hooks/use-http'
import Spinner from '../../../Spinner/spinner'
import  Error from '../../../Spinner/error'



function ColorPickerComponent({color, colorHandler, showColorPicker, hideColorPicker}){
  return (
    <div className={`${styles.colorPicker} ${showColorPicker ? styles.active : ''}`}>
      <section className={`${styles.header} `}>
        <span className={`${styles.header__span} `}>اللون</span>
        <a className={`${styles.header__add} `} onClick={hideColorPicker}>
          <i className={`material-icons ${styles.header__add__icon} `} style={{ fontSize: '20px', verticalAlign:"middle" }}>
            cancel
          </i>
        </a>
      </section>

     <ColorPicker color={color} onChange={color => colorHandler(color.hex)} />
 
    </div>
     )
}


export function AddGroup({ showAddModal, hideAddModal, addGroupHandler }) {
  const { isLoading, error, success, sendRequest: addGroup } = useHttp();


  const [color, setColor] = useState("#000");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const hideColorPicker = () => {
    setShowColorPicker(false);
  }

  const groupRef = useRef();
  const colorHandler = (value) => {
    setColor(value)
  }
  
  const submitHandler = (event) => {
    event.preventDefault();

    const responseHandler = (response) => {
      //addGroupHandler();
      hideAddModal();
    
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = 'http://localhost:8080/api/v1/central/groups';
    addGroup(
      {
        url,
        method: 'POST',
        body: JSON.stringify({
          group: groupRef.current.value,
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
    <div className={`${styles.addGroup} ${showAddModal ? styles.active : ''}`}>
            {isLoading && <Spinner />}

      {!isLoading && (
<>
 {showColorPicker && <ColorPickerComponent color={color} colorHandler={colorHandler} showColorPicker={setShowColorPicker} hideColorPicker={hideColorPicker}/>}
{error && <Error error={error}/>}
<section className={`${styles.header} `}>
        <span className={`${styles.header__span} `}>اضافة</span>
        <a className={`${styles.header__add} `} onClick={hideAddModal}>
          <i className={`material-icons ${styles.header__add__icon} `} style={{ fontSize: '20px', verticalAlign:"middle" }}>
            cancel
          </i>
        </a>
      </section>

      <section className={`${styles.content}`}>
       
      <form onSubmit={submitHandler}>
      
      <div className={`${styles.content__colorSection}`}>
      <div style={{
        background: color,
        cursor: "pointer",
        width: 25,
        height: 25,
        color: 'white'
      }} onClick={() => setShowColorPicker(true)}>
      </div>
      <span>اللون</span>

        
      </div>
        <input className={`${styles.content__textInput}`} placeholder='الفئة' ref={groupRef}/>
    
        <div className={`${styles.content__submitButton}`}>
          <button type='subimt' className={`${styles.content__submitButton__button} `} >حفظ</button>
        </div>
      </form>
      </section>
</>
      )

      }
         </div>
  );
}
