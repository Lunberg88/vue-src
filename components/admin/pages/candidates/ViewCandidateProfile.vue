<template>
    <div>
      <v-tabs
        v-model="active" fixed-tabs>
        <v-tab key="info" href="#info" ripple>
         <v-icon class="tabs-icon-box">account_box</v-icon> Information
        </v-tab>
        <v-tab key="cvs" href="#cvs" ripple>
          <v-icon class="tabs-icon-box">attach_file</v-icon> CVS
        </v-tab>
        <v-tab-item key="info-box" id="info">
          <v-card flat>
            <v-card-text class="tabs-content-box">
              <v-flex xs12 sm9 mx-auto>
                <v-card v-for="(candidate, key) in candidateInfo" :key="key">
                  <v-card-media src="https://vuetifyjs.com/static/doc-images/lists/ali.png" height="300px">
                    <v-layout column class="media">
                      <v-card-title>
                        <v-btn dark icon>
                          <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer />
                        <v-btn dark icon class="mr-3">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn dark icon>
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-spacer />
                      <v-card-title class="white--text pl-5 pt-5">
                        <div class="display-1 pl-5 pt-5 candidate-title">{{ candidate.fio }}</div>
                      </v-card-title>
                    </v-layout>
                  </v-card-media>
                  <v-list two-line>
                    <v-list-tile @click="" uid="link">
                      <v-list-tile-action>
                        <v-icon color="indigo">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>(650) 555-1234</v-list-tile-title>
                        <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-icon>chat</v-icon>
                      </v-list-tile-action>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">mail</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ candidate.email }}</v-list-tile-title>
                        <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">code</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ checkStack.checkStack(candidate.stack) }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">loyalty</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="checkStack.tagChips(candidate.tags)"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">attach_money</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title><b>{{ checkStack.showcurr(candidate.currency) }}</b> {{ candidate.salary }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">attach_file</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title><b>Uploaded CV:</b> <small>{{ candidate.upload_cvs ? candidate.upload_cvs : 'not uploaded yet...' }}</small></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">link</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title><b>CV-Link:</b> {{ candidate.cvs != 'http://' ? candidate.cvs : '---' }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset />
                    <v-list-tile @click="">
                      <v-list-tile-action>
                        <v-icon color="indigo">location_on</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>1400 Main Street</v-list-tile-title>
                        <v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
                <br />
                <v-btn flat color="secondary" @click="comeBack">
                  <v-icon>reply</v-icon> back
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="cvs-box" id="cvs">
          <v-card flat>
            <v-card-text class="tabs-content-box">
              <v-flex md8 offset-md2 class="cvs-box-pt" v-for="(candidate, key) in candidateInfo" :key="key">
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="indigo">attach_file</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ candidate.upload_cvs }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset />
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon color="indigo">link</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ candidate.cvs }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <br>
                <!--<iframe src="https://docs.google.com/gview?url=https://calibre-ebook.com/downloads/demos/demo.docx&embedded=true"
                        frameborder="0"
                ></iframe>-->
              </v-flex>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
</template>
<script>
import axios from 'axios'
import store from '@/store'
import checkStack from '@/helpers/candidate'
import {headers, api} from '@/helpers/api'

export default {
    name: 'ViewCandidateProfile',
    data() {
      return {
          candidateInfo: [],
          checkStack: checkStack,
          active: null
      }
    },
    methods: {
        comeBack() {
            this.$router.push('/admin/candidates');
        },
        fetchCandidateInfo() {
            store.dispatch('globalIsLoading')
            axios.get(api.viewCandidateProfile + this.$route.params.id, headers)
                .then(res => {
                    this.candidateInfo = res.data
                    store.dispatch('globalIsLoading')
                })
                .catch(e => {
                    store.dispatch('globalIsLoading')
                    console.log('Error fetching candidate profile: ' + e);
                })
        },
    },
    created() {
        this.fetchCandidateInfo()
    }
}
</script>
<style scoped>
  ul.list-group {
      width: 400px;
      text-align: left;
  }

  ul.list-group > li.list-group-item {
      border: 0;
  }

  .media {
    height: 100%;
    margin: 0;
  }

  a[uid="link"]:hover {
    background-color: white !important;
  }

  .tabs-icon-box {
    margin-right: 6px;
  }

  .tabs-content-box {
    padding: 25px 30px;
    min-height: 500px;
    margin: auto;
  }

  .cvs-box-pt {
    margin-top: 35px;
  }

  .candidate-title {
    color: #fff;
    text-rendering: optimizelegibility;
    text-shadow: 0 0 3px rgba(0,0,0,.8);
  }

  iframe {
    width: 100%;
    height: 800px;
  }
</style>
