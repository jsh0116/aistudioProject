import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Container from '@material-ui/core/Container';

import makeStyles from "@material-ui/core/styles/makeStyles";

import BoardService from '../services/board-service';
import AIStudioService from '../services/aiStudio-service';

import { Board } from '../model/board';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAppId, getUserKey, getTextScript, setTextScript } from '../modules/aiStudio';

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
	  margin: theme.spacing(1.5, 0, 0),
	},
  }));

const BoardWrite: React.FC = () => {
	const navigate = useNavigate();
	const classes = useStyles();

	// aiStudio
	const appId = useAppSelector(getAppId);
	const userKey = useAppSelector(getUserKey);
	const textScript = useAppSelector(getTextScript);
	const dispatch = useAppDispatch();
	const [board, setBoard] = useState<Board>({title: '', file: ''});
	const [file, setFile] = useState<any>(null);

	async function onSubmit() {
		if(board.title === '' || board.file === '') {
			alert('입력되지 않은 정보가 있습니다.');
			return;
		}
		// const aiStudioService = new AIStudioService();
		const boardService = new BoardService();		
		//파일 업로드.
		const formData = new FormData();
		formData.append("file", file); 
		
		// const fileResult = await boardService.uploadImage(formData);
		await boardService.uploadFile(formData);

		const result = await boardService.write(board);
		if(result !== 'write error') {
			dispatch(setTextScript(result));
			navigate('/board');
		}else{
			alert('등록 중 오류가 발생하였습니다.');
		}
	}

	return(
		<Container component="main" maxWidth="md">
			<div className={classes.paper}>
				<form className={classes.form} noValidate method='post'>
				<TextField
					variant="outlined"
					margin="normal"
					fullWidth
					label="제목"
					autoFocus
					value={board.title}
					onChange={e => {
						let tempBoard = {...board};
						tempBoard.title = e.target.value;
						setBoard(tempBoard);
					}}
				/>
				<Box display='flex' flexDirection='row'>
					<Button variant="contained" component="label" style={{minWidth: '100px'}}>파일 선택
						<input type="file" accept=".ppt,.pptx" style={{ display: 'none' }} 
							onChange={e => {
								if(e.target.files) 
									setFile(e.target.files[0]);
									let tempBoard = {...board};
									tempBoard.file = e.target.value.split('\\')[e.target.value.split('\\').length - 1];
									setBoard(tempBoard);
							}}/>
					</Button>
					<TextField
						variant="outlined"
						margin="normal"
						type="text"
						fullWidth
						value={board.file}
					/>
				</Box>
				<Button
					type="button"
					fullWidth size="small"
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={onSubmit}
				>
					업로드
				</Button>
				<Button
					type="button"
					fullWidth size="small"
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => navigate(-1)}
				>
					취소
				</Button>
				</form>
			</div>
		</Container>
	);
}

export default BoardWrite;