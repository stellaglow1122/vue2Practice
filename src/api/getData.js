import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

// 获取好友

export const addChat = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/chat/AddChat`,
      data: params
    }).then(res => res.data)
  }
export const addPrompt = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/prompt/AddPrompt`,
      data: params
    }).then(res => res.data)
  }
export const addAssistant = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/assistant/AddAssistant`,
      data: params
    }).then(res => res.data)
  }
export const addChatMessage = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/chat/AddChatMessage`,
      data: params
    }).then(res => res.data)
  }
export const getChatList = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/chat/GetChatList`,
      data: params
    }).then(res => res.data)
  }
export const getPromptList = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/prompt/GetPromptList`,
      data: params
    }).then(res => res.data)
  }
export const getAssistantList = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/assistant/GetAssistantList`,
      data: params
    }).then(res => res.data)
  }
export const getChatMessage = params => {
    return axios({
      method: 'post',
      baseURL: `${baseUrl}/chat/GetChatMessage`,
      data: params
    }).then(res => res.data)
  }
export const getApp = params => {
  return axios({
    method: 'post',
    baseURL: `${baseUrl}/app/appList`,
    data: params
  }).then(res => res.data)
}


  // 获取聊天信息
  export const chatgpt = params => {
    let messages = [];
    params.messageList.forEach((item) => {
      messages.push({"role": item.role,"content": item.msg});
    });
    messages.unshift({"role": "system","content": params.prompt});



    /* return axios({
      method: 'post',
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      },
      data: `{
        "model": "gpt-4-turbo-preview",
        "messages": "[
          {
            "role": "system",
            "content": "You are a helpful assistant."
          },
          {
            "role": "user",
            "content": "Hello!"
          }
        ]",
      }`
    }).then(res => res.data) */
    console.log(messages);
    return axios.post("https://api.openai.com/v1/chat/completions", `{
      "model": "${params.model}",
      "messages": ${JSON.stringify(messages)}
    }`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer'
      }
    })
    .then(res => res.data)
    .catch(error => {
      console.error('Error with request', error);
    });
  }
