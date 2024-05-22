<template>
  <div class="chatLeft">
    <div class="title">
      <h1>MyLLM</h1>
    </div>
    <div class="online-chat">
      <span class="online-text"></span>
      <div class="prompt-cards-wrapper">
        <el-button class="newPrompt" @click="$emit('showModal')">
          + New Prompt
        </el-button>
        <div
          class="promptList"
          v-for="promptInfo in promptList"
          :key="promptInfo.id"
          @click="clickChat(promptInfo)"
        >
          <PromptCard
            :promptInfo="promptInfo"
            :pcCurrent="pcCurrent"
          ></PromptCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromptCard from "@/components/PromptCard.vue";
import { getPromptList, addPrompt } from "@/api/getData";
import HeadPortrait from "./HeadPortrait.vue";
import { EventBus } from '@/eventbus/eventBus';

export default {
  props: {

  },
  components: {
    HeadPortrait,
    PromptCard,
  },
  data() {
    return {
      promptList: [],
      pcCurrent: '',
    }
  },
  mounted() {
    getPromptList().then((res) => {
      this.promptList = res;
    });
    EventBus.$on('updatePromptList', (data) => {
      this.promptList = data;
    });
  },
  methods: {
    clickChat(info) {
      //this.$emit('updateChatWindow', info);
      //this.showChatWindow = true;
      //this.chatWindowInfo = info;
      //this.promptInfo = info;
      this.pcCurrent = info.id;
    },
    addPromptToList() {
      addPrompt().then((res) => {
        console.log(res);
        this.promptList = JSON.parse(res["data"]);
    });
    },
    PromptCardSort(id) {
      if (id !== this.promptList[0].id) {
        console.log(id);
        let nowpromptInfo;
        for (let i = 0; i < this.promptList.length; i++) {
          if (this.promptList[i].id == id) {
            nowpromptInfo = this.promptList[i];
            this.promptList.splice(i, 1);
            break;
          }
        }
        this.promptList.unshift(nowpromptInfo);
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
    .prompt-cards-wrapper {
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