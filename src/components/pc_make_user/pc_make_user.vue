<template>
  <PCModal
    v-if="isShowForm"
    :type="'PCForm'"
    @close="onHideForm"
  >
    <template slot="header">
      Добавление пользователя
    </template>
    <template slot="main">
      <div class="">
        <div class="form__input-control">
          <label for="username">Имя</label>
          <input type="text" name="username" id="username" v-model="username" />
        </div>
        <div class="form__input-control">
          <label for="username">Телефон</label>
          <input type="text" name="phone" v-model="phone" />
        </div>
        <PCSelect
          v-if="isSuperiors"
          :variants="superiorList"
          :placeholder="'Выберите руководителя'"
          class="form__select"
          @select="select"
        />
      </div>
    </template>
    <div slot="footer" class="">
      <PCButton
        white
        :base-style="{
          width: 150,
          height: 35,
          fontSize: 16,
          lineHeight: 32,
        }"
        @click="onResetForm"
      >Очистить</PCButton>
      <PCButton
        :base-style="{
          width: 150,
          height: 35,
          fontSize: 16,
          lineHeight: 36,
        }"
        @click="onSubmitForm"
      >Сохранить</PCButton>
    </div>
  </PCModal>
</template>

<script>
import PC_EVENT_BUS from 'js/pc_event_bus';

import {
  PC_USER_LIST,
  PC_UPDATED_USER_LIST
} from 'js/constants';

const _ = require('lodash');
const uniqid = require('uniqid');

export default {
  name: 'PCMakeUser',
  components: {},
  created() {
    PC_EVENT_BUS.$on('addUser', this.onShowForm);
  },
  mounted() {
    if (localStorage && localStorage.getItem(PC_USER_LIST)) {
      this.userList = JSON.parse(localStorage.getItem(PC_USER_LIST));
    }
  },
  beforeDestroy() {
    PC_EVENT_BUS.$off('addUser', this.onShowForm);
  },
  data() {
    return {
      userList: [],
      username: '',
      phone: '',
      currentSuperior: null,
      isShowForm: false,
    };
  },
  computed: {
    isSuperiors() {
      return this.userList.length > 0;
    },
    superiorList() {
      return this.userList.map(({ username }) => username);
    },
  },
  watch: {
    userList: {
      handler() {
        console.log('userList changed!');
        localStorage.setItem(PC_USER_LIST, JSON.stringify(this.userList));
        PC_EVENT_BUS.$emit(PC_UPDATED_USER_LIST, {});
      },
      deep: true,
    },
  },
  methods: {
    onShowForm() {
      this.isShowForm = true;
    },
    onHideForm() {
      this.isShowForm = false;
    },
    select(payload) {
      console.log('select', payload);
      this.currentSuperior = _.find(this.userList, ({ username }) => username === payload.variant);
    },
    onResetForm() {
      this.username = '';
      this.phone = '';
      this.currentSuperior = null;
    },
    onSubmitForm() {
      this.userList.push({
        id: uniqid(),
        username: this.username,
        phone: this.phone,
        superior: this.currentSuperior,
      });
      this.onResetForm();
      this.onHideForm();
    },
  },
};
</script>

<style>
  .form__input-control {
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .form__input-control input {
    padding: 5px;
    outline: none;
  }
  .form__input-control + .form__input-control {
    padding-top: 0px;
  }
  .form__select {
    padding-bottom: 20px;
  }
  .form__select.pc-dropdown--folded .pc-dropdown__header {
    position: relative;
    padding: 10px;
    cursor: pointer;
  }
  .form__select.pc-dropdown--folded .pc-dropdown__header:after {
    content: "\2193";
    position: absolute;
    top: 50%;
    right: 80px;
    transform: translateY(-50%);
  }
  .form__select.pc-dropdown--unfolded .pc-dropdown__header {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid;
  }
  .form__select.pc-dropdown--unfolded .pc-dropdown__header:after {
    content: "\2191";
    position: absolute;
    top: 50%;
    right: 80px;
    transform: translateY(-50%);
  }
</style>
