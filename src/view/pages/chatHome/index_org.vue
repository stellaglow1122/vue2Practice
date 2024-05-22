<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>MyLLM</h1>
      </div>
      <div class="online-chat">
        <span class="online-text"></span>
        <div class="chat-cards-wrapper">
          <el-button class="newChat" @click="addChatToList">
            + New Chat
          </el-button>
          <div
            class="chatList"
            v-for="chatInfo in chatList"
            :key="chatInfo.id"
            @click="clickChat(chatInfo)"
          >
            <PersonCard
              :chatInfo="chatInfo"
              :pcCurrent="pcCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow
          :chatInfo="chatWindowInfo"
          @chatCardSort="chatCardSort"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="icofont icofont-ui-text-chat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import ChatWindow from "./chatwindow.vue";

import { getChatList, addChat } from "@/api/getData";
export default {
  name: "App",
  components: {
    PersonCard,
    ChatWindow,
  },
  data() {
    return {
      pcCurrent: "",
      chatList: [],
      showChatWindow: false,
      chatWindowInfo: {},
      currentTab: "chats",
    };
  },
  mounted() {
    /* let chatList = sessionStorage.getItem('chatList');
    if (chatList)
    {
      this.chatList = JSON.parse(chatList);
      //sessionStorage.setItem('chatList', JSON.stringify(this.chatList));
    }
    else
    {
      let chatList = [
      {
        img: "",
        name: "chatgpt",
        detail: "Welcome Chat",
        lastMsg: "to do",
        id: "1003",
        headImg: require("@/assets/img/head_portrait1.png"),
      },
    ]
      sessionStorage.setItem('chatList', JSON.stringify(chatList));
      chatList = sessionStorage.getItem('chatList');
      this.chatList = JSON.parse(chatList);
    } */
    getChatList().then((res) => {
      console.log(res);
      this.chatList = res;
    });
  },
  methods: {
    clickChat(info) {
      this.showChatWindow = true;
      this.chatWindowInfo = info;
      //this.chatInfo = info;
      this.pcCurrent = info.id;
    },
    addChatToList() {
      /* let chatList = sessionStorage.getItem('chatList');
      if (chatList)
      {
        this.chatList = JSON.parse(chatList);
        this.chatList.push({
            img: "",
            name: "chatgpt",
            detail: "Welcome Chat",
            lastMsg: "to do",
            id: this.id,
            headImg: require("@/assets/img/head_portrait1.png"),
        });
        ++this.id;
        sessionStorage.setItem('chatList', JSON.stringify(this.chatList));
      }
      else
      {
        let chatList = [
        {
          img: "",
          name: "chatgpt",
          detail: "Welcome Chat",
          lastMsg: "to do",
          id: "1003",
          headImg: require("@/assets/img/head_portrait1.png"),
        },
      ]
        sessionStorage.setItem('chatList', JSON.stringify(chatList));
        chatList = sessionStorage.getItem('chatList');
        this.chatList = JSON.parse(chatList);
      } */
      /* this.chatList.push({
            img: "",
            name: "chatgpt",
            detail: "Welcome Chat",
            lastMsg: "to do",
            id: this.id,
            headImg: require("@/assets/img/head_portrait1.png"),
        });
        ++this.id; */
      addChat().then((res) => {
        this.chatList = JSON.parse(res["data"]);
    });
    },
    chatCardSort(id) { // is used when an old chat is now the latest chat?
      if (id !== this.chatList[0].id) {
        console.log(id);
        let nowchatInfo;
        for (let i = 0; i < this.chatList.length; i++) {
          if (this.chatList[i].id == id) {
            nowchatInfo = this.chatList[i];
            this.chatList.splice(i, 1);
            break;
          }
        }
        this.chatList.unshift(nowchatInfo);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chatHome {
  // margin-top: 20px;
  display: flex;
  .chatLeft {
    width: 280px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .online-chat {
      margin-top: 60px;
      .online-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .chat-cards-wrapper {
        padding-left: 10px;
        height: 65vh;
        margin-top: 20px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icofont-ui-text-chat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
</style>
