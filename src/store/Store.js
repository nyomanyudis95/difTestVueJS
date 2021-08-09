import Vuex from 'vuex'

const Store = new Vuex.Store({
    state: {
        showModal: false,
        usersData:[],
        firstNameModal:'',
        lastNameModal:'',
        phoneNumberModal:'',
        emailModal:'',
        idModal:'',
        actionModal:'',
        page: 1,
        perPage: 5,
        pages: [],	
        countUsers: 0,
        inputLike:'',
    },
    getters: {
        getAllusersData: state => () => {
          return state.usersData
        }
      }
  })

export default Store;