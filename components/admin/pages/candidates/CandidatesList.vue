<template>
    <div>
      <v-card class="no-box-shadow">
        <v-card-title>
          <h3>Candidates table</h3>
          <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="dataTableHeaders"
          :items="candidatesListInfo"
          :search="search"
          loading="warning"
          class="elevation-1 no-box-shadow"
          :rows-per-page-items="itemsPerPage"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <tr :style="props.item.viewed == 1 ? 'background: #fff' : 'background: #eee'"
                @click="viewLinkCandidateProfile(props.item.id)">
              <td class="pl-3">{{ props.item.fio }}</td>
              <td class="pl-3">{{ props.item.email }}</td>
              <td class="pl-3">{{ currencyText.checkStack(props.item.stack) }}</td>
              <td class="pl-3" v-html="currencyText.tagChips(props.item.tags)"></td>
              <td class="pl-3">{{ props.item.cvs }}</td>
              <td class="pl-3"><b>{{ currencyText.showcurr(props.item.currency) }}</b> {{ props.item.salary }}</td>
              <td class="pl-3 td-actions">
                <v-icon @click="">edit</v-icon>
                <v-icon @click="deletePerson(props.item.id)">delete</v-icon>
                <v-icon @click="testDialog(props.item)">visibility</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-btn fab bottom right color="success" dark fixed @click.stop="dialog = !dialog">
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="800px">
        <v-card>
          <v-card-title
            class="grey lighten-4 py-4 title">
            Add new candidate
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs6 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field name="fio" prepend-icon="person" v-model="newCandidateInfo.fio" placeholder="Name" class="pr-5"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field name="email" type="email" v-model="newCandidateInfo.email" prepend-icon="mail" placeholder="Email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <div class="divider-line"></div>
              </v-flex>
              <v-flex xs4>
                <v-select prepend-icon="code"
                  :items="stack_list"
                  item-value="val"
                  item-text="text"
                  v-model="newCandidateInfo.stack"
                  label="Choose Stack"
                  single-line
                  bottom
                  class="pr-5"
                ></v-select>
              </v-flex>
              <v-flex xs8>
                <v-text-field name="cvs" v-model="newCandidateInfo.cvs" placeholder="https://" prepend-icon="link"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <div class="divider-line"></div>
              </v-flex>
              <v-flex xs5>
                <label class="d-block ml-3 pl-4 py-3 text--secondary"><b>Enter skills pressing enter for each</b></label>
              </v-flex>
              <v-flex xs7>
                <v-select
                  label="Skills"
                  chips
                  tags
                  solo
                  item-value="val"
                  item-text="text"
                  prepend-icon="loyalty"
                  clearable
                  v-model="newCandidateInfo.tags"
                  class="no-box-shadow"
                >
                  <template slot="selection" slot-scope="data">
                    <v-chip outline color="green" close @input="remove(data.item)" :selected="data.selected">
                      <strong>{{ data.item }}</strong>&nbsp;
                    </v-chip>
                  </template>
                </v-select>
              </v-flex>
              <v-flex xs12>
                <div class="divider-line"></div>
              </v-flex>
              <v-flex xs3>
                <v-text-field name="salary" v-model="newCandidateInfo.salary" prepend-icon="attach_money" placeholder="Salary"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-select single-line bottom
                          name="currency"
                          v-model="newCandidateInfo.currency"
                          :items="currency"
                          item-value="val"
                          item-text="txt"
                          label="$ USD"
                          class="pr-5 small-text">Some</v-select>
              </v-flex>
              <v-flex xs7>
                <v-text-field name="rate" v-model="newCandidateInfo.rate" prepend-icon="schedule" placeholder="Rate xx/hr $"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <div class="divider-line"></div>
              </v-flex>
              <v-flex xs12>
                <upload-file @file-uploaded="addUserCVS" @file-removed="removeUserCVS" />
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="addNewCandidate">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import store from '@/store'
import axios from 'axios'

import candidatehelper from '@/helpers/candidate'
import { headers, api} from '@/helpers/api'

import FullViewProfile from '@/components/admin/pages/candidates/FullViewProfile'
import UploadFile from '@/components/Upload'

export default {
    name: 'CandidatesList',
    components: { FullViewProfile, UploadFile },
    data() {
        return {
            dialog: false,
            title: 'Candidates list',
            isLoad: false,
            search: '',
            itemsPerPage: [10,15,20,25],
            dataTableHeaders: [
              {text: 'Full name', value: 'fio'},
              {text: 'Email', value: 'email'},
              {text: 'Stack', value: 'stack'},
              {text: 'Skills', value: 'tags'},
              {text: 'CVS', value: 'cvs'},
              {text: 'Salary', value: 'salary'},
              {text: 'Action', value: ''}
            ],
            stack_list: [
              {val: 1, text: 'Frontend'},
              {val: 2, text: 'Backend'},
              {val: 3, text: 'FullStack'},
              {val: 4, text: 'Mobile'},
              {val: 5, text: 'Design'},
              {val: 6, text: 'Traders'},
              {val: 7, text: 'DevOps'},
              {val: 8, text: 'Project Manager'},
              {val: 9, text: 'Product Manager'},
              {val: 10, text: 'Sales Manager'},
              {val: 11, text: 'CTO'}
            ],
            currency: [
              {val: 1, txt: '$ USD'},
              {val: 2, txt: '€ EUR'},
              {val: 3, txt: '₴ HRN'},
              {val: 4, txt: '₽ RUB'}
            ],
            newCandidateInfo: {
              fio: '',
              email: '',
              stack: null,
              tags: '',
              salary: '',
              currency: 1,
              rate: '',
              status: 2,
              viewed: 1,
              cvs: '',
              upload_cvs: ''
            },
            currencyText: candidatehelper,
            profileDialog: false,
            userInfo: null
        }
    },
    computed: {
        candidatesListInfo() {
           return store.getters.getCandidatesListData
        },
        newCandidateFields() {
          return this.newCandidateInfo
        },
        profile() {
          return this.profileDialog
        },
        sendData() {
          return this.userInfo
        }
    },
    methods: {
        fetchCandidatesList() {
            store.dispatch('globalIsLoading')
            axios.get(api.fetchCandidatesList, headers)
                .then(res => {
                    store.dispatch('setCandidatesData', {data: res.data})
                    store.dispatch('globalIsLoading')
                })
                .catch(e => {
                    store.dispatch('globalIsLoading')
                    console.log('error while fetching: ' + e);
                })
        },
        viewLinkCandidateProfile(id) {
            this.$router.push('/admin/candidates/profile/' + id);
        },
        clearForm() {
          this.newCandidateInfo = {fio: '', email: '', stack: '', tags: '', salary: '', currency: '', rate: '', cvs: ''}
        },
        remove(item) {
          this.newCandidateInfo.tags.splice(this.newCandidateInfo.tags.indexOf(item), 1)
          this.newCandidateInfo.tags = [...this.newCandidateInfo.tags]
        },
        addNewCandidate() {
          store.dispatch('globalIsLoading')
          this.newCandidateInfo.tags = this.newCandidateInfo.tags.join(', ');
          axios({
            method: 'post',
            url: api.addNewCandidate,
            data: this.newCandidateFields,
            headers
          })
            .then(res => {
              console.log('Result: ' + res.data)
              this.clearForm()
              this.dialog = !this.dialog
              store.dispatch('globalIsLoading')
              this.fetchCandidatesList()
            })
            .catch(e => {
              store.dispatch('globalIsLoading')
              console.log('Error: ' + e)
            })
        },
        deletePerson(id) {
          console.log('deleted id: ' + id)
        },
        addUserCVS(e) {
          this.newCandidateInfo.upload_cvs = e
        },
        removeUserCVS() {
          this.newCandidateInfo.upload_cvs = ''
        }
    },
    created() {
        this.fetchCandidatesList()
    }
}
</script>

<style>
.no-box-shadow {
  box-shadow: none !important;
}

.small-text div.input-group__selections__comma {
  font-size: 10px !important;
}

div.divider-line {
  margin: 10px auto;
}

.badge-danger {
  color: #fff;
  background-color: #17a2b8;
}

.badge-pill {
  padding-right: .6em;
  padding-left: .6em;
  border-radius: 10rem;
}
.badge {
  display: inline-block;
  padding: .25em .4em;
  font-size: 85%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
}

td.td-actions i {
  cursor: pointer;
}

td.td-actions i:hover {
  color: #000;
}

td.td-actions i:first-child {
  margin-right: 15px;
}
</style>
