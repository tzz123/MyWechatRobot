import { WechatyBuilder } from 'wechaty';
import { ChatGPTAPI } from 'chatgpt';
import qrcodeTerminal from 'qrcode-terminal';
import pRetry from 'p-retry';

const config = {
    AutoReply: true,
    MakeFriend: true,
    ChatGPTSessionToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..5XvL1e7GKnaIUenb._-7v4d7cfwa6r2d54fkfIlHGrS_G2bKWSs4uQP3UdK1XB5O0L66BMNAv-EldCOhr7zDvVBliV1XqVcptiFzG7TMMi4_vm6eIzFwswwFDb9FY3Ic5E-pq3dkVS84SqIPebsz1yyiXnFV2tps3mZXER-gspQDvp0B_JgUsuOOlbEtpSTCZkmctiuwnzaakp2-K0MWGL_fi_qqvkWpk1XMQ6_omIYUGk4VFTzlTiUAPTx23q3SGlaOmEe-N7kntBm1F3Kia0udedV48m-YVfY62rBHpku-1aiP5w8INMFo3OyVzi1Ik_JPfpUxzMnvBFZqQuLoGDnK-oZZuzWOLptXUNWD_Cge0FUhLNB9ryO0uclPHxK7WAlPb-4F7_hxW6hNzziQVQQJ5KLSstaaqwUej3fe9IkvhXW1tWIzfxCOv_wHspMRGHZuw7QXV3dG1B4QV6hqn7S8bpoMqWUGJAemFE04Wq4i_xM7dfDkMRz3_kI3EFeqE1m2skARgLOYSCGhtDQVN18ViM1TipxlfXFG2RRBPK4Yo8tJ7FBhM9bpItzLHeionBaMD1om5kInZpxs9unoGob82j3ys5VtgVw3Q82nmVddh2SVfzAhh41s3zv6RVudBzs9uGJz8VWkM3bW2WYKRdYyxhS6STgi5bV9_2eCy8-tVkYLw8Xx0eWwPVNvOT8LgJpFXgZ9DuFVyIihjHZvVCpyTAQVKqQD20cZZ9DuEPDywix4fkObWyMA-xe8--9XIgEl-pgw1Oft65XMQKaWS6n69ig-cV6m5XYZgPWcPMVFmZ-DIrFgX4znHtNu40K6d-X5exN_nEMou9-Jok5H9Ceddh9SWnQ7_zHzTfURodZqdB76OQBhiMuF7QfjlYYpy9phDEySeZRr96rFgRlW-QCZfCc_KMggGCxgNitDl-Xo9S2qhVuN-LQs21zCbq_LPee2AzkstUfoXehKOUzD4-kp9DKNUSucbdxi4dN8avcwhSQKF5fzMMDXaLUYYcwB15WCGusnH_JiHWzvCV2o176NXq6tlSelWK4cCzWt5y7_Hp3E34FqPhIodHDpveznA8jS1VSjC7Dph1Umxobnmdd-Tkf9NlodwXMuJdk0TaVcw9vjcAhnx0v8L8PM2pQRZLljKHSvb57ONiVklRvhK7GnPsmUztvUEqBnitXdiATAgYSNUVZqzVQOQ9dqPDfV8V7h3BaDXxrWu538DSil7G069Bq-HN_QhHqpXojyUp4yq2y-rT2x0yM72cLuk-X6zVbgj_-I11NOYdL2J-FS8hfzUsYvMM6V-WotgVKnyw0aIyVxS931pGXcXJZmk3lV7Speh_tysmd6c_j4pRZjnAhruwE2T9FOQFtH7BmW4dqthBxWVxbKCDVHJjKLu-pKEWaKbjRKfcjlCVeh-z6t3AtPZ6xaTkn7pWhPnO9FdNchomllcPkjPSUUT3RdgrMzIyRlmGDbBaUtV3yBYDiGH2eKcptWp6u8LyeOkOcJVZ7Nl4dnuXZRTLl4eph962Hazkxvd_frxPE1b7VRBoNNyMHREltOZTzTLzydcnGW4xL-GPcD_l_zf_Cz017IMbnCYxDtmXz5zG0Tbghbv4ZXNNIjBNrBLrmC2LmJsasu3_xH9AbLpjX4JaoxjA63ioQ-orMD_vgox-3ho1B7DPO_VGa10oXduvgre37fcPFLbyJqCtGr5SNDRilfy9cYSZOgoj2tmdLca7luYeotsMMHDD7d1gRkBaq4NoWYSfL00-n2_r1JQnOS9uatJ2TFRy47z--fl9g7bpgZmxeFyhlVxq7lvci6v_74TAODe_OvmN29ezhMDcd_8nc3qcX-yTExNTjWrlt9kMbGcqvFpoXhhhYWj66hL23YKzr9tFPO6PgUPurjmiV51P9WE5iYCbgqZ6ok9yhafjiWBAsoohYdJVOHdUUVIj9KQH3AyLb48GGVDEgXQHm3BUiDBF0ywraB9SZmt_le4zmq6AMRH8AmpbK5q6fGmHY-VN8lPZB0aSwD5NzzrU-ttEAWHW7cUsqdL_B0CZ7GCMo2DjqOKoKAnXmN6LSiwS4uaJ7y5tgmIfs9fzKvgmkxleoDWAlVDUPwG8HAOcikFHn2lWj0jjH9YH4jWfpmFBMewaxVTf68X4ulJdhvydh_TGfCZTOCjA8sqlG8OSqNI0meFOoSLPThz43TCNzzf5_qALjNzBUT1AQq2i_L555tWnQjhvn7PELurHLmfbykGhaou-HFdbtfkoFdHIDn8ba-fIhnFgIm4pqnpQ_haSYTZay7ud1xq5y_YQk7cJdQX8jY2BIV8clLW364AURmrk7zspf9--d9ZTNLaJL6jlw.E55qcuWcrasN4pqQe9ZKMQ'
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
