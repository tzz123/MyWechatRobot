import { WechatyBuilder } from 'wechaty';
import { ChatGPTAPI } from 'chatgpt';
import qrcodeTerminal from 'qrcode-terminal';
import pRetry from 'p-retry';

const config = {
    AutoReply: true,
    MakeFriend: true,
    ChatGPTSessionToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..pE7xLbpkaF6mUsf3._IJU8dHWA2fWFuP4w6gKeAky7iu2-XLfNO1lkZd0iQsFS6TWvotIMhhEsUlnz_4QJbmUrzJCi838heG9bO6GlUWuGP3IbN2bZRUA7-kQy3NZoGzQOWc45Fld8ywLWdyNZtopNtPQwG3iDMQVd8qSGFED8vJB90IjEc24ihKFpwhIlZ3H4n8wtqUA1daCqHF_JlzVmyh1FFEDjzCDMwoNCRbGw4_K0uWCqGEdvcN5p57NrU-lnJNsmRLvak5Xwq2a3En4Y7VbzTns7p5F63KfX5DWqLdG7NpjUuhcgRSPh1Dm6azQNGzV0XPbzSOTE8r_QdvhiCZraOVveRQm0NOcyBS89BgCCaUr-6ZtEMsLMcfDo69cXPYVdXZeDWObAt_AUSrXLDt7myQi07yRtWvIOl6mwqXn4ItzW2P6E_Deb38U4fVBcgw6p0Q-VAirUndyighEs1JNTEHFDY-gZy9nGD0lRFqQBEwbVM5dRLS_hMC8Th2tLgVr5Nk8NOfmnnuqYqwuekL3G_zzY106sHksQx8I5uf5Fm11dpWWnMBPmB-f9DoR5-m8gdkaHDLXMfZKPyOPTxADWQ-B7PAwCpIiMXUnk8mZr6gXuJ5QKlZD5OYicUJ85mALerqx94ALAh2xjs1Tuxv4NgLIGAD7AY-Q-ZxmS6KW5-b6OERcwboi8AljuSJTYgn3lSoK52oojXAOhyZI0ulSXg_4tVIQEx-sii5joKSclNozKBgEE8xgGdZT8S99G3OledzslCF1f6sS1a9uxrzUg0cfkMlmdo3A9r1BJlcXKkJtr746AljVr5wYFwhVgAsh4F8zmDX_q9L6n5_5Ve2WqfIxu66zC2E9Ci6cW_vmdBZ2wQs1uvLrYMKFFEmwterda0WTzW58NmUe9ClISwAc8rLzBo7Qb_xT-9rVdNAer-mWIjh-OeJd4JOzsyw8jixUzFD4FQ0zIUCwDkjJNnwNyxvIRBE27Fdbk9vk2Rklw3Tb2XI6-bWXaG3ImqbIgz1YqHRPl218Zc9ommugiFUSqq4zYHDs62ESlgDDtQQTAVrxu0vvufS88BdqvNQuntD7ZxQUSVrw0wsw5YRSw7We6hyb5JnD_vo69n3PDcW4Qarva49cw5LzLblrRunfCcxLG1x9Ir7BtGbr2GnmbK7uyOFlJSZyEeE0G1hMThFMMeOJkgI-ZPaq1Skgh07WD16pgxC0yGHHPefQmAzaibn09UJR-ke8262dnLuJ7eNW2TkAaXt5QsTVaTW8RCVm4XXhIN9mowH0Lxqj_cp6zpKv2NQs2A6i5ktgz25Ouf4j3esaKDc_HisrpRx4zq3zaIeeiw0GOgBxQ-OYPaeookSP3mJC6A3oFuMBqrRSkA-De9wDjIpEiSw9LfLYk6NbAaxlMrMMRNg4fJueMH-k65QQ9fB86DdsR-liNP5zUMhAubFqYUDP0YYgNJMW6jDIABM0_ysMvm5fqpMQmd552CXSix8JfhlVRlPqhEYJnEyvuL8RJrcKdOukPYHxjt7NM3nm-pKnJB-BnGH6DRO3Xl9of9nfhkNgzAdrQj0f7JBKLH8XrQQwdu3_jKmQJ0j11KwUVTwvlxWsN0xtZFL022DupEARlAU9ftLUrDhq_BToiUrFQzrRqrokixz6iJkbUFPiBx4X7XE6ws7ahTOmK8c6NkJJ2Uh-UgiZcM1sqQgixKdjAwPdRuxEurrH1eGzFxspL82VSH5_S32F7gPsPGKQnzOfaHqQdc_dUzqUHewOMHzw3Y5xJjB_Klaj0sTjV5QhIhFdzSfeJO1W9LooqLledcuiEIfZDhdA0G1NicGNi4iAjNNuztCfv4w8hzFX5uV5SRK3irgZ5kBV3Wuv5lHpfABaHnnZ7wR32iiuoijxMbmPsu6TSQG8vOiKXZTUks7oSTshn7000drFfcOpqpVCvcD9Javnm2pIwyspXpBcrmOjw7c4XH32K2on7-hleidbSXMrjOqcBpc41n27E91ynyuVnP44zyJEiM03tVKnLz2MyhOfja0NGDhRU_T8U0L4LGx64io14cTRRogvNOfTp8xcYj-ocSGu8B5eqX6XEIjnZG7rTAnaYpRd8-RToGBeQRmkSom1Nmr4gvmXbJgpvZ2SRNP2hYoTUrbP31qQ4d0EKTJYG9LUDWF4aCTRj_x4jPxCo8CSQ3-h_Ttxa6Sx4jGfskddEv4GuQslbSDWrzBXnxSu-g5-pGhjmBxAHvmW27dOjd1_qi3HHPSf-BLvaHZUuqc24XzqgjVZ2isOiXaUjSO--9ci-k_kXjLvooUISd26CwDKAGvfhAAVDVZCDd6a97aBzWZNs_baipXfuuvuLQ.GffCHUILj_w7E1zir4YV1g'
};
const api = new ChatGPTAPI({ sessionToken: config.ChatGPTSessionToken });
await api.ensureAuth();
const conversation = api.getConversation();
async function getChatGPTReply(content) {
    // ensure the API is properly authenticated (optional)
    console.log('sendcontent: ', content);
    // send a message and wait for the response
    //TODO: format response to compatible with wechat messages
    const timeoutMs = 2 * 60 * 1000;
    let response;
    const run = () => conversation.sendMessage(content, {
        timeoutMs
    });
    try {
        response = await pRetry(run, {
            retries: 5
        });
    }
    catch (error) {
        console.log(error, 'error');
    }
    console.log('response: ', response);
    // response is a markdown-formatted string
    return response;
}
async function replyMessage(contact, content) {
    const reply = await getChatGPTReply(content);
    try {
        await contact.say(reply);
    }
    catch (e) {
        console.error(e);
    }
}
async function onMessage(msg) {
    const contact = msg.talker();
    msg.to();
    const content = msg.text();
    const room = msg.room();
    const alias = await contact.alias() || await contact.name();
    const isText = msg.type() === bot.Message.Type.Text;
    if (msg.self()) {
        return;
    }
    if (room && isText) {
        const topic = await room.topic();
        console.log(`Group name: ${topic} talker: ${await contact.name()} content: ${content}`);
        if (await msg.mentionSelf()) {
            console.log(content, 'content');
            const groupContent = content.replace('@NoRobot', '').trim();
            console.log('groupContent:', groupContent);
            replyMessage(room, groupContent);
        }
    }
    else if (isText) {
        console.log(`talker: ${alias} content: ${content}`);
        {
            if (content) {
                replyMessage(contact, content);
            }
        }
    }
}
function onScan(qrcode, status) {
    qrcodeTerminal.generate(qrcode); // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode),
    ].join('');
    console.log(qrcodeImageUrl);
}
async function onLogin(user) {
    console.log(`${user} has logged in`);
    const date = new Date();
    console.log(`Current time:${date}`);
    {
        console.log(`Automatic robot chat mode has been activated`);
    }
}
function onLogout(user) {
    console.log(`${user} has logged out`);
}
async function onFriendShip(friendship) {
    const frienddShipRe = /chatgpt|chat/;
    if (friendship.type() === 2) {
        if (frienddShipRe.test(friendship.hello())) {
            await friendship.accept();
        }
    }
}
const bot = WechatyBuilder.build({
    name: 'WechatEveryDay',
    puppet: 'wechaty-puppet-wechat',
    puppetOptions: {
        uos: true
    }
});
bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
{
    bot.on('friendship', onFriendShip);
}
bot
    .start()
    .then(() => console.log('Start to log in wechat...'))
    .catch((e) => console.error(e));

if(typeof window !== 'undefined') {
  window._VERSION_ = '1.0.0'
}
