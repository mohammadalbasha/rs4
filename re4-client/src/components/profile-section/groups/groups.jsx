import { useEffect, useState } from 'react';
import styles from './groups.module.css';
//import '../../../shared.css'
import { AddGroup } from './add-group/add-group';
import { Group } from './group/group';
import { Pagination } from '../../pagination/pagination';
import useHttp from '../../../hooks/use-http';
import Spinner from '../../Spinner/spinner';
import Error from '../../Spinner/error';

export function Groups() {
  const { isLoading, error, success, sendRequest: listGroups } = useHttp();
  const [groups, setGroups] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);

  const data = [1, 2, 3];

  // add modal related functionality
  const [showAddModal, setShowAddModal] = useState(false);
  const showAddModalHandler = () => {
    setShowAddModal(true);
  };
  const hideAddModalHandler = () => {
    setShowAddModal(false);
  };

  // delete related functionality

  const {
    isLoading: isDeleting,
    error: deletionError,
    success: deletionSuccess,
    sendRequest: deleteGroups
  } = useHttp();

  // selected invitaions related functionality
  const [selected, setSelected] = useState([]);
  const selectAllHandler = (event) => {
    if (event.target.checked) {
      setSelected([...groups.map((group) => group.id)]);
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
      const responseHandler = (response) => {};

      // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
      const id = selected[0];
      let url = `http://localhost:8080/api/v1/central/groups/${id}`;
      deleteGroups(
        {
          url,
          method: 'Delete'
        },
        responseHandler
      );
    } else {
      // delete many
      const responseHandler = (response) => {};
      let url = `http://localhost:8080/api/v1/central/groups/delete-many`;
      deleteGroups(
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
      setGroups(response.data);
      setItemsCount(response.meta.count);
      console.log(response);
    };

    // let url ="https://itravel-yymm.herokuapp.com/auth/signup";
    let url = `http://localhost:8080/api/v1/central/groups?order%5Bfield%5D=id&order%5Bdirection%5D=asc&pagination%5Blimit%5D=${selectedItemsCount}&pagination%5Boffset%5D=${
      (selectedPage - 1) * selectedItemsCount
    }`;
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
  }, [selectedPage, selectedItemsCount, showAddModal, isDeleting]);

  const pageCounts = Math.ceil(itemsCount / selectedItemsCount);

  return (
    <>
      <div className={`${styles.groups} ${isDeleting || isLoading ? styles.isLoading : ''}`}>
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

          {/* <span className={`${styles.toolkit__empty}`}>
            تفريغ حقول التصفية
        </span>
        <span className={`${styles.toolkit__search}`}>
            بحث
        </span> */}
        </section>

        <section className={`${styles.groupsItemsSection}`}>
          <table className={`tableItems`}>
            <tr>
              <th>
                <span className={`material-icons ${styles.toolkit}`} onClick={deleteHandler}>
                  close
                </span>
              </th>
              <th class="table-head">
                <input
                  type="checkbox"
                  checked={selected.length == groups?.length}
                  onChange={selectAllHandler}
                />
              </th>
              <th>اللون </th>
              <th>الفئة </th>
              <th>م</th>
            </tr>
            {groups.map((group) => {
              return (
                <Group
                  checked={selected.includes(group?.id) ? true : false}
                  checkHandler={(value) => checkHandler(group?.id, value)}
                  group={group}
                  key={group?.id}
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

      <AddGroup showAddModal={showAddModal} hideAddModal={hideAddModalHandler} />
    </>
  );
}
