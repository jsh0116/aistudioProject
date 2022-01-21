import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import AccountService from '../services/account-service';
import { selectUserName, setUserName } from '../modules/user';
import { useAppDispatch, useAppSelector } from '../hooks';

function Header() {
  const navigate = useNavigate();
  const userName = useAppSelector(selectUserName);
	const dispatch = useAppDispatch();
  const routeChange = (url: string) => {
		navigate(url);
  }

  async function loadProfile() {
    const accountService = new AccountService();
    const result = await accountService.getProfile();
    
    if(result['name']) {
        dispatch(setUserName(result['name']));
    }
  }

  function logout() {
    if (!sessionStorage.getItem("accessToken")) {
      return;
    }
  
    sessionStorage.removeItem("accessToken");
    dispatch(setUserName(''));
    routeChange('/');
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <div>
      <Box m={1}/>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        {userName !== '' ? 
          <>
            <Box color={"#707070"} fontSize={14}>
              {userName}님, 환영합니다!
            </Box>
            <Box m={1} />
            <Button variant="outlined" color="primary" size="small" startIcon={<ExitToAppOutlinedIcon/>} onClick={() => logout()}>로그아웃</Button>
            <Box m={1} />
            <Button variant="outlined" color="primary" size="small" startIcon={<SupervisorAccountIcon/>} onClick={() => routeChange('/admin')}>관리자모드</Button>
            <Box m={1} />
          </> :
          <>
            <Box color={"#707070"} fontSize={14}>
              로그인 먼저 해주세요!!
            </Box>
            <Button variant="outlined" color="primary" size="small" startIcon={<LockOpenIcon/>} onClick={() => routeChange('/login')}>로그인</Button>
            <Box m={1} />
            <Button variant="outlined" color="primary" size="small" startIcon={<PostAddIcon/>} onClick={() => routeChange('/register')}>회원가입</Button>
            <Box m={1} />
          </>
        }
      </Box>
    </div>
  )
}

export default Header;
