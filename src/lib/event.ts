abstract class IEvent {
    static emit: (name: string, data: any) => void;
    static on: (name: string, callback: (event: any) => void) => void;
    static off: (name: string, callback: (event: any) => void) => void;
}

export default class Event extends IEvent {
    static on = (name: string, callback: (event: any) => void) =>
        window.addEventListener(name, callback, false);

    static off = (name: string, callback: (event: any) => void) =>
        window.removeEventListener(name, callback, false);

    static emit = (name: string, data: any) =>
        window.dispatchEvent(new CustomEvent(name, { detail: data }));
}
