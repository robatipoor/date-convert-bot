const jalaali = require('jalaali-js')
const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
bot.start((ctx) => {
    console.log(ctx.options.username + ' Bot Start !');
    ctx.reply('Welcome !');
})
bot.on('text', async (ctx) => {
    const text = ctx.update.message.text;
    parseDate(text).then((date) => {
        console.log(date);
        return validDate(date);
    }, (err) => {
    }).then((date) => {
        console.log(date);
        return outputDate(date);
    }, (err) => {
        console.log(err);
    }).then((date) => {
        ctx.reply(date);
        console.log(date);
    }, (err) => {
        console.log(err);
    });
})
bot.launch()

function outputDate(date) {
    return new Promise((resolve, reject) => {
        const gdate = jalaali.toGregorian(date['year'], date['month'], date['day'])
        let result = gdate['gy'] + '-' + gdate['gm'] + '-' + gdate['gd'];
        resolve(result);
    });
}

function validDate(date) {
    return new Promise((resolve, reject) => {
        if (date['month'] >= 1 && date['month'] <= 12) {
            if (date['day'] >= 1 && date['day'] <= 31) {
                return resolve(date);
            }
        }
        reject(new Error("Date Value Invalid !"));
    });
}

function parseDate(date) {
    return new Promise((resolve, reject) => {
        let tok;
        if (date.includes('-')) {
            tok = '-';
        } else if (date.includes(' ')) {
            tok = ' ';
        } else if (date.includes('/')) {
            tok = '/';
        } else if (date.includes('.')) {
            tok = '.';
        } else {
            return reject('Error !');
        }
        if (date.split(tok).length == 3) {
            let arr = date.split(tok);
            let d = {
                year: parseInt(arr[0]),
                month: parseInt(arr[1]),
                day: parseInt(arr[2])
            };
            return resolve(d);
        } else {
            reject(new Error('Parse Date Error !'));
        }
    });
}

