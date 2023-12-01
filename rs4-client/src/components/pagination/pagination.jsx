import styles from './pagination.module.css';

export function Pagination({
  pageCounts,
  selectedPage,
  selectedPageHandler,
  selectedItemsCountHandler,
  increasePage,
  decreasePage
}) {
  return (
    <>
      <div className={`${styles.attentionsItems__count}`}>
        <span className={`${styles.attentionsItems__count__span}`}>
          {`الصفحة ${selectedPage} من ${pageCounts}`}
        </span>
        <select
          className={`${styles.attentionsItems__count__select}`}
          onChange={selectedItemsCountHandler}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <span className={`${styles.attentionsItems__count__span}`}>اظهار</span>
      </div>
      <div className={`${styles.attentionsItems__pagination}`}>
        <ul className={`${styles.attentionsItems__pagination__list}`}>
          <li
            className={`${styles.attentionsItems__pagination__list__item} ${
              selectedPage > 1 ? styles.attentionsItems__pagination__list__item__active : ''
            }`}
            onClick={() => {
              selectedPageHandler(1);
            }}
          >
            <a>ابدأ</a>
          </li>
          <li
            className={`${styles.attentionsItems__pagination__list__item} ${
              selectedPage > 1 ? styles.attentionsItems__pagination__list__item__active : ''
            }`}
            onClick={decreasePage}
          >
            <a>السابق</a>
          </li>

          {[...Array(pageCounts)].map((item, index) => {
            return (
              <li
                className={`${styles.attentionsItems__pagination__list__item} ${
                  selectedPage != index + 1
                    ? styles.attentionsItems__pagination__list__item__active
                    : ''
                }`}
                onClick={() => {
                  selectedPageHandler(index + 1);
                }}
              >
                <a>{index + 1}</a>
              </li>
            );
          })}

          <li
            className={`${styles.attentionsItems__pagination__list__item} ${
              selectedPage < pageCounts
                ? styles.attentionsItems__pagination__list__item__active
                : ''
            }`}
            onClick={increasePage}
          >
            <a>التالي</a>
          </li>
          <li
            className={`${styles.attentionsItems__pagination__list__item} ${
              selectedPage != pageCounts
                ? styles.attentionsItems__pagination__list__item__active
                : ''
            }`}
            onClick={() => {
              selectedPageHandler(pageCounts);
            }}
          >
            <a>النهاية</a>
          </li>
        </ul>
      </div>
    </>
  );
}
