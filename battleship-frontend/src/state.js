import createStore from "unistore";

// Your initial global app state
export const store = createStore({
  count: 0,
  room: "room1",
});

// Your actions for mutating the global state
export const actions = (store) => ({
  increment: ({ count }) => ({ count: count + 1 }),
  decrement: ({ count }) => ({ count: count - 1 }),
  setRoom: ({ room }) => ({ room: room }),
});
