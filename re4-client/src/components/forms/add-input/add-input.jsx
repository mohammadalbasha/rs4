import styles from './add-input.module.css';

export function AddTextInput({
  label,
  indexKey,
  addFieldsChangeHandler,
  largeScreenWidth,
  placeholder,
  onLeaveHandler,
  onEnterHandler,
  required,
  value
}) {
  return (
    <>
      <div
        className={`${styles.adds__fieldsItems__fieldItem} ${
          largeScreenWidth == 'w50'
            ? styles['w-50']
            : largeScreenWidth == 'w25'
              ? styles['w-25']
              : ''
        }`}>
        <span className={`${styles.adds__fieldsItems__fieldItem__span}`}>
          {label}
          {required && (
            <div className={`${styles.tooltip}`}>
              <input type="checkbox" disabled="true" checked="true"></input>
              <span className={`${styles.tooltiptext}`}> هذا الحقل مطلوب </span>
            </div>
          )}
        </span>
        <input
          className={`${styles.adds__fieldsItems__fieldItem__input} `}
          value={value}
          onChange={(e) => {
            e.preventDefault();
            addFieldsChangeHandler(indexKey, e.target.value);
          }}
          onBlur={onLeaveHandler}
          onFocus={onEnterHandler}
          placeholder={placeholder}></input>
      </div>
    </>
  );
}

export function AddSelectInput({
  options,
  label,
  indexKey,
  addFieldsChangeHandler,
  largeScreenWidth
}) {
  return (
    <div
      className={`${styles.adds__fieldsItems__fieldItem} ${
        largeScreenWidth == 'w50' ? styles['w-50'] : largeScreenWidth == 'w25' ? styles['w-25'] : ''
      }`}>
      <span className={`${styles.adds__fieldsItems__fieldItem__span}`}>{label}</span>
      <select
        className={`${styles.adds__fieldsItems__fieldItem__input} ${styles.adds__fieldsItems__fieldItem__select}`}
        onClick={(e) => {
          e.preventDefault();
          addFieldsChangeHandler(indexKey, +e.target.value);
        }}>
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}

export function AddSelectButtonsInput({
  buttons,
  selectedValue,
  largeScreenWidth,
  label,
  required,
  addFieldsChangeHandler,
  indexKey
}) {
  return (
    <div
      className={`${styles.adds__fieldsItems__fieldItem} ${
        largeScreenWidth == 'w50' ? styles['w-50'] : largeScreenWidth == 'w25' ? styles['w-25'] : ''
      }`}>
      <span className={`${styles.adds__fieldsItems__fieldItem__span}`}>
        {label}
        {required && (
          <div className={`${styles.tooltip}`}>
            <input type="checkbox" disabled="true" checked="true"></input>
            <span className={`${styles.tooltiptext}`}> هذا الحقل مطلوب </span>
          </div>
        )}
      </span>
      <div className={` ${styles.content__localeButtons}`}>
        {buttons?.map((button) => {
          return (
            <button
              className={`${styles.content__localeButtons__button} ${
                button?.value == selectedValue ? styles.content__localeButtons__button__active : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                addFieldsChangeHandler(indexKey, button?.value);
              }}>
              {button?.placeholder}
            </button>
          );
        })}
      </div>
    </div>
  );
}
