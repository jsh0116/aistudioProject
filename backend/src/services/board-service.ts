import { Board, BoardModel } from '../model/board';

/**
 * 게시판 서비스 클래스입니다.
 */
export class BoardService {
  /**
   * 게시판 모델을 생성하고 DB에 업데이트합니다.
   * @param board 게시판 인터페이스입니다.
   * @returns DB에 업데이트한 내용을 반환합니다.
   */
  public async create(board: Board): Promise<Board> {
    let b = new BoardModel(board);
    return await b.save();
  }

  /**
   * board 콜렉션과 users 콜렉션의 데이타를 융합하여 가져온다.
   */
  public async find(page: any, search: any) {
    const boardData: any[] = await BoardModel.aggregate([ {$match: {}}, {$lookup: {from: 'users', localField: 'userId', foreignField: 'email', as: 'userinfo'}}] );
    return boardData;
  }

  /**
   * 이메일로 게시판 정보를 찾는 함수입니다.
   * @param email 
   * @returns Document 객체를 반환합니다.
   */
  public async read(email: any): Promise<Board | null> {
    const boardData = await BoardModel.findOne({userId: email});
    return boardData;
  }
}