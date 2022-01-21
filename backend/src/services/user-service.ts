import { User, UserModel } from '../model/user';

/**
 * 사용자 서비스 클래스입니다.
 */
export class UserService {
  /**
   * 사용자 model을 생성하는 함수입니다.
   * @param user 
   * @returns Document 객체를 DB에 저장합니다.
   */
  public async create(user: User): Promise<User> {
    let u = new UserModel(user);
    return await u.save();
  }

  /**
   * email로 사용자 정보를 찾는 함수입니다. 
   * @param email 
   * @returns Document 객체를 반환합니다.
   */
  public async read(email: any): Promise<User | null> {
    const userData = await UserModel.findOne({email: email});
    return userData;
  }
}