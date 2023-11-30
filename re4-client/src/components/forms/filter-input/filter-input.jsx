import styles from './filter-input.module.css';

export function FilterTextInput({ label, indexKey, filterFieldsChangeHandler, value }) {
  console.log(label, indexKey);
  return (
    <>
      <div className={`${styles.filters__fieldsItems__fieldItem}`}>
        <span className={`${styles.filters__fieldsItems__fieldItem__span}`}>{label}</span>
        <input
          className={`${styles.filters__fieldsItems__fieldItem__input}`}
          onChange={(e) => {
            filterFieldsChangeHandler(indexKey, e.target.value);
          }}
          value={value}></input>
      </div>
    </>
  );
}

export function FilterSelectInput({ options, label, indexKey, filterFieldsChangeHandler }) {
  return (
    <>
      <div className={`${styles.filters__fieldsItems__fieldItem}`}>
        <span className={`${styles.filters__fieldsItems__fieldItem__span}`}>{label}</span>
        <select
          className={`${styles.filters__fieldsItems__fieldItem__input} ${styles.filters__fieldsItems__fieldItem__select}`}
          onChange={(e) => {
            filterFieldsChangeHandler(indexKey, e.target.value);
          }}>
          {options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
    </>
  );
}
