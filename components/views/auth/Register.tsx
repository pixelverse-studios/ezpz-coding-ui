import { useState, FormEvent, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { showBanner } from '../../../lib/redux/slices/banner'
import useForm from '../../../utilities/hooks/useForm'
import { StringField, FormRow, PasswordField } from '../../form'
import { FormProps } from '../../../utilities/types/formTypes'
import { JWT_SECRET } from '../../../utilities/constants'
import FormValidations from '../../../utilities/validations/forms'
import styles from './AuthPages.module.scss'
import { AppDispatch } from '../../../lib/redux/store'
import { REGISTER } from '../../../lib/gql/mutations/users'
import CircleLoader from '../../loader/circle'
import { setLoading, setProfile } from '../../../lib/redux/slices/user'

const INITIAL_STATE = {
    firstName: { value: '', error: '' },
    lastName: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' }
} as FormProps

const VALIDATIONS = {
    firstName: FormValidations.validAlphaString,
    lastName: FormValidations.validAlphaString,
    email: FormValidations.validEmail,
    password: FormValidations.validPassword
}

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const user = useSelector((state: any) => state.user)
    const { form, handleChange, handleReset } = useForm(
        INITIAL_STATE,
        VALIDATIONS
    )

    const { firstName, lastName, email, password } = form
    const [disableSubmit, setDisableSubmit] = useState<boolean>(true)

    const [register] = useMutation(REGISTER, {
        onCompleted({ register: data }) {
            if (data.__typename === 'Errors') {
                dispatch(
                    showBanner({
                        message: data.message,
                        type: data.__typename
                    })
                )
            } else {
                const profile = { ...data }
                const token = data.token
                localStorage.setItem(JWT_SECRET, token)

                delete profile.__typename
                delete profile.successType
                delete profile.token

                dispatch(setProfile(profile))
                dispatch(
                    showBanner({
                        message: 'User created in successfully',
                        type: data.__typename
                    })
                )

                handleReset()
            }
            dispatch(setLoading(false))
            router.push('/dashboard')
        },
        onError(err: any) {
            dispatch(setLoading(false))
            dispatch(
                showBanner({
                    type: 'Errors',
                    message:
                        'We are experiencing technical difficulties. Please try again, or reach out for assistance at info@ezpzcoding.com'
                })
            )
        },
        variables: {
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setLoading(true))
        register()
    }

    useEffect(() => {
        let isFormValid = true
        Object.keys(form).forEach(item => {
            const current = form[item]
            if ((isFormValid && !current.value) || current.error) {
                isFormValid = false
            }
        })

        setDisableSubmit(!isFormValid)
    })

    return (
        <div className={styles.content}>
            <div className={styles.formContainer}>
                <h1 className={styles.header}>Register</h1>
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={user?.loading}>
                        <FormRow>
                            <StringField
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                field={firstName}
                                onChange={handleChange}
                                required
                            />
                            <StringField
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                field={lastName}
                                onChange={handleChange}
                                required
                            />
                        </FormRow>
                        <FormRow>
                            <StringField
                                field={email}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required
                            />
                        </FormRow>
                        <FormRow>
                            <PasswordField
                                id="password"
                                name="password"
                                placeholder="Password"
                                field={password}
                                onChange={handleChange}
                                minLength={8}
                                title="Custom"
                                showMessage={true}
                            />
                        </FormRow>
                        <button
                            className={styles.button}
                            type="submit"
                            disabled={disableSubmit}>
                            {user?.loading ? <CircleLoader /> : 'Submit'}
                        </button>
                        <div className={styles.option}>
                            Already a user?
                            <Link href="/login">
                                <a className={styles.signIn}> Sign In</a>
                            </Link>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Register
