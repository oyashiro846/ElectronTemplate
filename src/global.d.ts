declare global {
	interface Window {
		myAPI: IMyAPI;
	}
}

export interface IMyAPI {
    showContextMenu: () => void,
	showMessageBox: (message: string) => void,
}