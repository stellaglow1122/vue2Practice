const Mock = require("mockjs");



Mock.mock(/app\/appList/, 'post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return appList
})

Mock.mock(/chat\/GetChatMessage/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    let params = JSON.parse(config.body);
    if (!sessionStorage.getItem('chatMessage'))
    {
        sessionStorage.setItem('chatMessage', JSON.stringify({}));
    }
    let chatMessage = JSON.parse(sessionStorage.getItem('chatMessage'));
    chatMessage.hasOwnProperty(params.chatId)
    /* if (!chatMessage.hasOwnProperty(params.chatId))
    {
        chatMessage[params.chatId] = 
        [
            {
              headImg: require("@/assets/img/head_portrait1.png"),
              name: "chatgpt",
              time: new Date().toLocaleTimeString(),
              msg: "請輸入文字開始和chatgpt的聊天",
              chatType: 0, //信息类型，0文字，1图片
              uid: params.chatId, //uid
            }
        ];
        sessionStorage.setItem('chatMessage', JSON.stringify(chatMessage));
        return chatMessage[params.chatId];
    } */
    
    return chatMessage[params.chatId];
})

Mock.mock(/chat\/AddChatMessage/, 'post', (config) => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    
    try
    {
        
        let params = JSON.parse(config.body);
        console.log(params);
        if (!sessionStorage.getItem('chatMessage'))
        {
            sessionStorage.setItem('chatMessage', JSON.stringify({}));
        }
        let chatMessage = JSON.parse(sessionStorage.getItem('chatMessage'));
        if (chatMessage.hasOwnProperty(params.chatId))
        {
            chatMessage[params.chatId].push(params.message);
            sessionStorage.setItem('chatMessage', JSON.stringify(chatMessage));
        }
        else
        {
            /* chatMessage[params.chatId] = 
            [
                {
                headImg: require("@/assets/img/head_portrait1.png"),
                name: "chatgpt",
                time: new Date().toLocaleTimeString(),
                msg: "請輸入文字開始和chatgpt的聊天",
                chatType: 0, //信息类型，0文字，1图片
                uid: params.chatId, //uid
                }
            ];
            sessionStorage.setItem('chatMessage', JSON.stringify(chatMessage)); */
            chatMessage[params.chatId] = [params.message];
            console.log(chatMessage);
            sessionStorage.setItem('chatMessage', JSON.stringify(chatMessage));
        }
        chatMessage = JSON.parse(sessionStorage.getItem('chatMessage'));
        return Mock.mock({
            message: "Succeeded",
            data: chatMessage[params.chatId],
        });
    }
    catch (error)
    {
        return Mock.mock({
            message: error.message,
            data: JSON.stringify(error.message)
        });
        /* return Mock.mock({
            message: '数据接收成功',
            yourData: data  // 可以直接返回接收到的数据或根据数据生成其他数据
        }); */
    }
    
   
})


Mock.mock(/chat\/GetChatList/, 'post', (options) => {
    if (sessionStorage.getItem('chatList'))
    {
        return JSON.parse(sessionStorage.getItem('chatList'));
    }
    else
    {
        if (!sessionStorage.getItem('chatid'))
        {
            sessionStorage.setItem('chatid', (1002).toString());
        }
        let chatid = parseInt(sessionStorage.getItem('chatid'));
        let chatList = [
        {
            img: "",
            name: "chatgpt",
            detail: "Welcome Chat",
            lastMsg: "to do",
            id: chatid,
            headImg: require("@/assets/img/head_portrait1.png"),
        },
        ]
        sessionStorage.setItem('chatList', JSON.stringify(chatList));
        chatList = sessionStorage.getItem('chatList');
        return JSON.parse(chatList);
    }
});
Mock.mock(/chat\/AddChat/, 'post', (options) => {
    const data = JSON.parse(options.body);
    try
    {
        if (sessionStorage.getItem('chatList'))
        {
            let chatList = JSON.parse(sessionStorage.getItem('chatList'));
            let chatid = parseInt(sessionStorage.getItem('chatid'));
            ++chatid;
            sessionStorage.setItem('chatid', chatid.toString());
            chatList.push({
                img: "",
                name: "chatgpt",
                detail: "Welcome Chat",
                lastMsg: "to do",
                id: chatid,
                headImg: require("@/assets/img/head_portrait1.png"),
            });
            sessionStorage.setItem('chatList', JSON.stringify(chatList));
        }
        else
        {
            if (!sessionStorage.getItem('chatid'))
            {
                sessionStorage.setItem('chatid', (1002).toString());
            }
            let chatid = parseInt(sessionStorage.getItem('chatid'));
            let chatList = [
            {
                img: "",
                name: "chatgpt",
                detail: "Welcome Chat",
                lastMsg: "to do",
                id: chatid,
                headImg: require("@/assets/img/head_portrait1.png"),
            },
            ]
            sessionStorage.setItem('chatList', JSON.stringify(chatList));
        }
        return Mock.mock({
            message: "Succeeded",
            data: sessionStorage.getItem('chatList')
        });
    }
    catch (error)
    {
        return Mock.mock({
            message: error.message,
        });
        /* return Mock.mock({
            message: '数据接收成功',
            yourData: data  // 可以直接返回接收到的数据或根据数据生成其他数据
        }); */
    }
    

    
    
  });

  Mock.mock(/prompt\/GetPromptList/, 'post', (options) => {
    if (sessionStorage.getItem('promptList'))
    {
        return JSON.parse(sessionStorage.getItem('promptList'));
    }
    /* else
    {
        if (!sessionStorage.getItem('promptid'))
        {
            sessionStorage.setItem('promptid', (1002).toString());
        }
        let promptid = parseInt(sessionStorage.getItem('promptid'));
        let promptList = [
        {
            img: "",
            name: "chatgpt",
            detail: "Welcome Chat",
            lastMsg: "to do",
            id: promptid,
            headImg: require("@/assets/img/head_portrait1.png"),
        },
        ]
        sessionStorage.setItem('promptList', JSON.stringify(promptList));
        promptList = sessionStorage.getItem('promptList');
        return JSON.parse(promptList);
    } */
});
Mock.mock(/prompt\/AddPrompt/, 'post', (options) => {
    const data = JSON.parse(options.body);
    try
    {
        if (sessionStorage.getItem('promptList'))
        {
            let promptList = JSON.parse(sessionStorage.getItem('promptList'));
            let promptid = parseInt(sessionStorage.getItem('promptid'));
            ++promptid;
            sessionStorage.setItem('promptid', promptid.toString());
            promptList.push({
                img: "",
                promptName: data.promptName,
                promptContent: data.promptContent,
                id: promptid,
                headImg: require("@/assets/img/head_portrait1.png"),
            });
            sessionStorage.setItem('promptList', JSON.stringify(promptList));
        }
        else
        {
            if (!sessionStorage.getItem('promptid'))
            {
                sessionStorage.setItem('promptid', (1002).toString());
            }
            let promptid = parseInt(sessionStorage.getItem('promptid'));
            let promptList = [
            {
                img: "",
                promptName: data.promptName,
                promptContent: data.promptContent,
                id: promptid,
                headImg: require("@/assets/img/head_portrait1.png"),
            },
            ]
            sessionStorage.setItem('promptList', JSON.stringify(promptList));
        }
        return Mock.mock({
            message: "Succeeded",
            data: sessionStorage.getItem('promptList')
        });
    }
    catch (error)
    {
        return Mock.mock({
            message: error.message,
        });
        /* return Mock.mock({
            message: '数据接收成功',
            yourData: data  // 可以直接返回接收到的数据或根据数据生成其他数据
        }); */
    }
    

    
    
  });

  Mock.mock(/assistant\/GetAssistantList/, 'post', (options) => {
    if (sessionStorage.getItem('assistanttList'))
    {
        return JSON.parse(sessionStorage.getItem('assistanttList'));
    }
/*     else
    {
        if (!sessionStorage.getItem('assistantid'))
        {
            sessionStorage.setItem('assistantid', (1002).toString());
        }
        let assistantid = parseInt(sessionStorage.getItem('assistantid'));
        let assistanttList = [
        {
            img: "",
            name: "chatgpt",
            detail: "Welcome Chat",
            lastMsg: "to do",
            id: assistantid,
            headImg: require("@/assets/img/head_portrait1.png"),
        },
        ]
        sessionStorage.setItem('assistanttList', JSON.stringify(assistanttList));
        assistanttList = sessionStorage.getItem('assistanttList');
        return JSON.parse(assistanttList);
    } */
});
Mock.mock(/assistant\/AddAssistant/, 'post', (options) => {
    const data = JSON.parse(options.body);
    try
    {
        if (sessionStorage.getItem('assistanttList'))
        {
            let assistanttList = JSON.parse(sessionStorage.getItem('assistanttList'));
            let assistantid = parseInt(sessionStorage.getItem('assistantid'));
            ++assistantid;
            sessionStorage.setItem('assistantid', assistantid.toString());
            assistanttList.push({
                img: "",
                assistantName: data.assistantName,
                assistantDescription: data.assistantDescription,
                assistantModel: data.assistantModel,
                assistantPrompt: data.assistantPrompt,
                id: assistantid,
                headImg: require("@/assets/img/head_portrait1.png"),
            });
            sessionStorage.setItem('assistanttList', JSON.stringify(assistanttList));
        }
        else
        {
            if (!sessionStorage.getItem('assistantid'))
            {
                sessionStorage.setItem('assistantid', (1002).toString());
            }
            let assistantid = parseInt(sessionStorage.getItem('assistantid'));
            let assistanttList = [
            {
                img: "",
                assistantName: data.assistantName,
                assistantDescription: data.assistantDescription,
                assistantModel: data.assistantModel,
                assistantPrompt: data.assistantPrompt,
                id: assistantid,
                headImg: require("@/assets/img/head_portrait1.png"),
            },
            ]
            sessionStorage.setItem('assistanttList', JSON.stringify(assistanttList));
        }
        return Mock.mock({
            message: "Succeeded",
            data: sessionStorage.getItem('assistanttList')
        });
    }
    catch (error)
    {
        return Mock.mock({
            message: error.message,
        });
    }
    
  });

let appList = Mock.mock(
    [
        {
            img: "",
            name: "chatgpt",
            detail: "An advanced conversational AI model developed by OpenAI.",
            headImg: require("@/assets/img/head_portrait1.png"),
        },
        {
            img: "",
            name: "LLaMA-2",
            detail: "LLaMA-2 is a series of large language models developed by Meta AI.",
            headImg: require("@/assets/img/head_portrait1.png"),
        },
    ]
)


let friendList = Mock.mock(
    [
        {
            img: "",
            name: "chatgpt 3",
            detail: "Welcome Chat 3",
            lastMsg: "to do",
            id: "1002",
            headImg: require("@/assets/img/head_portrait1.png"),
        },
    ]
)

let chatMsg = Mock.mock(
    {
        "1002":
        [
            {
                headImg: require("@/assets/img/head_portrait1.png"),
                name: "chatgpt",
                time: new Date().toLocaleTimeString(),
                msg: " gpt-3模型为您服务",
                chatType: 0, //信息类型，0文字，1图片
                uid: "1002", //uid
            }
        ]
    }
)

let chatMsg1002 = Mock.mock(
    [
        // {
        //     headImg: require("@/assets/img/head_portrait.jpg"),
        //     name: "大毛是小白",
        //     time: new Date().toLocaleTimeString(),
        //     msg: " 在吗？",
        //     chatType: 0, //信息类型，0文字，1图片
        //     uid: "1001", //uid
        // },

        {
            headImg: require("@/assets/img/head_portrait1.png"),
            name: "chatgpt",
            time: new Date().toLocaleTimeString(),
            msg: " gpt-3模型为您服务",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        }
        // {
        //     headImg: require("@/assets/img/head_portrait.jpg"),
        //     name: "大毛是小白",
        //     time: new Date().toLocaleTimeString(),
        //     msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
        //     chatType: 1, //信息类型，0文字，1图片
        //     extend: {
        //         imgType: 1, //(1表情，2本地图片)
        //     },
        //     uid: "1001",
        // },
    ]
)
let chatMsg1003 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: "在干嘛呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: new Date().toLocaleTimeString(),
            msg: "吃饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: "吃的什么饭",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: new Date().toLocaleTimeString(),
            msg: "蛋炒饭",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: "加蛋了吗？",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: new Date().toLocaleTimeString(),
            msg: "你说呢",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait2.jpg"),
            name: "小毛",
            time: new Date().toLocaleTimeString(),
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1002", //uid
        },
    ]
)
let chatMsg1004 = Mock.mock(
    [
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: " sadasdawdas sadsad sad sad as despite ofhaving so much to do",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1001", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: require("@/assets/img/emoji/slightly-smiling-face.png"),
            chatType: 1, //信息类型，0文字，1图片
            extend: {
                imgType: 1, //(1表情，2本地图片)
            },
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: new Date().toLocaleTimeString(),
            msg: " 21312大萨达萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
        {
            headImg: require("@/assets/img/head_portrait.jpg"),
            name: "大毛是小白",
            time: new Date().toLocaleTimeString(),
            msg: "111212",
            chatType: 0, //信息类型，0文字，1图片, 2文件
            uid: "1001",
        },
        {
            headImg: require("@/assets/img/head_portrait3.jpg"),
            name: "小王",
            time: new Date().toLocaleTimeString(),
            msg: "大萨达萨达所大大萨达",
            chatType: 0, //信息类型，0文字，1图片
            uid: "1002", //uid
        },
    ]
)