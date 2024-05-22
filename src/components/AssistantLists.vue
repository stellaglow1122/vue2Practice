<template>
  <div class="chatLeft">
    <div class="title">
      <h1>MyLLM</h1>
    </div>
    <div class="online-chat">
      <span class="online-text"></span>
      <div class="chat-cards-wrapper">
        <el-button class="newAssistant" @click="$emit('showModal')">
          + New Assistant
        </el-button>
        <!-- <input type="text" v-model="searchQuery" placeholder="Search..." /> -->
        <div
          class="assistantList"
          v-for="assistantInfo in assistantList"
          :key="assistantInfo.id"
          @click="clickChat(assistantInfo)"
        >
          <AssistantCard
            :assistantInfo="assistantInfo"
            :pcCurrent="pcCurrent"
          ></AssistantCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssistantCard from "@/components/AssistantCard.vue";
import { getAssistantList, addAssistant } from "@/api/getData";
import HeadPortrait from "./HeadPortrait.vue";
import { EventBus } from '@/eventbus/eventBus';
export default {
  props: {

  },
  components: {
    HeadPortrait,
    AssistantCard,
  },
  data() {
    return {
      searchQuery: '',
      assistantList: [],
      pcCurrent: '',
    }
  },
  mounted() {
    getAssistantList().then((res) => {
      this.assistantList = res;
    });
    EventBus.$on('updateAssistantList', (data) => {
      this.assistantList = data;
    });
  },
  computed: {
    filteredAssistantList() {
      return this.assistantList.filter(item => {
        return item.assistantName.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    clickChat(info) {
      this.$emit('updateChatWindow', info);
      //this.showChatWindow = true;
      //this.chatWindowInfo = info;
      //this.assistantInfo = info;
      this.pcCurrent = info.id;
    },
    addAssistantToList() {
      addAssistant().then((res) => {
        this.assistantList = JSON.parse(res["data"]);
    });
    },
    AssistantCardSort(id) {
      if (id !== this.assistantList[0].id) {
        console.log(id);
        let nowassistantInfo;
        for (let i = 0; i < this.assistantList.length; i++) {
          if (this.assistantList[i].id == id) {
            nowassistantInfo = this.assistantList[i];
            this.assistantList.splice(i, 1);
            break;
          }
        }
        this.assistantList.unshift(nowassistantInfo);
      }
    },
  },
  beforeDestroy() {
    EventBus.$off('updateAssistantList');
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