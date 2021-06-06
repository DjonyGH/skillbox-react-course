import React, { ChangeEvent, FormEvent, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TRootState, updateComment } from '../../../store/reducer'
import { commentContext } from '../../context/commentContext'
import { CommentForm } from '../CommentForm/CommentForm'
import styles from './commentform.css'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'

interface ICommentFormContainer {
  refCommentInput: React.RefObject<HTMLTextAreaElement>
}

interface IComment {
  comment: string
}

export const CommentFormContainer: React.FC<ICommentFormContainer> = ({ refCommentInput }) => {
  const value = useSelector<TRootState, string>((state) => state.commentText)
  const dispatch = useDispatch()
  const initialValuesForm: IComment = { comment: value }
  const validationSchema = Yup.object().shape({
    comment: Yup.string().min(3, 'Минимум 3 символа').required('Обязательное поле'),
  })

  return (
    <Formik
      initialValues={initialValuesForm}
      enableReinitialize
      validateOnBlur
      onSubmit={(value) => {
        console.log(value)
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, isValid, handleChange, handleBlur, handleSubmit }: FormikProps<IComment>) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            ref={refCommentInput}
            name={'comment'}
            className={[styles.input, errors.comment && touched.comment && styles.error].join(' ')}
            value={values.comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              handleChange(e)
              dispatch(updateComment(e.target.value))
            }}
            onBlur={handleBlur}
          ></textarea>
          {errors.comment && console.log('Ошибка ввода данных:', errors.comment)}
          <div className={styles.controls}>
            <div className={styles.buttons}></div>
            <button type='submit' disabled={!isValid} className={styles.button}>
              Комментировать
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}
