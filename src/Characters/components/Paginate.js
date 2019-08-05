import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { range as _range } from 'lodash-es'


export default function Paginate(props) {
  const classes = useStyles();

  const {
    hidden,
    pagesCount,
    currentPage,
    onSelect,
    onNext,
    onPrev,
  } = props


  if (hidden) {
    return null
  }

  const pageSelectOpt = _range(1, pagesCount + 1)
    .map(option => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))

  return (
    <Paper className={classes.root}>
      <IconButton
        color="primary"
        onClick={onPrev}
        disabled={currentPage === 1}
        className={classes.iconButton}
        aria-label="prev"
      >
        <KeyboardArrowLeft/>
      </IconButton>

      <Divider className={classes.divider}/>

      <TextField
        select
        value={currentPage}
        onChange={(evt) => onSelect(evt.target.value)}
      >
        {pageSelectOpt}
      </TextField>

      <Divider className={classes.divider}/>

      <IconButton
        color="primary"
        onClick={onNext}
        disabled={currentPage === pagesCount}
        className={classes.iconButton}
        aria-label="next"
      >
        <KeyboardArrowRight/>
      </IconButton>
    </Paper>
  )
}

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 145,
    margin: '80px auto 100px',
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});
