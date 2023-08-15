import * as vscode from 'vscode';
import { LanguageClient } from 'vscode-languageclient/browser';

export function runModelScriptCommand(client: LanguageClient, channel: vscode.OutputChannel) {
    return async () => {
        channel.clear();
        channel.appendLine("Processing...");
        const result: string = await client.sendRequest("modelscript/run", vscode.window.activeTextEditor.document.getText());
        channel.clear();
        channel.appendLine(result);
    };
}