import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export const renderTemplate = (templatePath: string, replacements: object): string => {
    const filePath = path.join(path.resolve(), templatePath);
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);

    return template(replacements);
}