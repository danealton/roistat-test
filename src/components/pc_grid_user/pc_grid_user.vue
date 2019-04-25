<template>
  <main class="pc-grid-user">
    <div class="table">
      <div class="table__head">
        <div class="table__row-head">
          <div
            v-for="({ displayName }, columnId) in columns"
            :key="columnId"
            class="table__cell-head"
          >
            {{ displayName }}
          </div>
        </div>
      </div>
      <div class="table__body">
        <div v-if="emptyData" class="table__empty">
          Данные отсутствуют
        </div>
        <template
          v-for="(row, rowId) in rows"
        >
          <div
            :key="rowId"
            :class="['table__row']"
          >
            <div
              v-for="({ columnName }, cellId) in columns"
              :key="cellId"
              class="table__cell"
            >
              {{ row[columnName] }}
            </div>
          </div>
          <template v-if="row.superior">
            <div
              :key="row.superior.id"
              :class="['table__row', 'table__row-is-minion']"
            >
              <div
                v-for="({ columnName }, cellId) in columns"
                :key="cellId"
                class="table__cell"
              >
                {{ row.superior[columnName] }}
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import PC_EVENT_BUS from 'js/pc_event_bus';

import {
  PC_USER_LIST,
  PC_UPDATED_USER_LIST
} from 'js/constants';

// const _ = require('lodash');

export default {
  name: 'PCGridUser',
  components: {},
  created() {
    PC_EVENT_BUS.$on(PC_UPDATED_USER_LIST, this.updateUserList);
  },
  mounted() {
    if (localStorage && localStorage.getItem(PC_USER_LIST)) {
      this.updateUserList();
    }
  },
  beforeDestroy() {
    PC_EVENT_BUS.$off(PC_UPDATED_USER_LIST, this.updateUserList);
  },
  data() {
    return {
      columns: [
        {
          columnName: 'username',
          displayName: 'Имя',
        },
        {
          columnName: 'phone',
          displayName: 'Номер телефона',
        },
      ],
      rows: [],
    };
  },
  computed: {
    emptyData() {
      return this.rows.length === 0;
    },
  },
  methods: {
    updateUserList() {
      const userList = JSON.parse(localStorage.getItem(PC_USER_LIST));
      this.rows = this.prepareUserList(userList);
    },
    prepareUserList(userList) {
      return userList;
      // const users = JSON.parse(JSON.stringify(userList));
      // return userList.map((currentUser, index) => {
      //   const { superior } = currentUser;
      //   let children = null;
      //   if (superior !== null) {
      //     children = _.find(users, (user) => user.id === superior.id);
      //     // const parent = _.find(userList, (user) => user.id === superior.id);
      //     // parent.children = userList[index];
      //     // return parent;
      //   }
      //   return {
      //     ...currentUser,
      //     children
      //   };
      //   // return currentUser;
      // });
    },
    isMinion({ superior }) {
      return superior !== null;
    },
  },
};
</script>

<style>
  .pc-grid-user {
    position: relative;
    padding: 10px 30px;
  }

  .table {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .table__empty {
    padding: 10px;
  }
  .table__head {
    border: 1px solid;
  }
  .table__body {
    border: 1px solid;
    border-top: none;
  }
  .table__row-head {
    display: flex;
    flex-direction: row;
  }
  .table__cell-head {
    padding: 10px;
    flex: 1;
  }
  .table__cell-head + .table__cell-head {
    border-left: 1px solid;
    flex: 2;
  }
  .table__row {
    display: flex;
    flex-direction: row;
  }
  .table__row + .table__row {
    border-top: 1px solid;
  }
  .table__cell {
    padding: 10px;
    flex: 1;
  }
  .table__cell + .table__cell {
    border-left: 1px solid;
    flex: 2;
  }
  .table__row-is-minion {
    padding-left: 30px;
  }
</style>
