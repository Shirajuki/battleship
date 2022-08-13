import createStore from "unistore";

// Your initial global app state
export const store = createStore({
  room: "room1",
  socket: null,
});

// Your actions for mutating the global state
export const actions = (_store) => ({
  setRoom: ({ room: _ }, newRoom) => ({ room: newRoom }),
  setSocket: ({ socket: _ }, newSocket) => ({ socket: newSocket }),
});
