import express from 'express';
import {createRenderer, TRule, TRuleProps, combineRules} from 'fela';
import {renderToMarkup, renderToSheetList} from 'fela-dom';
import {widgetX} from './widget-x';
import {widgetXStyles} from './widget-x-styles';

const renderer = createRenderer();

const body: TRule = (props: TRuleProps) => ({
    margin: 0
});

const bodyClass = renderer.renderRule(body, {});

const mainTitle: TRule = (props: TRuleProps) => ({
    textAlign: 'center',
    fontSize: '34px',
    fontWeight: 'normal'
});

const mainTitleClass = renderer.renderRule(mainTitle, {});

const mainHolder: TRule = (props: TRuleProps) => ({
    fontSize: '16px',
});

const mainHolderClass = renderer.renderRule(mainHolder, {});

const html = `<html>
    <head>
        <title>Fela css in js</title>
        {{style}}
    </head>
    <body class="${bodyClass}">
        <h1 class="${mainTitleClass}">Hello world</h1>
        <div class="${mainHolderClass}">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin maximus sagittis ex, at fringilla orci faucibus at. Maecenas egestas, nunc sed mollis dictum, mauris elit semper mauris, sagittis maximus metus tortor vel ex. Vestibulum in consequat felis, porta placerat mauris. Maecenas vestibulum dui diam. Phasellus nec lacinia diam. Proin sed nunc nisi. Nullam aliquam consequat enim, sit amet commodo tortor scelerisque laoreet.</p>
            <p>Mauris id scelerisque lorem. Pellentesque ac lacinia dolor. Integer id tempor metus. Pellentesque tempus orci et mi elementum, maximus venenatis purus accumsan. Aliquam facilisis vitae augue ut ornare. Sed sapien est, posuere ac fringilla vel, elementum ac risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur tortor odio, tristique non rhoncus ac, tincidunt id dolor. Donec eget lectus sed justo condimentum consequat quis at orci. Donec quis ante diam. In iaculis accumsan dignissim.</p>
            <p>Phasellus bibendum massa ac nisi sollicitudin, dignissim laoreet dui volutpat. Aliquam erat volutpat. Aliquam nulla erat, hendrerit a accumsan vel, gravida sed elit. Suspendisse eu vehicula enim. Pellentesque sit amet laoreet quam. Fusce fringilla commodo quam, et pharetra est posuere quis. Sed ut pulvinar mauris. In vel mi sit amet elit tincidunt dignissim dignissim sit amet felis. In sapien elit, laoreet quis commodo non, malesuada sit amet leo. Fusce vitae fringilla orci, vel pellentesque felis. Etiam condimentum erat dolor, vulputate porta dui condimentum quis.</p>
        </div>
        {{widgetX}}
    </body>
<html>`;

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
    const style = renderToMarkup(renderer);

    res.send(
        html.replace('{{style}}', style)
            .replace('{{widgetX}}', '')
    );
});

app.get('/widget-separated-styles', (req: express.Request, res: express.Response) => {
    const widgetXClass = renderer.renderRule(combineRules.apply(null, widgetXStyles), {});
    const widget = widgetX.replace('{{widgetXClass}}', widgetXClass);

    const style = renderToMarkup(renderer);

    res.send(
        html.replace('{{style}}', style)
            .replace('{{widgetX}}', widget)
    );
});

app.listen(3000);
