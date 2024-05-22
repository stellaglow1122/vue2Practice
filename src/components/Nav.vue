<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ activeNav: index == current }"
          @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span class="icofont icofont-2x" :class="item"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";

export default {
  components: {
    HeadPortrait,
  },
  data() {
    return {
      menuList: [
        "icofont-ui-text-chat",
        "icofont-pencil-alt-2",
        "icofont-robot",
        //"icon-shandian",
        //"icon-shezhi",
      ],
      current: 0,
      imgUrl: require('@/assets/img/head_portrait.jpg')
    };
  },
  methods: {
    changeMenu(index) {
      switch (index) {
        case 0:
          /* this.$router.push({
            name: "ChatHome",
          }, () => {}); */
          this.$router.push({ query: { ...this.$route.query, tab: "chats" } });
          break;
        case 1:
          /* this.$router.push({
            name: "Agent",
          }, () => {}); */
          this.$router.push({ query: { ...this.$route.query, tab: "prompts" } });
          break;
        case 2:
          this.$router.push({ query: { ...this.$route.query, tab: "assistants" } });
          break;
        case 3:
          this.$message("This function is still under development.");
          break;
        case 4:
          this.$message("This function is still under development.");
          break;
        default:
          this.$router.push({
            name: "ChatGGG",
          });
      }

      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/icofont/icofont.min.css';
.nav {
  width: 100%;
  height: 90vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
        &:hover {
          span {
            color: rgb(29, 144, 245);
          }
          .block {
            opacity: 1;
          }
        }
      }
    }
  }
  .own-pic {
    position: absolute;
    bottom: 10%;
    margin-left: 25px;
  }
}
.activeNav {
  span {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}
</style>