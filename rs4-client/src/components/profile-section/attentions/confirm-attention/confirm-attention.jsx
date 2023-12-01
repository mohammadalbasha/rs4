import { useState, useEffect } from 'react';
import useHttp from '../../../../hooks/use-http';
import {
  AddSelectButtonsInput,
  AddSelectInput,
  AddTextInput
} from '../../../forms/add-input/add-input';
import styles from './confirm-attention.module.css';
import Spinner from '../../../Spinner/spinner';
import Error from '../../../Spinner/error';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Success from '../../../Spinner/success';
export function ConfirmAttention() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = params.id;
  const serial = searchParams.get('serial');
  // filtering invitations related functionality
  const [addFields, setAddFields] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    entity: '',
    position: ''
  });

  // secondary surname
  const [attention, setAttention] = useState();
  const {
    isLoading: isFetchingAttention,
    error: fetchingAttentionError,
    sendRequest: fetchAttention
  } = useHttp();
  useEffect(() => {
    const responseHandler = (response) => {
      console.log(response);
      setAttention(response);
      setAddFields({
        email: response.email,
        fullName: response.fullName,
        whatsappNumber: response.whatsappNumber,
        entity: response.entity,
        position: response.position
      });
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";

    let url = `http://localhost:8080/api/v1/central/attentions/${id}/confirm`;
    fetchAttention(
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

  const addFieldsChangeHandler = (key, value) => {
    setAddFields((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };

  // add
  const { isLoading, error, success, sendRequest: confirmAttention } = useHttp();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(addFields);
    const responseHandler = (response) => {
      //addSurnameHandler();
      // navigate('/profile/attentions');
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/attentions/${id}/confirm`;
    console.log(JSON.stringify({ ...addFields, serial: serial, attendConfirmation: true }));
    confirmAttention(
      {
        url,
        method: 'Put',
        body: JSON.stringify({ ...addFields, serial: serial, attendConfirmation: true }),
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  };

  return (
    <div className={`${styles.confirmAttention} ${styles.active}`}>
      {(isLoading || isFetchingAttention) && <Spinner />}
      {!(isLoading || isFetchingAttention) && !success && (
        <>
          {error && <Error error={error} />}

          {fetchingAttentionError && <Error error={fetchingAttentionError} />}

          <section className={`${styles.header} `}>
            <p>
              نشكر لكم دعمكم ونسعد بحضوركم للجلسة الحوارية لتدشين برنامج تحول القطاع الصحي. لتأكيد
              الحضور؛ نأمل منكم التحقق من صحة بياناتكم الواردة أدناه:
            </p>
          </section>

          <section className={`${styles.content}`}>
            <h3 className={`${styles.content__heading}`}>البيانات </h3>
            <form onSubmit={submitHandler}>
              <div className={`${styles.add__fieldsItems}`}>
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
              </div>
              <div className={`${styles.content__submitButton}`}>
                <button type="subimt" className={`${styles.content__submitButton__button} `}>
                  تأكيد
                </button>
              </div>
            </form>
          </section>
        </>
      )}
      {!(isLoading || isFetchingAttention) && success && (
        <Success success={'تم التأكيد بنجاح, شكرا لكم'} />
      )}
    </div>
  );
}
