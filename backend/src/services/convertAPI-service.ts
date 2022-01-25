
import ConvertAPI from 'convertapi';
import path from 'path';

export default class ConvertAPIService {
  /**
   * convert pptx file to jpg list
   * @param file pptx file
   * @returns File Info Object Array
   */
  public async convertPPTXToJPG(filePath: string) {
    const convertapi = new ConvertAPI('0oVeSwWP3upZ1V1z', {conversionTimeout: 60});
    const uploadDir = path.join(__dirname, '..', '..', '/uploads', './');
    const convert = await convertapi.convert('jpg', { File: uploadDir + filePath }, 'pptx', 60);
    const resultFile = await convert;
    const response = resultFile.response;
    const result = response['Files']; 
    return result;
  }
}