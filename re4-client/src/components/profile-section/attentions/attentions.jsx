import { useState, useEffect, useContext } from 'react';
import useHttp from '../../../hooks/use-http';
import styles from './attentions.module.css';
import axios from 'axios';
//import '../../../shared.css'
import { AddAttention } from './add-attention/add-attention';
import { Attention } from './attention/attenion';
import { Pagination } from '../../pagination/pagination';
import { FilterSelectInput, FilterTextInput } from '../../forms/filter-input/filter-input';
import AuthContext from '../../../store/auth-context';

export function Attentions() {
  const authCtx = useContext(AuthContext);

  const { isLoading, error, success, sendRequest: listAttentions } = useHttp();
  const [attentions, setAttentions] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  // add modal related functionality
  const [showAddModal, setShowAddModal] = useState(false);
  const showAddModalHandler = () => {
    setShowAddModal(true);
  };
  const hideAddModalHandler = () => {
    setShowAddModal(false);
  };

  // filtering invitations related functionality
  const [filterFields, setFilterFieldS] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    attendConfirmation: ''
  });

  const [reRender, setReRender] = useState(false);

  const confirmedOptions = [
    { value: '', label: 'الكل' },
    { value: 'true', label: 'نعم' },
    { value: 'false', label: 'لا' }
  ];

  const filterFieldsChangeHandler = (key, value) => {
    setFilterFieldS((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };
  let filterString = ``;
  for (let key in filterFields) {
    if (filterFields[key] != '') {
      //if (filterString != '?') filterString += '&';
      filterString += `&filter%5B${key}%5D=${filterFields[key]}`;
    }
  }

  // delete related functionality

  const {
    isLoading: isDeleting,
    error: deletionError,
    success: deletionSuccess,
    sendRequest: deleteAttentions
  } = useHttp();

  // selected invitaions related functionality
  const [selected, setSelected] = useState([]);
  const selectAllHandler = (event) => {
    if (event.target.checked) {
      setSelected([...attentions.map((attention) => attention.id)]);
    } else {
      setSelected([]);
    }
  };
  const checkHandler = (id, value) => {
    if (value) {
      setSelected([...selected, id]);
    } else {
      setSelected((prev) => {
        return selected.filter((item) => item != id);
      });
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (selected.length == 1) {
      const responseHandler = (response) => {
        setShowAddModal(false);
      };

      // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
      const id = selected[0];
      let url = `http://localhost:8080/api/v1/central/attentions/${id}`;
      deleteAttentions(
        {
          url,
          method: 'Delete'
        },
        responseHandler
      );
    } else {
      // delete many
      const responseHandler = (response) => {};
      let url = `http://localhost:8080/api/v1/central/attentions/delete-many`;
      deleteAttentions(
        {
          url,
          method: 'Post',
          body: JSON.stringify({
            id: [...selected]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        },
        responseHandler
      );
    }
  };
  // items count related functionality
  const [selectedItemsCount, setSelectedItemsCount] = useState(5);
  const selectedItemsCountHandler = (e) => {
    setSelectedItemsCount(e.target.value);
  };

  // pagination related functionality
  const [selectedPage, setSelectedPage] = useState(1);

  const selectedPageHandler = (value) => {
    setSelectedPage(value);
  };
  const increasePage = () => {
    setSelectedPage((prev) => prev + 1);
  };
  const decreasePage = () => {
    setSelectedPage((prev) => prev - 1);
  };

  useEffect(() => {
    const responseHandler = (response) => {
      setAttentions(response.data);
      setItemsCount(response.meta.count);
    };

    console.log(filterString);
    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/attentions?order%5Bfield%5D=id&order%5Bdirection%5D=asc&pagination%5Blimit%5D=${selectedItemsCount}&pagination%5Boffset%5D=${
      (selectedPage - 1) * selectedItemsCount
    }${filterString}`;
    console.log(url);

    listAttentions(
      {
        url,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      responseHandler
    );
  }, [selectedPage, selectedItemsCount, showAddModal, isDeleting, reRender]);

  const pageCounts = Math.floor(itemsCount / selectedItemsCount);

  // eport as an excel

  const initiateDownload = (blobData) => {
    const url = URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportHandler = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/central/attentions/download/all',
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${authCtx.tokens?.access_token}`
          }
        }
      );

      // Call the function to initiate the download
      initiateDownload(response.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <div className={`${styles.attentions} ${isDeleting || isLoading ? styles.isLoading : ''}`}>
        {error && <Error error={error} />}
        {deletionError && <Error error={deletionError} />}
        <section className={`${styles.toolkit}`}>
          <a className={`${styles.toolkit__add} `} onClick={showAddModalHandler}>
            <span className={`${styles.toolkit__add__span}`}>اضافة</span>
            <i
              className={`material-icons ${styles.toolkit__add__icon} `}
              style={{ fontSize: '20px' }}>
              add_circle
            </i>
          </a>
          <a className={`${styles.toolkit__add} `} onClick={exportHandler}>
            <span className={`${styles.toolkit__add__span}`}>اكسل</span>
            <i
              className={`material-icons ${styles.toolkit__add__icon} `}
              style={{ fontSize: '20px' }}>
              download
            </i>
          </a>

          {/* <span className={`${styles.toolkit__empty}`}>
            تفريغ حقول التصفية
        </span>
        <span className={`${styles.toolkit__search}`}>
            بحث
        </span> */}
        </section>
        <section className={`${styles.filters}`}>
          <div className={`${styles.filters__toolkit}`}>
            <span
              onClick={() => {
                setFilterFieldS({
                  fullName: '',
                  email: '',
                  whatsappNumber: '',
                  attendConfirmation: ''
                });
              }}
              className={`${styles.filters__toolkit__empty}`}>
              <span class="material-icons-outlined">switch_access_shortcut</span>
              تفريغ حقول التصفية
            </span>
            <span className={`${styles.filters__toolkit__search}`}>بحث</span>
          </div>
          <div className={`${styles.filters__fieldsItems}`}>
            {/* it is better to have a seperate component for input field */}

            <FilterTextInput
              label={'رقم الواتس آب'}
              indexKey={'whatsappNumber'}
              filterFieldsChangeHandler={filterFieldsChangeHandler}
              value={filterFields.whatsappNumber}
            />
            <FilterTextInput
              label={'  البريد الاكتروني'}
              indexKey={'email'}
              filterFieldsChangeHandler={filterFieldsChangeHandler}
              value={filterFields.email}
            />
            <FilterTextInput
              label={'الاسم'}
              indexKey={'fullName'}
              filterFieldsChangeHandler={filterFieldsChangeHandler}
              value={filterFields.fullName}
            />
            <FilterSelectInput
              options={confirmedOptions}
              label={'تأكيد الحضور'}
              indexKey={'attendConfirmation'}
              filterFieldsChangeHandler={filterFieldsChangeHandler}
              value={filterFields.attendConfirmation}
            />
          </div>
          <div className={`${styles.filters__go}`}>
            <button
              onClick={() => {
                setReRender((prev) => !prev);
              }}
              className={`${styles.filters__go__button}`}>
              اذهب
            </button>
          </div>
        </section>
        <section className={`${styles.attentionsItemsSection}`}>
          <table className={`tableItems`}>
            <tr>
              <th>
                {' '}
                <span className={`material-icons ${styles.toolkit}`} onClick={deleteHandler}>
                  close
                </span>
              </th>
              <th class="table-head">
                <input
                  type="checkbox"
                  checked={selected.length == attentions.length}
                  onChange={selectAllHandler}
                />
              </th>
              <th>تأكيد الحضور</th>
              <th>البريد الاكتروني</th>
              <th>رقم الواتس آب</th>
              <th>الاسم</th>
              <th>تاريخ الارسال</th>
              <th>م</th>
            </tr>
            {attentions.map((attention) => {
              return (
                <Attention
                  checked={selected.includes(attention?.id) ? true : false}
                  checkHandler={(value) => checkHandler(attention?.id, value)}
                  attention={attention}
                  key={attention?.id}
                  deleteHandler={deleteHandler}
                />
              );
            })}
          </table>
          <Pagination
            selectedItemsCountHandler={selectedItemsCountHandler}
            selectedPage={selectedPage}
            selectedPageHandler={selectedPageHandler}
            increasePage={increasePage}
            decreasePage={decreasePage}
            pageCounts={pageCounts}
          />
        </section>
      </div>

      <AddAttention showAddModal={showAddModal} hideAddModal={hideAddModalHandler} />
    </>
  );
}
