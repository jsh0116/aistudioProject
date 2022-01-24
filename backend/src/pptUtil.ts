import PPTX2Json from 'pptx2json';

/**
 * PPTX Slide 노트 페이지 별 대본을 저장한 리스트
 * @param file pptx 파일
 * @returns 대본을 저장한 리스트를 반환합니다.
 */
export async function getSlideNoteList(file: string): Promise<string[]> {
  const result: string[] = [];
  const pptx2json = new PPTX2Json();
  const json = await pptx2json.toJson('./uploads/' + file);
  const data = await json;
  const keys = Object.keys(data);
  const notes = keys.filter(key => /^ppt\/notesSlides\/[^_]+\.xml$/.test(key) && data[key]['p:notes']);
  for (const note of notes) {
    const cSld = data[note]['p:notes']['p:cSld'];
    cSld?.forEach(cSldObj => {
      const noteText = lookup(cSldObj, 'a:t');
      if(noteText) {
        result.push(noteText[1][0]);
      }
    })
  }
  console.log(result);
  return result;
}

function lookup(obj: any, k: string) {
  for (let key in obj) {
    let value = obj[key];

    if (k == key) {
      return [k, value];
    }

    if (typeof(value) === "object" && !Array.isArray(value)) {
      let y = lookup(value, k);
      if (y && y[0] == k) return y;
    }
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; ++i) {
        let x = lookup(value[i], k);
        if (x && x[0] == k) return x;
      }
    }
  }
  return null;
}