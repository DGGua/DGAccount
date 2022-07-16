export const ResData: Record<number, string> = {
  200000: "OK",

  400001: "Secret Wrong",
  400101: "Param Wrong",
};

export function resData<D>(
  code: number,
  data: D = null,
  msg: string = ResData[code] || ""
) {
  return { code, data, msg };
}
