
import { EventEmitter } from 'events';

// It's a Node.js built-in, but works in the browser environment Next.js provides.
// This prevents us from needing to add a new dependency.
class TypedEventEmitter<TEvents extends Record<string, any>> {
  private emitter = new EventEmitter();

  emit<TEventName extends keyof TEvents>(
    eventName: TEventName,
    ...eventArg: TEvents[TEventName]
  ) {
    this.emitter.emit(eventName as string, ...eventArg);
  }

  on<TEventName extends keyof TEvents>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.on(eventName as string, handler as any);
  }

  off<TEventName extends keyof TEvents>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.off(eventName as string, handler as any);
  }
}

interface FirebaseErrorEvents {
  'permission-error': [Error];
}

export const errorEmitter = new TypedEventEmitter<FirebaseErrorEvents>();
