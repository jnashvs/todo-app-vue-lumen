<template>
  <div>
    <v-card class="mx-auto" v-model="dialog" max-width="500">
      <v-toolbar color="primary" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>All Tasks</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="primary" dark @click="newItem">
          <v-icon dark>mdi-plus</v-icon>add todo
        </v-btn>

        <!-- modal call -->
        <ModalForm :active="modalstatus" :item="item"></ModalForm>
      </v-toolbar>

      <v-list two-line>
        <template v-for="(item, index) in tasksFiltered">
          <v-list-item :key="item.titulo">
            <template>
              <v-list-item-action>
                <v-checkbox
                  :input-value="item.completed ? 'ctive' : 'inactive'"
                  v-model="item.completed"
                  color="primary"
                  @click="updateTask(item)"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content @dblclick="doubleClick(item)">
                <v-list-item-title v-text="item.title" :class="item.completed ? 'finished-task': ''"></v-list-item-title>
                <v-list-item-subtitle :id="index" v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn class="mx-2" fab dark x-small color="primary" @click="deleteTask(item.id)">
                  <v-icon dark>mdi-close</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index < tasksFiltered.length - 1" :key="index"></v-divider>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import ModalForm from "../components/ModalForm";
import { mapActions } from 'vuex';

export default {
  name: "TodoList",
  components: {
    ModalForm
  },
  created() {
    //this.items = this.$store.getters.all_todos;
    this.$store.dispatch('retrieveTasks')
  },
  computed: {
    modalstatus() {
      return this.$store.state.modal_active;
    },
    editingstatus() {
      return this.$store.state.editing;
    },
    tasksFiltered() {
      return this.$store.getters.tasksFiltered
    }
  },
  data() {
    return {
      items: [],
      item: {},
      dialog: false,
    };
  },
  methods: {
    ...mapActions({updateTask: "updateTask"}),
    newItem() {
      this.item = {
        id: "",
        title: "",
        subtitle: "",
        action: "",
        completed: false
      };
      this.$store.state.modal_active = true;
    },
    doubleClick(item) {
      this.item = item;
      this.$store.state.modal_active = true;
      this.$store.state.editing = true;
    },
    deleteTask(id){
      this.$store.dispatch("deleteTask", id);
    },
    checkTodo(id, checked){
      console.log(JSON.stringify(checked))
    }
  }
};
</script>
<style>

.finished-task{
    text-decoration: line-through;
}

</style>
