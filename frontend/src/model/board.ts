/**
 * 발표 게시판 인터페이스를 정의합니다.
 */
export interface Board {
  num?: number;
  userId?: string;
  title: string;
  file: string;
  date?: Date;
  count?: number;
  userinfo?: any;
  // textScript?: string[];
}