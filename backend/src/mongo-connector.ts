import mongoose, { Connection } from 'mongoose';

export class MongoConnector {
  /**
   * MongoDB와의 연결 역할을 하는 객체입니다.
   */
  private mongoConnection: Connection;

  constructor() {}

  /**
   * MongoDB와의 연결을 시작하는 비동기 함수입니다.
   * @returns 비동기 작업의 처리 과정에서 성공한 case를 반환합니다.
   */
  public connect(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      mongoose.connection.once('open', function () {
        console.log('MongoDB event open');

        mongoose.connection.on('connected', () => {
          console.log('MongoDB event connected');
        });

        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB event disconnected');
        });

        mongoose.connection.on('reconnected', () => {
          console.log('MongoDB event reconnected');
        });

        mongoose.connection.on('error', (err) => {
          console.log('MongoDB event error: ' + err);
        });

        return resolve(null);
      });

      /** all executed methods log output to console */
      mongoose.set('debug', true);
      /** disable colors in debug mode */
      mongoose.set('debug', { color: false });
      /** get mongodb-shell friendly output (ISODate) */
      mongoose.set('debug', { shell: true });

      /** DB setting */
      this.mongoConnection = mongoose.connection;
      mongoose.connect(process.env.MONGO_URL, {
        keepAlive: true,
      }).then(() => {
        console.log('MongoDB Connected.');
        resolve(null);
      }).catch(reject);
    });
  }

  /**
   * MongoDB와의 연결을 종료하는 비동기 함수입니다.
   * @returns 연결을 종료하는 함수를 호출합니다.
   */
  public disconnect(): Promise<any> {
    return this.mongoConnection.close();
  }
}