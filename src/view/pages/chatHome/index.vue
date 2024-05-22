<template>
  <div class="chatHome">
    <ChatLists @updateChatWindow="updateChatWindow" v-show="showChatLeft['chats']">

    </ChatLists>
    <PromptLists v-show="showChatLeft['prompts']" @showModal="showModal">

    </PromptLists>

    <AssistantLists v-show="showChatLeft['assistants']" @showModal="showModal">

    </AssistantLists>
    <AssistantModal v-if="modalVisible['assistants']" @close="modalVisible['assistants'] = false">
              <!--
            you can use custom content here to overwrite
            default content
          -->
    </AssistantModal>
    <PromptModal v-if="modalVisible['prompts']" @close="modalVisible['prompts'] = false">
              <!--
            you can use custom content here to overwrite
            default content
          -->
    </PromptModal>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow
          :chatInfo="chatWindowInfo"
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
import ChatWindow from "./chatwindow.vue";
import ChatLists from "@/components/ChatLists.vue";
import PromptLists from "@/components/PromptLists.vue";
import AssistantLists from "@/components/AssistantLists.vue";
import AssistantModal from "@/components/AssistantModal.vue";
import PromptModal from "@/components/PromptModal.vue";

export default {
  name: "App",
  components: {
    ChatWindow,
    ChatLists,
    PromptLists,
    AssistantLists,
    AssistantModal,
    PromptModal,
  },
  data() {
    return {
      showChatWindow: false,
      showChatLeft: {"chats": true, "prompts": false, "assistants": false},
      chatWindowInfo: {},
      currentTab: "chats",
      modalVisible: {"prompts": false, "assistants": false},
    };
  },
  watch: {
    '$route'(to, from) {
      this.currentTab = this.$route.query.tab;
      this.updateLeftChat();
    }
  },
  methods: {
    showModal() {
      this.modalVisible[this.currentTab] = true;
    },
    updateChatWindow(chatInfo)
    {
      this.showChatWindow = true;
      this.chatWindowInfo = chatInfo;
      //this.chatInfo = info;
    },
    updateLeftChat()
    {
      switch (this.currentTab) {
        case 'chats':
          this.showChatLeft["chats"] = true;
          this.showChatLeft["prompts"] = false;
          this.showChatLeft["assistants"] = false;
          break;
        case 'prompts':
          this.showChatLeft["chats"] = false;
          this.showChatLeft["prompts"] = true;
          this.showChatLeft["assistants"] = false;
          break;
        case 'assistants':
          this.showChatLeft["chats"] = false;
          this.showChatLeft["prompts"] = false;
          this.showChatLeft["assistants"] = true;
          break;
        default:
          break;
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
.blur-background {
  filter: blur(5px);
}
</style>
