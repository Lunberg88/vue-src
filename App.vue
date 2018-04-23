<!--
<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>
-->
<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list dense>

        <template v-for="item in items">
          <v-layout row v-if="item.heading" align-center :key="item.heading">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                Recruiter-iia
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
        </template>

        <ul class="mat-nav-list">
          <span v-if="auth">
            <router-link to="/" exact-active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
            <div class="mat-list-item-content">
              <div class="mat-list-item-ripple mat-ripple"></div>
              <div class="mat-list-text"></div>
                <v-icon class="ico-nav">dashboard</v-icon>
                <span>Home</span>
            </div>
            </a>
          </router-link>
            <router-link to="/static" active-class="active" tag="li" class="mat-list-item">
              <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
                <div class="mat-list-item-content">
                  <div class="mat-list-item-ripple mat-ripple"></div>
                  <div class="mat-list-text"></div>
                  <v-icon class="ico-nav">person</v-icon>
                  <span>Static</span>
                </div>
              </a>
          </router-link>
          <router-link to="/user" active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
              <div class="mat-list-item-content">
                <div class="mat-list-item-ripple mat-ripple"></div>
                <div class="mat-list-text"></div>
                <v-icon class="ico-nav">home</v-icon>
                <span>User</span>
              </div>
            </a>
          </router-link>
            <router-link to="/profile" active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
            <div class="mat-list-item-content">
              <div class="mat-list-item-ripple mat-ripple"></div>
              <div class="mat-list-text"></div>
                <v-icon class="ico-nav">account_box</v-icon>
                <span>Profile</span>
            </div>
            </a>
          </router-link>
          </span>
          <span v-if="isAdmin">
            <router-link to="/admin/candidates" active-class="active" tag="li" class="mat-list-item">
              <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
              <div class="mat-list-item-content">
                <div class="mat-list-item-ripple mat-ripple"></div>
                <div class="mat-list-text"></div>
                  <v-icon class="ico-nav">contacts</v-icon>
                  <span>Candidates</span>
              </div>
              </a>
            </router-link>
            <router-link to="/admin/messages" active-class="active" tag="li" class="mat-list-item">
              <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
                <div class="mat-list-item-content">
                  <div class="mat-list-item-ripple mat-ripple"></div>
                  <div class="mat-list-text"></div>
                  <v-icon class="ico-nav">email</v-icon>
                  <span>Messages</span>
                </div>
              </a>
            </router-link>
            <router-link to="/admin/openings" active-class="active" tag="li" class="mat-list-item">
              <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
                <div class="mat-list-item-content">
                  <div class="mat-list-item-ripple mat-ripple"></div>
                  <div class="mat-list-text"></div>
                  <v-icon class="ico-nav">library_books</v-icon>
                  <span>Openings</span>
                </div>
              </a>
            </router-link>
            <router-link to="/admin/history" active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
              <div class="mat-list-item-content">
                <div class="mat-list-item-ripple mat-ripple"></div>
                <div class="mat-list-text"></div>
                <v-icon class="ico-nav">history</v-icon>
                <span>History</span>
              </div>
            </a>
          </router-link>
            <router-link to="/upload" active-class="active" tag="li" class="mat-list-item">
              <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
                <div class="mat-list-item-content">
                  <div class="mat-list-item-ripple mat-ripple"></div>
                  <div class="mat-list-text"></div>
                  <v-icon class="ico-nav">cloud_upload</v-icon>
                  <span>Upload</span>
                </div>
              </a>
            </router-link>
          </span>
          <span v-if="!auth">
            <router-link to="/login" active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
              <div class="mat-list-item-content">
                <div class="mat-list-item-ripple mat-ripple"></div>
                <div class="mat-list-text"></div>
                <v-icon class="ico-nav">lock</v-icon>
                <span>Login</span>
              </div>
            </a>
          </router-link>
            <router-link to="/register" active-class="active" tag="li" class="mat-list-item">
            <a class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
              <div class="mat-list-item-content">
                <div class="mat-list-item-ripple mat-ripple"></div>
                <div class="mat-list-text"></div>
                <v-icon class="ico-nav">lock</v-icon>
                <span>Register</span>
              </div>
            </a>
          </router-link>
          </span>
          <span v-else="auth">
            <li class="mat-list-item logout-link">
            <a href="#" @click="logOut" class="relative" style="flex-direction: row; box-sizing: border-box; display: flex;">
            <div class="mat-list-item-content">
              <div class="mat-list-item-ripple mat-ripple"></div>
              <div class="mat-list-text"></div>
              <v-icon class="ico-nav">power_settings_new</v-icon>
              <span>Logout</span>
            </div>
          </a>
          </li>
          </span>
        </ul>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="blue darken-3" class="bg-nav-dark" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>

      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">
          <i>Recruiteriia</i>
        </span>
      </v-toolbar-title>
      <v-text-field flat solo-inverted prepend-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://vuetifyjs.com/static/doc-images/logo.svg" alt="Vuetify">
        </v-avatar>
      </v-btn>

    </v-toolbar>

    <v-content class="main-content" :style="mainContentFull">
      <v-container fluid fill-height :class="globalIsloading === true ? 'isloading-box' : ''">
        <v-layout content-container justify-center align-center>
          <!-- -->
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
          <!-- //-->
        </v-layout>
      </v-container>
    </v-content>
    <span class="isload text-center mx-auto" v-if="globalIsloading">
      <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="secondary"></v-progress-circular>
      <h4>Loading...</h4>
    </span>
  </v-app>
</template>

<script>
  import store from './store'

  export default {
    data: () => ({
      dialog: false,
      drawer: null,
      menu_items: [
        {
          icon: 'home',
          text: 'Home',
          href: '/'
        },
        {
          icon: 'contacts',
          text: 'contacts',
          href: '/new'
        }
      ],
      items: [
        { icon: 'contacts', text: 'Contacts' },
        { icon: 'history', text: 'Frequently contacted' },
        { icon: 'content_copy', text: 'Duplicates' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Labels',
          model: true,
          children: [
            { icon: 'add', text: 'Create label' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'settings', text: 'Settings' },
        { icon: 'chat_bubble', text: 'Send feedback' },
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' },
        { icon: 'keyboard', text: 'Go to the old version' }
      ]
    }),
    computed: {
      mainContentFull() {
        if(this.drawer === true) {
          let pl = 'padding-left: 240px';
          return pl;
        }
      },
      globalIsloading() {
        return store.state.globalIsLoading
      },
      auth() {
        return this.$store.state.access_token
      },
      isAdmin() {
        if(store.state.userData != null && store.state.userData.admin == '1') {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      logOut() {
        store.commit('removeUserData')
        this.$router.push('/login')
      }
    }
  }
</script>
<style>
  .isloading-box {
    opacity: .2;
  }

  .isload {
    display: block;
    top: 35%;
    left: 45%;
    position: absolute;
    color: #788c8f;
    background: #fff;
    z-index: 999;
    padding: 50px 160px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }

  .isload > i {
    font-size: 64px;
  }

  .isload > h4 {
    padding-top: 8px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }

  aside {
    width: 240px !important;
  }

  .content-container {
    background: #fff;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }


  /****************************/

  .mat-nav-list {
    padding-top: 8px;
    display: block;
  }

  .mat-list-item {
    height: auto;
    background-color: transparent;
    -webkit-transition: background-color .3s cubic-bezier(.35,0,.25,1);
    transition: background-color .3s cubic-bezier(.35,0,.25,1);
  }

  .mat-nav-list .mat-list-item {
    cursor: pointer;
    outline: 0;
  }

  .mat-list-item:hover {
    background: rgba(0,0,0,.04);
  }

  .mat-list .mat-list-item,
  .mat-list .mat-list-option,
  .mat-nav-list .mat-list-item,
  .mat-nav-list .mat-list-option,
  .mat-selection-list .mat-list-item,
  .mat-selection-list .mat-list-option {
    display: block;
    height: 48px;
  }

  .mat-list .mat-list-item,
  .mat-list .mat-list-option,
  .mat-nav-list .mat-list-item,
  .mat-nav-list .mat-list-option,
  .mat-selection-list .mat-list-item,
  .mat-selection-list .mat-list-option {
    color: rgba(0,0,0,.87);
  }

  .mat-list .mat-list-item,
  .mat-nav-list .mat-list-item,
  .mat-selection-list .mat-list-item {
    font-size: 16px;
  }

  .mat-list-item,
  .mat-list-option {
    font-family: Roboto,helvetica neue,sans-serif;
  }

  .mat-list-item .mat-list-item-content {
    display: block;
    height: auto;
    max-height: 48px;
    overflow: hidden;
    padding: 0;
    -webkit-transition: max-height .3s cubic-bezier(.35,0,.25,1);
    transition: max-height .3s cubic-bezier(.35,0,.25,1);
  }

  .mat-list .mat-list-item .mat-list-item-content,
  .mat-list .mat-list-option .mat-list-item-content,
  .mat-nav-list .mat-list-item .mat-list-item-content,
  .mat-nav-list .mat-list-option .mat-list-item-content,
  .mat-selection-list .mat-list-item .mat-list-item-content,
  .mat-selection-list .mat-list-option .mat-list-item-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 0 16px;
    position: relative;
    height: inherit;
  }

  .mat-nav-list a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 48px;
    padding: 0 16px;
  }

  .mat-nav-list a {
    text-decoration: none;
    color: inherit;
  }

  .relative {
    position: relative;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:focus, a:hover {
    cursor: pointer;
    text-decoration: none;
    outline: 0;
  }

  .navigation mat-icon:not(.menu-caret) {
    margin-right: 24px;
  }

  .ico-nav {
    margin-right: 20px;
  }

  li.active {
    background: #eee;
    border-left: 3px solid #1565c0;
  }

  li.active i.icon,
  li.active span {
    color: #1565c0 !important;
  }

  .content--wrap {
    background: #eee;
  }

  .logout-link {
    background: #f8f8f8;
  }
</style>
