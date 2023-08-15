import { ExtensionContext, Uri } from 'vscode';
import { LanguageClientOptions } from 'vscode-languageclient';

import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/browser';
import { runModelScriptCommand } from './commands/runModelScriptCommand.js';

export function activate(context: ExtensionContext) {

	const channel = vscode.window.createOutputChannel("ModelScript");

	const documentSelector = [{ language: 'modelscript' }];

	const clientOptions: LanguageClientOptions = {
		documentSelector,
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/*.{ms}', false, false, false)
		},
		initializationOptions: {
			treeSitterWasm: vscode.Uri.joinPath(context.extensionUri, './lsp/node_modules/web-tree-sitter/tree-sitter.wasm').toString(),
			treeSitterModelScriptWasm: vscode.Uri.joinPath(context.extensionUri, './lsp/node_modules/@modelscript/tree-sitter-modelscript/tree-sitter-modelscript.wasm').toString(),
		}
	};

	const client = createWorkerLanguageClient(context, clientOptions);
	context.subscriptions.push(client.start());

	client.onReady().then(() => {
		context.subscriptions.push(vscode.commands.registerCommand('modelscript.commands.run', runModelScriptCommand(client, channel)));
	});

}

function createWorkerLanguageClient(context: ExtensionContext, clientOptions: LanguageClientOptions) {
	const lspMain = Uri.joinPath(context.extensionUri, 'lsp/dist/main.js');
	const worker = new Worker(lspMain.toString(true));
	return new LanguageClient('vscode-modelscript-lsp', 'ModelScript Language Server', clientOptions, worker);
}
