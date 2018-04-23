<template>
    <div class="row">
        <div class="col-md-12">
            History content...
            <div class="form-group">
                <input v-model="search" name="search" type="search" class="form-control" placeholder="Search...">
            </div>
        </div>
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Actions</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="historyList" v-for="(item, index, key) in onSearch" :key="key">
                        <td>
                            <span :class="historyHelper.checkType(item.type)">
                                {{ historyHelper.checkBadge(item.type) }}
                            </span>
                        </td>
                        <td v-html="item.actions"></td>
                        <td>{{ item.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import store from '@/store'
import historyHelper from '@/helpers/history'
import {headers, api} from '@/helpers/api'
export default {
    name: 'History',
    data() {
        return {
            search: '',
            historyList: [],
            historyHelper: historyHelper,
            isLoad: false
        }
    },
    computed: {
      onSearch() {
          return this.historyList.filter(log => {
                 return log.actions.toLowerCase().includes(this.search.toLowerCase())
          });
      }
    },
    methods: {
        getHistoryList() {
            store.dispatch('globalIsLoading')
            axios.get(api.fetchHistoryData, headers)
                .then(res => {
                    this.historyList = res.data
                    store.dispatch('globalIsLoading')
                })
                .catch(e => {
                    store.dispatch('globalIsLoading')
                    console.log('Error while fetching...' + e)
                })
        }
    },
    created() {
        this.getHistoryList()
    }
}

</script>

<style scoped>
input[type=search] {
    width: 30%;
}

input[type=search]:before {
    content: "\f002";
    display: inline-block;
    position: relative;
    width: 15px;
    height: 10px;
    font: normal normal normal 14px/1 FontAwesome;
}

.badge {
  display: inline-block;
  padding: .25em .4em;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 8px;
  font-family: Roboto, sans-serif;
}

.badge-primary {
  color: #fff;
  background-color: #007bff;
}

.badge-success {
  color: #fff;
  background-color: #28a745;
}

.badge-danger {
  color: #fff;
  background-color: #dc3545;
}

.badge-info {
  color: #fff;
  background-color: #17a2b8;
}

.badge-pill {
  padding-right: .6em;
  padding-left: .6em;
  border-radius: 10rem;
}
</style>
