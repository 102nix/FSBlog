import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { TextAreaField } from '../common/form/TextAreaField'
import { handleChange } from '../../static/funcsForForm'
import { getCurrentUserEmail } from '../../store/users'
import { createComment } from '../../store/comments'
// import { useAuth } from '../../hooks/useAuth'
// Material UI:
import { Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(style)': { m: 'auto', width: '100%' },
    display: 'flex',
    flexDirection: 'column'
  },
  divActions: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px'
  },
  errText: {
    color: '#eb4242'
  }
}))

export const AddCommentForm = ({ idArticle }) => {
  const currentUserEmail = useSelector(getCurrentUserEmail())
  const [data, setData] = useState({
    commentText: ''
  })
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validateScheme = yup.object().shape({
    commentText: yup.string().required('Комментарий не может быть пустым')
  })

  const validate = () => {
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    data.articleId = idArticle
    data.email = currentUserEmail
    data.date = new Date().toLocaleString()
    dispatch(createComment(data))
    setData(prevSate => ({
      ...prevSate,
      commentText: ''
    }))
  }

  return (
    <form
      component="form"
      className={ classes.root }
      noValidate
      autoComplete="off"
      onSubmit={(e) => handleSubmit(e)}
    >
      <TextAreaField
        label="Добавить комментарий:"
        id="commentText"
        type="text"
        name="commentText"
        value={data.commentText}
        error={errors.commentText}
        onChange={(target) => handleChange(setData, target)}
        placeholder="Содержание..."
      />
      <div className={classes.divActions}>
        <Button
          type="submit"
          variant="contained"
          color="inherit"
          endIcon={<SendIcon />}
        >
          Добавить комментарий
        </Button>
      </div>
    </form>
  )
}