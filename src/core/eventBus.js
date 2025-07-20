export class EventBus {
  #listeners = new Map();

  #isEventRegistered(event) {
    return this.#listeners.has(event);
  }

  #getEventListeners(event) {
    return this.#listeners.get(event) || [];
  }

  on(event, callback) {
    if (!this.#isEventRegistered(event)) this.#listeners.set(event, []);

    this.#listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (!this.#isEventRegistered(event)) return;

    this.#listeners.set(
      event,
      this.#getEventListeners(event).filter((cb) => cb !== callback)
    );
  }

  emit(event, ...args) {
    if (!this.#isEventRegistered(event)) return;

    this.#getEventListeners(event).forEach((callback) => callback(...args));
  }
}
