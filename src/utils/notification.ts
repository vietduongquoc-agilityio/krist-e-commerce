import { ToastPosition, ToastType } from '@/types';

class EventEmitter {
  private target: EventTarget;
  private listenersMap: Map<(...args: any[]) => void, EventListener>;

  constructor() {
    this.target = new EventTarget();
    this.listenersMap = new Map();
  }

  on(event: string, listener: (...args: any[]) => void) {
    const wrappedListener: EventListener = (e: Event) => {
      const customEvent = e as CustomEvent;
      listener(...(customEvent.detail || []));
    };
    this.listenersMap.set(listener, wrappedListener);
    this.target.addEventListener(event, wrappedListener);
    return this;
  }

  off(event: string, listener: (...args: any[]) => void) {
    const wrappedListener = this.listenersMap.get(listener);
    if (wrappedListener) {
      this.target.removeEventListener(event, wrappedListener);
      this.listenersMap.delete(listener);
    }
    return this;
  }

  once(event: string, listener: (...args: any[]) => void) {
    const onceWrapper = (...args: any[]) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
    return this;
  }

  emit(event: string, ...args: any[]) {
    this.target.dispatchEvent(new CustomEvent(event, { detail: args }));
    return true;
  }
}

export default EventEmitter;

class ToastManager extends EventEmitter {
  showToast(
    message: string,
    type: ToastType = 'success',
    position: ToastPosition = 'top-center',
    timeOut = 3000,
  ) {
    const id = Date.now();
    this.emit('show', { id, message, type, position });

    setTimeout(() => {
      this.emit('remove', id);
    }, timeOut);
  }
}

export const toastManager = new ToastManager();
