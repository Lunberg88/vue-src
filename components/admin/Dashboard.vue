<template>
	<div class="d-block w-100 full-width">
    <div class="col-md-12">
      <div class="my-3 pl-md-1">
        <div class="py-3 pl-3 pr-3 content-box">
          <router-view />
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import axios from 'axios'
import {headers, api} from '@/helpers/api'

export default {
	name: 'Dashboard',
	data() {
		return {
			title: 'VueJS Dashboard',
		}
	},
	beforeCreate() {
	    axios.get(api.getUserPermission, headers)
			.then(res => {
			    if(!res.data == '1') {
			        return this.$router.push('/');
				}
			})
			.catch(e => {
			    console.log('Error:' + e);
			})
	}
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

.left-box {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	opacity: 0;
}

div.list-group > a {
	-webkit-transition: color .4s;
	transition: color .4s;
}

div.list-group > a {
	text-align: left;
}

.nav-pills, .nav-tabs {
	border: 0;
	border-radius: 3px;
	padding: 0 15px;
}

.flex-column {
	flex-direction: column!important;
}

.nav {
	display: flex;
	flex-wrap: wrap;
	padding-left: 0;
	margin-bottom: 0;
	list-style: none;
}

.nav .nav-item {
	position: relative;
}


.nav-pills.nav-pills-info .nav-item .nav-link.active,
.nav-pills.nav-pills-info .nav-item .nav-link.active:focus,
.nav-pills.nav-pills-info .nav-item .nav-link.active:hover {
	background-color: #00bcd4;
	box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,188,212,.4);
	color: #fff;
}

.nav-pills.nav-pills-icons .nav-item .nav-link {
	border-radius: 4px;
}

.nav-pills .nav-item .nav-link.active {
	color: #fff;
	background-color: #9c27b0;
	box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
}

.nav-pills .nav-item .nav-link {
	line-height: 24px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 500;
	min-width: 100px;
	text-align: center;
	color: #555;
	transition: all .3s;
	border-radius: 30px;
	padding: 10px 15px;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
	color: #fff;
	background-color: #2196f3;
}

.nav-pills .nav-link, .nav-tabs .nav-link {
	padding: 1.4286em .8575em;
	font-size: .875rem;
	font-weight: 500;
	border: 0;
}

.nav-link {
	display: block;
	padding: .5rem 1rem;
}

.nav-pills .nav-item i {
	display: block;
	font-size: 30px;
	padding: 15px 0;
}

a .material-icons {
	vertical-align: middle;
}

.nav-pills .nav-item .nav-link:hover {
	background-color: hsla(0,0%,78%,.2);
}
</style>
