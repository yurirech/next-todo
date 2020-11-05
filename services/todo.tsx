
export const getData = (key: string): any => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
}

