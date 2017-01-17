'use strict';

import {ExtensionContext, languages, DocumentFilter, window} from 'vscode';

import * as path from 'path';
import HumongousCompletionItemProvider from './completionItemProvider';

export function activate(context: ExtensionContext) 
{
    let provider = new HumongousCompletionItemProvider(path.join(__dirname, '../../data/completion.json'));

    provider.init().then((result) =>
    {
        if (!result.success)
        {
            console.log(`CompletionItemProvider init failed: ${(result.error.message)}`);
            window.showErrorMessage('Something went wrong. Please see the console!');
        }   
        else
        {
            console.log(`CompletionItemProvider successfully loaded ${provider.count} items from '${provider.filepath}'.`);
            window.showInformationMessage('Ready!');
            context.subscriptions.push(languages.registerCompletionItemProvider(<DocumentFilter>{language: 'plaintext'}, provider));
        }
    });
}

export function deactivate() 
{

}