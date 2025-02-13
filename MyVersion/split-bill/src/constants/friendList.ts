export interface friendDetails {
  amount: number;
  pfp: string;
}

export let friendsList: { [key: string]: friendDetails } = {
  Clark: {
    amount: -7,
    pfp: "https://cdn.waifu.im/4253.jpeg",
  },
  Sarah: {
    amount: 20,
    pfp: "https://cdn.waifu.im/2649.jpeg",
  },
  Anthony: {
    amount: 0,
    pfp: "https://cdn.waifu.im/8013.png",
  },
};