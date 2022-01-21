import axios from "axios";
import config from '../config';

export default class AIStudioService {
  /**
   * generateClientToken creates and returns a JWT token used to generate a token via 'generateToken'
   */
  public async generateClientToken() {
    const res = await axios.get(
      config.apiServer + '/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9'
    ).catch(function(error) {
      console.log(error);
      if (error.response) {
        return error.response;
      }
    });
    return res.data;
  }

  /**
   * generateToken creates and returns a JWT token to be used in authenticating requests
   * @param appId 
   * @param token from generateClientToken
   * @returns 
   */
  public async generateToken(appId: string, token: string) {
    const res = await axios.post(
      config.apiServer + '/api/odin/generateToken',
      {
        appId,
        platform: 'web',
        isClientToken: true,
        token,
        uuid: '6443234b-77d5-4013-bfd6-bb9399f317d9',
        sdk_v: '1.0',
        clientHostname: 'aiStudio.com',
      }
    ).catch(function(error) {
      console.log(error);
      if (error.response) {
        return error.response;
      }
    });

    console.log(res);
    return res.data;
  }

  /**
   * makeVideo sends a video synthesis request and returns the video key
   */
  public async makeVideo(appId: string, token: string ,uuid: string) {
    const res = await axios.post(
      config.apiServer + '/api/odin/makeVideo',
      {
        appId,
        platform: 'web',
        isClientToken: true,
        token,
        uuid,
        sdk_v: '1.0',
        clientHostname: 'aiStudio.com',
        language: 'ko',
        text: '안녕하세요',
        model: 'ysy',
        clothes: '1',
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
   * findProject returns project data associated with the video key
   */
  public async findProject(appId: string, token: string, uuid: string) {
    const res = await axios.post(
      config.apiServer + '/api/odin/findProject',
      {
        appId,
        platform: 'web',
        isClientToken: true,
        token,
        uuid,
        sdk_v: '1.0',
        clientHostname: 'aiStudio.com',
        key: "-MqSoa8y9i12ODr2OePb",
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
   * findLog returns every log entry associated with the user's userKey (uuid)
   */
  public async findLog(appId: string, token: string, uuid: string) {
    const res = await axios.post(
      config.apiServer + '/api/odin/findLog',
      {
        appId,
        platform: 'web',
        isClientToken: true,
        token,
        uuid,
        sdk_v: '1.0',
        clientHostname: 'aiStudio.com',
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
}