import { ToastType, ToastPosition } from '@/interfaces';
import EventEmitter, { toastManager } from '@/utils/notification';

describe('EventEmitter', () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('should register and call a listener with emitted data', () => {
    const listener = jest.fn();
    emitter.on('test', listener);
    emitter.emit('test', 'hello', 123);

    expect(listener).toHaveBeenCalledWith('hello', 123);
  });

  it('should remove a listener', () => {
    const listener = jest.fn();
    emitter.on('test', listener);
    emitter.off('test', listener);
    emitter.emit('test', 'data');

    expect(listener).not.toHaveBeenCalled();
  });

  it('should call a once listener only one time', () => {
    const listener = jest.fn();
    emitter.once('onceEvent', listener);
    emitter.emit('onceEvent', 'first');
    emitter.emit('onceEvent', 'second');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith('first');
  });

  it('off should not throw if listener not found', () => {
    const listener = jest.fn();
    expect(() => emitter.off('noEvent', listener)).not.toThrow();
  });
});

describe('ToastManager', () => {
  jest.useFakeTimers();

  it('should emit "show" with correct data when showToast is called', () => {
    const showListener = jest.fn();
    toastManager.on('show', showListener);

    const message = 'Hello toast';
    const type: ToastType = 'error';
    const position: ToastPosition = 'bottom-left';

    toastManager.showToast(message, type, position, 5000);

    expect(showListener).toHaveBeenCalledTimes(1);
    const showArg = showListener.mock.calls[0][0];
    expect(showArg.message).toBe(message);
    expect(showArg.type).toBe(type);
    expect(showArg.position).toBe(position);
    expect(typeof showArg.id).toBe('number');
  });

  it('should emit "remove" after timeout', () => {
    const removeListener = jest.fn();
    toastManager.on('remove', removeListener);

    toastManager.showToast('Auto remove test', 'success', 'top-center', 3000);

    jest.advanceTimersByTime(3000);

    expect(removeListener).toHaveBeenCalledTimes(1);
    expect(typeof removeListener.mock.calls[0][0]).toBe('number');
  });

  it('should use default parameters if not provided', () => {
    const showListener = jest.fn();
    toastManager.on('show', showListener);

    toastManager.showToast('Default test');

    const showArg = showListener.mock.calls[0][0];
    expect(showArg.type).toBe('success');
    expect(showArg.position).toBe('top-center');
  });
});
