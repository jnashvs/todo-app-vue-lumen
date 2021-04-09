<template>
  <v-dialog :value="active" width="500" persistent>
    <v-card>
      <v-card-title primary-title>Modal Content</v-card-title>
      <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" color="error">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: {
        active: {
        type: Boolean,
        default: false
        }
    },
    data() {
        return {
        showModal: false,
        testText: "Testing this",
        };
    }
};
</script>
