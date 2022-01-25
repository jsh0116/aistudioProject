import axios from 'axios';
import { Board } from '../model/board';
import config from '../config';

export default class BoardService {
  /**
   * 토큰을 요청합니다.
   * @returns 
   */
  public getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  /**
   * 글 목록을 요청합니다
   */
  public async find() {
    const accessToken = this.getAccessToken();
    const checkAccessToken = accessToken !== null ? accessToken : '';

    const res = await axios.post(
      config.apiServer + '/board/list',
      {},
      {
        headers: {
          'x-access-token': checkAccessToken
        }
      }
    ).catch(function (error) {
      console.log(error);
      if (error.response) {
        return error;
      }
    });

    return res.data as Board[];
  }

  /**
   * 파일 업로드를 요청합니다.
   * @param formData
   * @returns 
   */
  public async uploadFile(formData: FormData) {
    const accessToken = this.getAccessToken();
    const checkAccessToken = accessToken !== null ? accessToken : '';

    console.log(formData);
    const res = await axios.post(
      config.apiServer + '/board/uploadFile',
      formData,
      {
        headers: {
          'x-access-token': checkAccessToken
        }
      }
    ).catch(function (error) {
      console.log(error);
      if (error.response) {
        return error.response;
      }
    });

    return res.data;
  }

  /**
   * 글쓰기를 요청합니다.
   * @param board 발표 게시판 
   * @returns 
   */
  public async write(board: Board) {
    const accessToken = this.getAccessToken();
    const checkAccessToken = accessToken !== null ? accessToken : '';

    const res = await axios.post(
      config.apiServer + '/board/write',
      board,
      {
        headers: {
          'x-access-token': checkAccessToken
        }
      }
    ).catch(function (error) {
      console.log(error);
      if (error.response) {
        return error.response;
      }
    });
    console.log(res.data);
    return res.data;
  }
}