import express, { Request, Response } from 'express';
import asyncify from 'express-asyncify';

import moment from 'moment'; //시간/날짜 관련 모듈.
import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { verifyToken } from '../authorization';
import { BoardService } from '../services/board-service';
import { Board } from '../model/board';
import { getSlideNoteList } from '../pptUtil';
import ConvertAPIService from '../services/convertAPI-service';

//라우터에서 비동기 함수를 사용할 수 있게 한다.
const router = asyncify(express.Router());

/**
 * uploads 폴터 없으면 생성하기
 */
// fs.readdir('uploads', (error) => {
//   if (error) {
//     fs.mkdirSync('uploads');
//   }
// })

//업로드 규약을 정한다.
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
})

//게시판 목록 요청.
router.post('/list', async (request: Request, response: Response) => {
  const boardService = new BoardService();
  const { search, page } = request.body;
  try {
    const boardList: Board[] | null = await boardService.find(page, search);
    if (!boardList) {
      response.status(400).send('board list not exist');
      return;
    }

    response.json(boardList);
  } catch (err) {
    response.status(400).send('board list error');
  }
});

//게시판 글쓰기 요청.
router.use('/write', verifyToken);
router.post('/write', async (request: Request, response: Response) => {
  const boardService = new BoardService();
  const convertAPIService = new ConvertAPIService();
  const { title, file } = request.body;
  console.log(request.body);
  try {

    fs.readdir('uploads', (error) => {
      if (error) {
        fs.mkdirSync('uploads');
      }
    });
    const slideNoteList = await getSlideNoteList(file);
    const imgInfoList = await convertAPIService.convertPPTXToJPG(file);
    // console.log(imgInfoList);
    let board: Board = {
      userId: response.locals.email,
      title: title,
      file: file,
      date: moment().toDate(),
      count: 0,
      textScript: slideNoteList,
      slideImageInfo: imgInfoList,
    };
    const result = await boardService.create(board);
    console.log(result);
    response.status(201).send('success');
    // response.send([slideNoteList, imgInfoList]);
  } catch (err) {
    response.status(400).send('write error');
  }
});

//게시판 파일 업로드 요청.
router.use('/uploadFile', verifyToken);
router.post('/uploadFile', upload.single('file'), async (request: Request, response: Response) => {
  console.log(request.file.filename);
  response.json({ url: `/img/${request.file.filename}` });
});


export = router;