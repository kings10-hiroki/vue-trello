import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ローカルストレージに保存したリストを取得
// ローカルストレージはキーと値で情報を格納するJSON形式
// 'trello-lists'はキー
const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    // ローカルストレージに保存したリストがあれば取得
    // なければ下記のリストの連想配列を取得
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Backlog',
        cards: [
          { body: 'English' },
          { body: 'Mathmatics' },
        ]
      },
      {
        title: 'Todo',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Doing',
        cards: []
      }
    ],
  },
  mutations: {
    addList(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({
        body: payload.body
      })
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    },
    updateList(state, payload) {
      state.lists = payload.lists
    }
  },
  actions: {
    addList(context, payload) {
      context.commit('addList', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    },
    updateList(context, payload) {
      context.commit('updateList', payload)
    }
  },
  getters: {
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    },
  },
})
// データの状態を更新後にJSON形式でローカルストレージに保存
store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})
export default store
