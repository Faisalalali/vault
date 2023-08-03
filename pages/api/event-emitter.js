// pages/api/event-emitter.js
import { getSocketIOInstance } from '@/utils/socketManager';

const io = getSocketIOInstance();

const eventEmitter = {
  emit: (eventName, data) => {
    io.emit(eventName, data);
  },
};

export default eventEmitter;
