import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
// import Typography from "@material-ui/core/Typography"
import Container from '@material-ui/core/Container';
// import TableContainer from '@material-ui/core/TableContainer';
// import Table from '@material-ui/core/Table';
// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
import makeStyles from "@material-ui/core/styles/makeStyles";

import AIStudioService from '../services/aiStudio-service';
import { Comment } from '../model/comment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectUserName, setUserName } from '../modules/user';
import { getAppId, getUuid, getKey, getTextScript, setClientToken, setToken, setKey } from '../modules/aiStudio';

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

type PlayList = {
  index: number;
  url: string;
}

const BoardContent: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const { title, userinfo, content, file} = location.state;
  const [name, setName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const userName = useAppSelector(selectUserName);

  // aiStudio
  const appId = useAppSelector(getAppId);
  const uuid = useAppSelector(getUuid);
  const key = useAppSelector(getKey);
  const textScript = useAppSelector(getTextScript);
  const dispatch = useAppDispatch();

  const [video, setVideo] = useState<string>("");
  const [comment, setComment] = useState<Comment>({
    id: 1, name: '', text: ''
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [scriptIndex, setScriptIndex] = useState<number>(0);
  
  // react-player 관련 State
  const [playIndex, setPlayIndex] = useState<number>(0);
  const [playList, setPlayList] = useState<PlayList[]>([]);

  useEffect(() => {
    dispatch(setUserName(userName));
    if(userinfo && userinfo.length > 0) {
      setName(userinfo[0].name);
      setEmail(userinfo[0].email);
    }
    generateAIHuman();
    getVideoList();
  }, []);

  const onSubmit = async () => {
    if (comment.text === '') {
      alert('댓글을 입력해주세요');
      return;
    }
  }

  /**
   * ai Human 동영상을 생성합니다.
   */
  const generateAIHuman = async () => {
    const aiStudioService = new AIStudioService();
    const clientTokenData = await aiStudioService.generateClientToken();
    dispatch(setClientToken(clientTokenData));
    const tokenData = await aiStudioService.generateToken(clientTokenData);
    dispatch(setToken(tokenData));
    const videoData = await aiStudioService.makeVideo(appId, tokenData.token, uuid, scriptIndex, textScript);
    dispatch(setKey(videoData.data.key));
    const progress = async () => {
      const projectData = await aiStudioService.findProject(appId, videoData.data.key, tokenData.token, uuid);
      if (!projectData.data.video) {
        setTimeout(() => {
          progress();
        }, 2000);
      } else {
        setLoading(false);
        console.log(projectData.data.video);
        setVideo(projectData.data.video);
      }
    };
    progress();
  }

  const getVideoList = async () => {
    try {
      await fetch(video)
      .then(res => setPlayList(prevList => [...prevList, {index: playIndex, url: video}]));
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * 다음 동영상 자동 재생을 위한 callback 함수
   * @param playIndex playlist index
   * @param playList playlist
   */
  const handleNextVideo = (playIndex: number, playList: PlayList[]) => {
    playIndex === playList.length - 1 ? setPlayIndex(0) : setPlayIndex(playIndex + 1);
  }

  /**
   * React Player render
   */
  const playVideo = () => {
    console.log(playList[playIndex].url);
    return (
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={video}
          width="200px"
          height='400px'
          playing={true}
          muted={true}
          controls={true}
          pip={true}
          onEnded={() => {handleNextVideo(playIndex, playList)}}
        />
      </div>
    );
  }

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <form className={classes.form} noValidate method='post'>
            <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" padding="5px">작성자: {name}({email})</Box>
            <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" padding="5px">제목 : {title}</Box>
            <Box display="flex" flexDirection="row">
              <Box m={1} />
              <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" width="30%" height="500px" padding="5px" marginTop="10px">
                발표자<br />
                {loading === false ? playVideo() : <p>Loading...</p>}
              </Box>
              <Box border="1px solid #dfdfdf" borderRadius="10px" textAlign="left" width="80%" height="500px" padding="5px" marginTop="10px">PPT<br /></Box>
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