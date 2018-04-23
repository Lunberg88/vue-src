<template>
  <div class="w-40 mx-auto full-width">
    <div class="d-block mx-auto my-3 mb-4 text--center">
      <h2>Please, Sign In</h2>
    </div>
    <!--
    <div class="panel panel-default card card-body form-auth">
      <div class="panel-title">
        <h3>Login Form</h3>
      </div>
      <div class="clearfix"></div>
      <br>
      <form @submit.prevent="login">
        <div class="form-group row">
          <label for="email" class="col-md-3 col-form-label">Email:</label>
          <div class="col-md-9">
            <input type="text" id="email" class="form-control"
                   v-model="user.email"
                   placeholder="email@example.com">
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-md-3 col-form-label">Password:</label>
          <div class="col-md-9">
            <input type="password" id="password" class="form-control"
                   v-model="user.password"
                   placeholder="******">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-12 pull-right">
            <button class="btn btn-primary col-md-4 btn-sm">Login</button>
          </div>
        </div>
      </form>
    </div>
    -->
    <v-form v-model="valid" class="d-block mx-auto">
      <v-text-field label="E-mail" v-model="user.email" :rules="emailRules" required></v-text-field>
      <v-text-field type="password" label="password" v-model="user.password" required></v-text-field>
      <v-btn color="primary w-100" @click="login">Login</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios'
import store from '@/store'
import {headers, api} from '@/helpers/api'

export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				},
        valid: false,
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        isLoad: false
			}
		},
		methods: {
			login() {
        store.dispatch('globalIsLoading')
				let data = {
					client_id: 2,
					client_secret: 'dTRgSyyLoNpwbiC85W1NyYpur32ellzOZBTu5iKO',
					grant_type: 'password',
					username: this.user.email,
					password: this.user.password
				}
				axios.post(api.login, data)
				.then(response => {
					if(response.data) {
					    store.commit('setToken', {
							access_token: response.data.access_token,
							expires_in: response.data.expires_in + Date.now()
						})
					}
          store.dispatch('setUser', {db: response.data})
					this.getUserAuth()
          store.dispatch('globalIsLoading')
					this.$router.push('/')
				}).catch(e => {
          store.dispatch('globalIsLoading')
					console.log('Errors: ' + e);
				})
			},
			getUserAuth() {
				axios.get(api.getUserData, headers)
				.then(response => {
					store.dispatch('setUserDataInfo', {data: response.data})
				})
				.catch(e => {
					console.log('This is error: ' + e.response)
				})
			}
		}
	}
</script>
<style>
  .full-width {
    width: 100%;
  }

	.login-form {
		margin: auto;
		position: relative;
	}

	.panel-default {
		margin: 20% auto;
	}

	.form-auth {
		border: 0 !important;
	}

	ul > li {
		text-align: left;
	}

	ul > li:first-child {
		text-align: center;
	}

	.form-group:nth-child(3) {
		text-align: right;
	}

  .w-40 {
    width: 40% !important;
  }

  .w-100 {
    width: 100% !important;
  }
</style>
