<!-- ModalComponent.vue -->
<template>
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <form @submit.prevent="handleSubmit">
              <div class="modal-container">
                <span class="close" @click="$emit('close')">&times;</span>
              <div class="modal-header">
                <h3 slot="header">
                    Create Prompt
                </h3>
              </div>

              <div class="modal-body">
                <slot name="body">
                  
                    <div>
                      <label>Name</label>
                      <input v-model="promptData.promptName" placeholder="Prompt name..." required>
                    </div>
                    
                    <div>
                      <label>Description</label>
                      <input v-model="promptData.promptContent" placeholder="Prompt content..." required>
                    </div>                  
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                    <div style="display: flex; justify-content: center;">
                      <button type="submit" class="modal-default-button">Create</button>
                    </div>
                </slot>
              </div>
            </div>
            </form>
            
          </div>
        </div>
      </transition>
  </template>
  
  <script>
  import { addPrompt } from "@/api/getData";
  import { EventBus } from '@/eventbus/eventBus';
  export default {
    data() {
        return {
          promptData:{
            promptName:"",
            promptContent:"",
          }
        };
    },
    methods: {
      handleSubmit() {
        this.$emit('close');
        addPrompt(this.promptData).then((res) => {
          EventBus.$emit('updatePromptList', JSON.parse(res["data"]));
        });
      },
    }
  }
  </script>
  
  <style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    }

    .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    }

    .modal-container {
      max-width: 500px;
      margin: 40px auto;
      padding: 20px;
      background: #4F4F4F;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-container div{
      margin-bottom: 20px;
    }

    .modal-header h3 {
    margin-top: 0;
    color: #FFFFFF;
    }

    .modal-body {
    margin: 20px 0;
    }

    .modal-default-button {
    float: right;
    }

    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
    opacity: 0;
    }

    .modal-leave-active {
    opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    }

    label {
  display: block;
  margin-bottom: 8px;
  color: #FFFFFF;
  font-weight: bold;
}
select,
input,
textarea {
  color: #F0F0F0;
  width: 100%;
  padding: 8px;
  background: #4F4F4F;
  border: 1px solid #6C6C6C;
  border-radius: 4px;
  box-sizing: border-box; /* 添加这一行保证 padding 不会影响最终宽度 */
  transition: border-color 0.3s;
}

input::placeholder,
textarea::placeholder {
  color: #D0D0D0;
}

input:focus,
textarea:focus {
  outline: none;
}

button {
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  