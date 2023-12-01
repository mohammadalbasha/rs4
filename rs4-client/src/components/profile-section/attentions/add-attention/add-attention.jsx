import { useState, useEffect } from 'react';
import useHttp from '../../../../hooks/use-http';
import {
  AddSelectButtonsInput,
  AddSelectInput,
  AddTextInput
} from '../../../forms/add-input/add-input';
import styles from './add-attention.module.css';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';
export function AddAttention({ showAddModal, hideAddModal }) {
  // filtering invitations related functionality
  const [addFields, setAddFields] = useState({
    primarySurname: 'ma3ali',
    secondarySurnameId: 0,
    fullName: '',
    email: '',
    whatsappNumber: '',
    alternativeEmails: '',
    entity: '',
    position: '',
    locale: 'ar',
    sendEmail: true,
    sendWhatsapp: false,
    attendConfirmation: false,
    groupId: 0
  });

  // secondary surname
  const [secondarySurnames, setSecondarySurnames] = useState([]);
  const {
    isLoading: isFetchingSurnames,
    error: fetchingSurnamesError,
    sendRequest: listSurnames
  } = useHttp();
  useEffect(() => {
    const responseHandler = (response) => {
      setSecondarySurnames(response.data);
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/surnames`;
    listSurnames(
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
  const secondarySurnameOptions = secondarySurnames.map((item) => {
    return {
      label: item.surname,
      value: item.id
    };
  });

  // primary surname

  const primarySurnameOptions = [
    {
      placeholder: 'معالي',
      value: 'ma3ali'
    },
    {
      placeholder: 'سعادة',
      value: 'sa3adt'
    },
    {
      placeholder: 'mr',
      value: 'mr'
    },
    {
      placeholder: 'Your Excellency',
      value: 'yourExcellency'
    }
  ];

  // group
  // secondary surname
  const [groups, setGroups] = useState([]);
  const {
    isLoading: isFetchingGroups,
    error: fetchingGroupsError,
    sendRequest: listGroups
  } = useHttp();
  useEffect(() => {
    const responseHandler = (response) => {
      setGroups(response.data);
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/groups`;
    listGroups(
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
  const groupOptions = groups.map((item) => {
    return {
      label: item.group,
      value: item.id
    };
  });

  //  locale

  const localeOptions = [
    {
      placeholder: 'انجليزي',
      value: 'en'
    },
    {
      placeholder: 'عربي',
      value: 'ar'
    }
  ];

  //  send email

  const sendEmailOptions = [
    {
      placeholder: 'لا',
      value: false
    },
    {
      placeholder: 'نعم',
      value: true
    }
  ];

  //  send whatsapp

  const sendWhatsappOptions = [
    {
      placeholder: 'لا',
      value: false
    },
    {
      placeholder: 'نعم',
      value: true
    }
  ];

  //  attend confirmation

  const attendConfirmationOptions = [
    {
      placeholder: 'نعم',
      value: true
    },
    {
      placeholder: 'لا',
      value: false
    }
  ];

  const addFieldsChangeHandler = (key, value) => {
    setAddFields((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };

  // add
  const { isLoading, error, success, sendRequest: addAttention } = useHttp();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(addFields);
    const responseHandler = (response) => {
      //addSurnameHandler();
      hideAddModal();
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = 'http://localhost:8080/api/v1/central/attentions';
    addAttention(
      {
        url,
        method: 'POST',
        body: JSON.stringify(addFields),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.addAttention} ${showAddModal ? styles.active : ''}`}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          {error && <Error error={error} />}

          <section className={`${styles.header} `}>
            <span className={`${styles.header__span} `}>اضافة</span>
            <a className={`${styles.header__add} `} onClick={hideAddModal}>
              <i
                className={`material-icons ${styles.header__add__icon} `}
                style={{ fontSize: '20px' }}>
                cancel
              </i>
            </a>
          </section>

          <section className={`${styles.content}`}>
            <h3 className={`${styles.content__heading}`}>معلومات المدعو</h3>
            <form onSubmit={submitHandler}>
              <div className={`${styles.add__fieldsItems}`}>
                <AddSelectButtonsInput
                  label={'اللقب'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={primarySurnameOptions}
                  indexKey={'primarySurname'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.primarySurname}
                />

                <AddSelectInput
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  label={'القب 2'}
                  indexKey={'secondarySurnameId'}
                  largeScreenWidth="w50"
                  options={secondarySurnameOptions}
                  value={addFields.secondarySurnameId}
                />

                <AddTextInput
                  label={' الاسم الكامل'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'fullName'}
                  largeScreenWidth="w50"
                  required="true"
                  value={addFields.fullName}
                />

                <AddTextInput
                  label={'البريد الاكتروني'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'email'}
                  largeScreenWidth="w50"
                  onLeaveHandler={() => {
                    //checkEmail();
                  }}
                  value={addFields.email}
                />

                <AddTextInput
                  label={'بريد الكتروني اضافي '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'alternativeEmails'}
                  placeholder="يمكن وضع أكثر من بريد الكتروني مع فاصلة"
                  largeScreenWidth="w50"
                  onLeaveHandler={() => {
                    //checkEmail();
                  }}
                  value={addFields.alternativeEmails}
                />

                <AddTextInput
                  label={'الجهة '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'entity'}
                  largeScreenWidth="w50"
                  value={addFields.entity}
                />
                <AddTextInput
                  label={'رقم الواتساب  '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'whatsappNumber'}
                  largeScreenWidth="w50"
                  onLeaveHandler={() => {
                    //checkNumber();
                  }}
                  onEnterHandler={() => {
                    //checkNumber();
                  }}
                  value={addFields.whatsappNumber}
                />

                <AddTextInput
                  label={'المنصب '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  indexKey={'position'}
                  largeScreenWidth="w50"
                  value={addFields.position}
                />
                <AddSelectInput
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  label={'الفئة'}
                  indexKey={'groupId'}
                  largeScreenWidth="w50"
                  options={groupOptions}
                />
                <AddSelectButtonsInput
                  label={'لغة الدعوة'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={localeOptions}
                  indexKey={'locale'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.locale}
                />
                <AddSelectButtonsInput
                  label={'ارسال بريد '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={sendEmailOptions}
                  indexKey={'sendEmail'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.sendEmail}
                />

                <AddSelectButtonsInput
                  label={'ارسال whatsapp '}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={sendWhatsappOptions}
                  indexKey={'sendWhatsapp'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.sendWhatsapp}
                />

                <AddSelectButtonsInput
                  label={'تأكيد الحضور'}
                  addFieldsChangeHandler={addFieldsChangeHandler}
                  buttons={attendConfirmationOptions}
                  indexKey={'attendConfirmation'}
                  largeScreenWidth="w50"
                  selectedValue={addFields.attendConfirmation}
                />
              </div>
              <div className={`${styles.content__submitButton}`}>
                <button type="subimt" className={`${styles.content__submitButton__button} `}>
                  ارسال
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
