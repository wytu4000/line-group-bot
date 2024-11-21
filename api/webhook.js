const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const events = req.body.events;

  events.forEach(event => {
    if (event.type === 'message' && event.source.type === 'group' && event.message.text === '/getGroupId') {
      const groupId = event.source.groupId;

      // 回應群組 ID
      replyMessage(event.replyToken, `這個群組的 Group ID 為：${groupId}`);

      console.log(`收到群組訊息，群組 ID 為：${groupId}`);
    }
  });

  res.status(200).send('OK');
};

async function replyMessage(replyToken, message) {
  const CHANNEL_ACCESS_TOKEN = 'xbt01tHWUjgvoru0eN015H4Bzmhy/pfsWOwC0/ubdj6SOB0BO91UOPg7b0VoMeIML0ssyAPwrGwS+FfSSZVFlCPESLKbJiqPghVXiwH76JCNBODLWDPiSiXzRfgOzWwK1Ac9I850ruo1cwz7n0Z7PgdB04t89/1O/w1cDnyilFU=';
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
  };
  const data = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: message
      }
    ]
  };

  try {
    await axios.post(url, data, { headers });
    console.log('成功回應訊息');
  } catch (error) {
    console.error('回應訊息時發生錯誤：', error.response ? error.response.data : error.message);
  }
}
