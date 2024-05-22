<template>
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
          <ChatCard
            :chatInfo="chatInfo"
            :pcCurrent="pcCurrent"
          ></ChatCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatCard from "@/components/ChatCard.vue";
import { getChatList, addChat } from "@/api/getData";
import HeadPortrait from "./HeadPortrait.vue";

export default {
  props: {

  },
  components: {
    HeadPortrait,
    ChatCard,
  },
  data() {
    return {
      chatList: [],
      pcCurrent: '',
    }
  },
  mounted() {
    getChatList().then((res) => {
      this.chatList = res;
    });
  },
  methods: {
    clickChat(info) {
      this.$emit('updateChatWindow', info);
      //this.showChatWindow = true;
      //this.chatWindowInfo = info;
      //this.chatInfo = info;
      this.pcCurrent = info.id;
    },
    addChatToList() {
      addChat().then((res) => {
        this.chatList = JSON.parse(res["data"]);
    });
    },
    chatCardSort(id) {
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
  }
};
</script>

<style lang="scss" scoped>
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
</style>