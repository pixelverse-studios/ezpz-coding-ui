import { ChangeEventHandler } from 'react'
import { inputType } from '../../../../utilities/types/formTypes'
import styles from './FormField.module.scss'

type StringFieldProps = {
    field: inputType
    type: 'text' | 'email'
    id: string
    name: string
    placeholder: string
    onChange: ChangeEventHandler
    required?: boolean
    minLength?: number
    title?: string
    theme: 'light' | 'dark'
}

const StringField = ({
    field,
    type,
    id,
    name,
    placeholder,
    onChange,
    required,
    title,
    minLength,
    theme
}: StringFieldProps) => {
    return (
        <div
            className={`${styles.FormField} ${
                theme === 'dark' ? styles.dark : styles.light
            }`}>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={field?.value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                title={title}
            />
            <label
                className={field?.error ? styles.errorLabel : ''}
                htmlFor={id}>
                {placeholder}
            </label>
            {field?.error ? (
                <div className={styles.errorPopUp}>
                    <span className={styles.popUpText}>{field.error}</span>
                </div>
            ) : null}
        </div>
    )
}

export default StringField
