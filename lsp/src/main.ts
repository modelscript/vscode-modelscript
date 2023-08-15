import { createConnection, BrowserMessageReader, BrowserMessageWriter } from 'vscode-languageserver/browser';
import { InitializeParams, InitializeResult, ServerCapabilities, TextDocuments } from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';

import { ModelScriptBrowserContext } from '@modelscript/modelscript';

let context: ModelScriptBrowserContext;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

connection.onInitialize(async (params: InitializeParams): Promise<InitializeResult> => {

	await ModelScriptBrowserContext.initialize(params.initializationOptions);
	context = new ModelScriptBrowserContext();

	const capabilities: ServerCapabilities = {
	};

	return { capabilities };

});

const documents = new TextDocuments(TextDocument);
documents.listen(connection);

connection.onRequest("modelscript/run", (...params: any[]) => {
	return String(context.eval(params[0]));
});

connection.listen();
