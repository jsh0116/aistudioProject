import axios from 'axios';
import { User } from '../model/user';
import config from '../config';

/**
 * 서버로부터 계정 정보를 가져오는 서비스 클래스입니다.
 */
export default class AccountService {
  /**
   * access token을 요청합니다.
   * @returns 세션 스토리지의 accesstoken 아이템을 반환합니다.
   */
  public getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  /**
   * 프로필 정보를 가져오는 비동기 함수입니다.
   * @returns axios 통신으로 정보를 잘 가져왔다면 반환하고 실패한 경우 응답 실패 결과를 반환합니다.
   */
  public async getProfile() {
    const accessToken = this.getAccessToken();
    const checkAccessToken = accessToken !== null ? accessToken : '';

    const res = await axios.get(
      config.apiServer + '/account/profile',
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

    console.log(res);
    return res.data;
  }

  /**
   * 회원가입을 요청하는 비동기 함수입니다.
   * @param user 
   * @returns 요청 성공 시 사용자 data 반환 실패 시 응답 실패 반환
   */
  public async register(user: User) {
    const res = await axios.post(
      config.apiServer + '/account/register',
      user
    ).catch(function (error) {
      console.log(error);
      if (error.response) {
          return error.response;
      }
    });
    return res.data;
  }

  /**
   * 로그인 요청하는 비동기 함수입니다.
   * @param email 이메일 문자열
   * @param password hash 비밀번호 문자열 
   * @returns 성공 시 token 보관 및 success 메시지 전송 실패 시 error 메시지 전송
   */
  public async login(email: string, password: string) {
    try {
      const res = await axios.post(
        config.apiServer + '/account/login',
        { email: email, password: password }
      );

      if (res.data) {
        let token: string = res.data['token'];

        //얻어온 토큰을 세션 스토리지에 보관.
        sessionStorage.setItem("accessToken", token);

        return {
          type: 'success',
          name: res.data['name'],
          message: token,
        }
      }

      return {
        type: 'error',
        message: 'no token'
      }
    } catch (error) {
      console.log(error);
      return {
        type: 'error',
        message: 'error.response.data'
      };
    }
  }
}
