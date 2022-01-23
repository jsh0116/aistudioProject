import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
// import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from "@material-ui/core/styles/makeStyles";

import config from '../config';
import BoardService from '../services/board-service';
import { Comment } from '../model/comment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUserName, setUserName } from '../modules/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 1.5, 0, 1.5),
  },
}));

function BoardContent() {
  const classes = useStyles();
  const location = useLocation();
  const { title, userinfo, content, file } = location.state;
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<Comment>({
      id: 1, name: '', text: ''
  });
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setUserName(userName));
    if(userinfo && userinfo.length > 0) {
      setName(userinfo[0].name);
      setEmail(userinfo[0].email);
    }
  }, []);

  const onSubmit = async () => {
    if (comment.text === '') {
      alert('댓글을 입력해주세요');
      return;
    }

    // const boardService = new BoardService();
    // const result = await boardService.uploadComment(comment);
    // if (result !== 'success') {
    //   setError(false);
    // }
  }

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <form className={classes.form} noValidate method='post'>
            <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" padding="5px">작성자: {name}({email})</Box>
            <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" padding="5px">제목 : {title}</Box>
            <Box display="flex" flexDirection="row">
              <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" width="80%" height="250px" padding="5px" marginTop="10px">발표자<br />{content}</Box>
              <Box m={1} />
              {/*<Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" width="20%" height="250px" padding="5px" marginTop="10px">
                슬라이드<br />
                {file && <img src={config.apiServer + '/uploads/' + file} alt=" " width="150px" height="200px" />}
                </Box>*/}
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" border="1px solid #dfdfdf">
              <Box width="150px">{userName}</Box>
              <Box marginLeft={1} />
              <Box width="100%">
                <TextField
                  variant="outlined"
                  fullWidth size="small"
                  value={comment.text}
                  onChange={e => {
                    let tempComment = { ...comment };
                    tempComment.text = e.target.value;
                    setComment(tempComment);
                  }}
                />
              </Box>
                <Box marginLeft={1} />
                <Box width="150px">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit}
                  >
                    보내기
                  </Button>
                </Box>
            </Box>
            <Box m={1} />
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                수정
              </Button>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                삭제
              </Button>
            </Box>
          </form>
        </div>
      </Container>
    )
}

export default BoardContent;