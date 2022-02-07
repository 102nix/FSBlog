import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
// Material UI:
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { backendInfo } from '../store/info'

const useStyles = makeStyles((theme) => ({
  currentArticleBody: {
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
      whiteSpace: 'pre-wrap'
    },
    boxShadow: '2px 3px 25px rgb(49, 49, 77)',
    color: '#fff',
    textIndent: '1.5em',
    marginBottom: '20px'
  }
}))

export const BEInfoComponent = () => {
  const classes = useStyles()
  return (
    <>
      <SubTitle>Backend, используем Node.js, Express, MongoDB:</SubTitle>
      <div className={classes.currentArticleBody}>
        <div>
          {
            backendInfo.map((info, i) => ((
              <Accordion key={i}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{info.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{info.body}</Typography>
                </AccordionDetails>
              </Accordion>
            )))
          }
        </div>
      </div>
    </>
  )
}