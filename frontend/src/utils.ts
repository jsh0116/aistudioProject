/**
 * 날짜를 받아서 년월일 format에 맞게 반환하는 함수입니다.
 * @param date 임의의 날짜 정보를 받습니다.
 * @returns 년월일 format에 맞게 반환합니다.
 */
function dateFormatter(date: Date | string) {
  let d: Date;
  if ((date as Date).toISOString === undefined) {
    d = new Date(date);
  } else {
    d = date as Date;
  }
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}.${month}.${day}.`;
}

export { dateFormatter };
