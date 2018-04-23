<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogStatus" fullscreen transition="dialog-bottom-transition" :overlay=false>
      <v-btn color="primary" dark slot="activator">open</v-btn>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon @click.native="profileViewDialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ text }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="profileViewDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls </v-subheader>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'FullViewProfile',
    props: {
      text: String,
      dialog: Boolean,
      userInfo: Object
    },
    data() {
      return {
        profileViewDialog: this.dialog,
        profileViewNotifications: false,
        profileViewSound: false,
        profileViewWidgets: false,
        user: this.userInfo
      }
    },
    computed: {
      dialogStatus() {
        return this.dialog
      },
      candidate() {
        return this.userInfo
      }

    },
    updated() {
      //console.log('recived: ' + Object.keys(this.userInfo))
      console.log('info: ' + Object.keys(this.candidate))
      console.log('arr: ' + this.user)
    }
  }
</script>
