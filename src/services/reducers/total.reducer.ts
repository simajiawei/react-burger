export interface TotalStateInterface {
  total: number;
}

const initialState: TotalStateInterface = {
  total: 0
};

export const totalReducer: (state: TotalStateInterface, prices: number[]) => { total: number } = (
  state: TotalStateInterface,
  prices: number[]
) => {
  return {
    total: prices.reduce((prev, cur) => prev + cur, initialState.total)
  };
};
