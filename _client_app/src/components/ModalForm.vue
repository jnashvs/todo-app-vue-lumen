<template>
  <div>
    <v-row justify="center">
      <v-dialog ref="refmodal" v-model="modalstatus" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add new task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Título" v-model="item.title"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Subtítulo" v-model="item.subtitle"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Data" v-model="item.action"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addOrUpdateTodo">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
      item: {
        id: "",
        titulo: "",
        subtitulo: "",
        action: "",
        completed: ""
      },
  },
  created(){
    console.log('modal status: '+this.modalstatus)
    console.log('editing status: '+this.editingstatus)
  },
  data() {
    return {
      newItem: {
        id: "",
        titulo: "",
        subtitulo: "",
        action: "",
        completed: ""
      }
    };
  },
  computed:{
    modalstatus(){
      return this.$store.state.modal_active
    },
    editingstatus(){
      return this.$store.state.editing
    }
  },
  methods: {

    addOrUpdateTodo() {
      if (this.item.length == 0) {
        return;
      }

      if(this.$store.state.editing === true){
        this.$store.dispatch("updateTask", this.item);
      }
      
      if(this.$store.state.editing === false){
        this.$store.dispatch("addTask", this.item);
      }

      this.closeModal();
    },
    closeModal() {
      this.$store.state.modal_active = false;
      this.$store.state.editing = false;
    }
  }
};
</script>