
type CallbackType = (data?: any) => void

const EventEmitter = {
  events: {},
  dispatch: function (event: string, data?: any) {
    if (!this.events[event]) return ;
    this.events[event].forEach((callback: CallbackType) => callback(data));
  },
  subscribe: function (event:string, callback: CallbackType) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }
};

export default EventEmitter;
