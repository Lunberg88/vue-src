<template>
    <!--
    <div class="row">
        <div class="col-md-12">
            Opening list...
        </div>
        <div class="col-md-12">
            <div class="row">
              <div class="col-md-4">
                  <div class="card mb-4 box-shadow" v-if="openingsList" v-for="(item, index, key) in openingsList" :key="key">
                  <img :src="host + item.img" class="card-img-top" alt="Card image cap" width="320">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ htmlDecode(item.description) }}</p>
                    <p class="card-text"><small class="text-muted">{{ item.location }}</small></p>
                  </div>
                </div>
              </div>
              <span class="isload" v-if="isLoad">
                <i class="fa fa-refresh fa-spin"></i>
                <h4>Connection...</h4>
              </span>
            </div>
        </div>
    </div>
    -->
  <v-layout column>
    <v-flex xs12 sm6>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(item, index, key) in openingsList" :key="key" :class="(index + 1) % 3 == 0 ? 'md12' : 'md6'">
            <v-card>
              <v-card-media :src="host + item.img" height="200px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text" v-text="item.title"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title>
                <div v-html="item.description"></div>
              </v-card-title>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import store from '@/store'
import axios from 'axios'

export default {
    name: 'OpeningsList',
    data() {
        return {
            openingsList: [],
            host: 'http://ajax-lv/images/openings/',
            isLoad: false
        }
    },
    methods: {
        fetchOpeningsList() {
            //this.isLoad = true;
            store.dispatch('globalIsLoading')
            const headers = { headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }};
            axios.get('http://ajax-lv/api/openings', headers)
                .then(res => {
                    this.openingsList = res.data
                    //this.isLoad = false;
                    store.dispatch('globalIsLoading')
                    console.log('openings loaded!');
                })
                .catch(e => {
                    this.isLoad = false;
                    console.log('Error while fetching: ' + e);
                })
        }
    },
    created() {
        this.fetchOpeningsList()
    }
}
</script>
<style></style>
