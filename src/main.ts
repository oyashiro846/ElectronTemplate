import { app, BrowserWindow, Menu, ipcMain, dialog, nativeImage, MenuItemConstructorOptions } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 700,
		minHeight: 700,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
		);
	}

	// Application Icon
	const applicationIconImage = nativeImage.createFromPath(path.join(__dirname, 'icon file path'));

	// Application Menu
	const applicationMenu: Menu = Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{ role: 'close', label: 'Exit' },
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo', label: 'Undo' },
				{ role: 'redo', label: 'Redo' },
				{ type: 'separator' },
				{ role: 'cut', label: 'Cut' },
				{ role: 'copy', label: 'Copy' },
				{ role: 'paste', label: 'Paste' },
				{ role: 'delete', label: 'Delete' },
				{ type: 'separator' },
				{ role: 'selectAll', label: 'Select All' },
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload', label: 'Reload' },
				{ role: 'forceReload', label: 'Force Reload' },
				{ role: 'toggleDevTools', label: 'Toggle Dev Tools' },
				{ type: 'separator' },
				{ role: 'resetZoom', label: 'Reset Zoom' },
				{ role: 'zoomIn', label: 'Zoom In' },
				{ role: 'zoomOut', label: 'Zoom Out' },
				{ type: 'separator' },
				{ role: 'togglefullscreen', label: 'Toggle Full Screen' },
				{ type: 'separator' },
			]
		},
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize', label: 'Minimize' },
				{ role: 'zoom', label: 'Zoom' },
				{ role: 'close', label: 'Close' },
			]
		},
	]);

	// Context Menu
	const contextMenu: Menu = Menu.buildFromTemplate([
		{ role: 'undo', accelerator: 'Ctrl+Z', label: 'Undo' },
		{ role: 'redo', accelerator: 'Ctrl+Y', label: 'Redo' },
		{ type: 'separator' },
		{ role: 'cut', accelerator: 'Ctrl+X', label: 'Cut' },
		{ role: 'copy', accelerator: 'Ctrl+C', label: 'Copy' },
		{ role: 'paste', accelerator: 'Ctrl+V', label: 'Paste' },
		{ role: 'selectAll', label: 'Select All' }
	]);

	// Open External Link(target='_blank')
	mainWindow.webContents.setWindowOpenHandler((detail: any) => {
		return { action: 'deny' };
	});

	// Open External Link(target='_self' or target=none)
	mainWindow.webContents.on('will-navigate', async (event: any, url: string) => {
		// Reject transition within existing window in Electron
		event.preventDefault();
		return { action: 'deny' };
	});

	app.whenReady().then(() => {
		// Application Menu
		Menu.setApplicationMenu(applicationMenu);

		// Context Menu
		ipcMain.on('showContextMenu', (event: any): void => contextMenu.popup(
			{ window: BrowserWindow.fromWebContents(event.sender) }
		));

		// Show Message Box
		ipcMain.handle('showMessageBox',
			async (event: any, message: string) => {
				await dialog.showMessageBox(mainWindow, {
					type: 'info',
					title: 'Software Info',
					message: message,
					icon: applicationIconImage,
					buttons: ['OK'],
				});
			}
		);
	});

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
