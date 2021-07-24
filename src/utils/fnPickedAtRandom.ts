interface Params {
  count: number;
  list: any[];
}

/**
 * @param count - 랜덤으로 뽑힐 갯수
 * @param list - 랜덤으로 뽑힐 리스트
 * @returns pickedList
 */
const fnPickedAtRandom = (params: Params) => {
  const { count, list } = params;
  const pickedList: any[] = [];
  while (pickedList.length !== count) {
    const random = Math.random() * list.length;
    const index = Math.floor(random);
    const value = list[index];
    if (!pickedList.includes(value)) pickedList.push(value);
  }
  return pickedList;
};

export default fnPickedAtRandom;
