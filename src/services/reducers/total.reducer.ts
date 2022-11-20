export interface TotalStateInterface {
  total: number;
}

export const totalReducer: (state: TotalStateInterface, prices: number[]) => { total: number } = (
  state: TotalStateInterface,
  prices: number[]
) => {
  return {
    total: prices.reduce((prev, cur) => prev + cur, state.total)
  };
};
