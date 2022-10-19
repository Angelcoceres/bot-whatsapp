const chalk = require('chalk');
const ora = require('ora');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js')

let client;
let spinner;

client = new Client({
puppeteer: {
    executablePath: '/usr/bin/chromium',
},
authStrategy: new LocalAuth({
    clientId: "client-one"
}),
puppeteer: {
    headless: false,
}
});

client.initialize();

client.on("qr", (qr) => {
qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
spinner = ora(`Cargando ${chalk.yellow('Sesion de WhatsApp Iniciada...')}`);
spinner.start()
});

client.on("ready", async () => {
console.log("WHATSAPP WEB => Ready");
spinner.stop();
});

client.on('message', message => {
if(message.body === '!ping') {
    message.reply('pong');
}
});