// global.d.ts
interface AcceptWindow extends Window {
    Accept: {
        dispatchData: (params: any, callback: (response: any) => void) => void;
    };
}

declare const window: AcceptWindow;
