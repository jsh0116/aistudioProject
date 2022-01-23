import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { MongoConnector } from './mongo-connector';
import accountRouter from './routes/account-router';
import boardRouter from './routes/board-router';

/**
 * 메인 서버 클래스입니다.
 */
export class MainServer {
	private app: any;

	constructor() {
		dotenv.config();
		this.app = express();
	}

	/**
	 * 서버 실행을 담당하는 메소드입니다.
	 */
	async start(): Promise<void> {
		const mongoConnector = new MongoConnector();
		await mongoConnector.connect();

		this.app.use('/uploads', express.static('uploads'));
		this.app.use(express.json());
		this.app.use(cors()); //cors를 allow한다.
		this.app.use("/account", accountRouter);
		this.app.use("/board", boardRouter);

		this.app.listen(5000, () => {
			console.log('Server Opened.');
		});
	}
}