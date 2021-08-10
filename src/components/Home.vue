<template>
    <div class='header'>
        <input v-model='inputLike' type='text' id='searchInput' placeholder="Type some keywords" v-on:keyup.enter="enterInputLike"/>
    </div>
    <!-- <Header/> -->
    <!-- <TableUsers v-bind:usersData='usersData'/> -->
    <div id='blockUsers'>
        <table id="tableUsers">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-if="usersData.length == 0"><td style="text-align: center;" colspan="6">No Data Available</td></tr>
            <tr v-for="item in usersData" :key="item.id">
                <td>
                    {{item.firstName}}
                </td>
                <td>
                    {{item.lastName}}
                </td>
                <td>
                    {{item.phoneNumber}}
                </td>
                <td>
                    {{item.email}}
                </td>
                <td style="text-align:center">
                    <button v-on:click='loadUser(item.id)' id="btnEdit" > <i class="fa fa-edit"></i>Edit</button>
                </td>
                <td style="text-align:center">
                    <button v-on:click='deleteUsers(item.id)' id="btnDelete" > <i class="fa fa-trash"></i>Delete</button>
                </td>
            </tr>
        </table>	
    </div>
    <div class="footer-pagination">
        <button id="btnAdd" v-on:click="showModal = true; actionModal='Add' "> <i class="fa fa-plus-square"></i> Create</button>
        <nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<button type="button" class="page-link" v-if="page != 1" @click="getDataPagination(page-1)"> Previous </button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" @click="getDataPagination(pageNumber)" :key="pageNumber"> {{pageNumber}} </button>
				</li>
				<li class="page-item">
					<button type="button" @click="getDataPagination(page+1)" v-if="page < pages.length" class="page-link"> Next </button>
				</li>
			</ul>
		</nav>	
        <input id="limitInput" v-model='perPage' type='text' v-on:keyup.enter="onEnter" >
    </div>
    <!-- <ModalAdd v-model="showModal"/> -->
    <transition name="fade" appear>
        <div class="modal-overlay" v-bind:showModal='showModal' v-if="showModal" >
            <div v-on:click="clearModal">X </div>
            <div id='headerModal'> 
                <h2 v-if="actionModal == 'Edit'">Edit New User</h2> 
                <h2 v-if="actionModal == 'Add'">Create New User</h2>
            </div>
            <div class='modalForm'>
                <ul>
                    <li>
                        <input v-model='firstNameModal' type='text' id='searchInput' placeholder="First Name"/>
                    </li>
                    <li>
                        <input v-model='lastNameModal' type='text' id='searchInput' placeholder="Last Name"/>
                    </li>
                    <li>
                        <input v-model='phoneNumberModal' type='text' id='searchInput' placeholder="Phone Number"/>
                    </li>
                    <li>
                        <input v-model='emailModal' type='text' id='searchInput' placeholder="Email"/>
                    </li>
                </ul>
                <button v-on:click='save' id="btnAdd" > <i class="fa fa-save"></i> Save</button>
            </div>
        </div>
    </transition>

</template>

<script>
    // import Header from './Header.vue';
    import axios from 'axios';
    // import TableUsers from './TableUsers.vue';
    // import ModalAdd from './ModalAdd.vue';
    import Store from '../store/Store';
    
    // import Store from '../store/Store.js';
    // import Vue from 'vue';
    // var core = new Vue({
    //     el:'#example-2',
    //     methods:{
    //         add: function(){
    //             console.log('this is btnClick')
    //         }
    //     }
    // });

    // core.add();
    // const Modal = Vue.component("modal", {
    //     template: "#modal-template"
    // });
    

    export default  {
        name:'Home',
        created(){
            // console.log(this.store.getters.getAllusersData);
        },
        components:{
            // Header,
            // TableUsers,
            // ModalAdd,
            // Modal
        },
        async mounted () {
            console.log('this.store',this.store);
            this.init();
        },
        store:Store,
        data() {
            return {
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
            }
        },
        methods:{
            save: async function() {
                if(this.firstNameModal == '')
                    window.alert('FirstName is empty');
                else if(this.lastNameModal == '')
                    window.alert('LastName is empty');
                else if(this.phoneNumberModal == '')
                    window.alert('Phone Number is empty');
                else if(this.emailModal == '')
                    window.alert('Email is empty');
                else if(!this.validateEmail(this.emailModal))
                    window.alert('Email format is wrong');
                else if(!Number.isInteger(parseFloat(this.phoneNumberModal)))
                    window.alert('Phone Number must number');
                else{
                    if(this.actionModal == 'Add'){
                        await axios
                        .post('http://localhost:3000/api/v1/users/',{
                            firstName:this.firstNameModal,
                            lastName:this.lastNameModal,
                            phoneNumber:this.phoneNumberModal,
                            email:this.emailModal
                        })
                        .then((response) => {
                            const {id,firstName,lastName,phoneNumber,email} = response.data.data;
                            this.usersData.push({
                                id,
                                firstName,
                                lastName,
                                phoneNumber,
                                email
                            })
                            this.countUsers++;
                            this.setPages();
                            this.getDataPagination(this.page);
                        });
                    }
                    else if(this.actionModal == 'Edit'){
                        await axios
                        .patch('http://localhost:3000/api/v1/users/',{
                            id:this.idModal,
                            firstName:this.firstNameModal,
                            lastName:this.lastNameModal,
                            phoneNumber:this.phoneNumberModal,
                            email:this.emailModal
                        })
                        .then((response) => {
                            const {id,firstName,lastName,phoneNumber,email} = response.data.data;
                            const index = this.usersData.findIndex(x => x.id === id);
                            this.usersData[index] = {
                                id,
                                firstName,
                                lastName,
                                phoneNumber,
                                email
                            };
                            this.getDataPagination(this.page);
                        });
                    }
                    this.clearModal();
                }
                
            },
            validateEmail (email) {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            async init() {
                await axios
                .get('http://localhost:3000/api/v1/users/countUsers')
                .then( (response) =>{
                    this.countUsers =  response.data.data
                    this.setPages();
                    this.getDataPagination(1)
                });
            },
            deleteUsers:async function(id){
                console.log('id delete = ',id);
                await axios
                .delete('http://localhost:3000/api/v1/users/'+id)
                .then(() => {
                    const index = this.usersData.findIndex(x => x.id === id);
                    this.usersData.splice(index,1);
                    this.countUsers--;
                    this.page = 1;
                    this.getDataPagination(this.page).then(() => {
                        this.setPages();
                    });
                });
                // console.log('delete id = ',id);
                // const index = this.usersData.findIndex(x => x.id === id);
                // this.usersData.splice(index,1);
            },
            onEnter(){
                console.log('onEnter');
                this.setPages();
                this.page = 1;
                this.getDataPagination (this.page);
            },
            enterInputLike(){
                this.page = 1;
                this.getDataPagination(this.page).then(() => {
                    if(this.inputLike == ''){
                        this.init();
                    }
                    else{
                        this.countUsers = this.usersData.length;
                        this.setPages();
                    }
                })
            },
            setPages () {
                this.pages = [];
                let numberOfPages = Math.ceil(this.countUsers / this.perPage);
                console.log('this.countUsers = ', this.countUsers);
                console.log('this.perPage = ', this.perPage);
                console.log('numberOfPages = ', numberOfPages);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pages.push(index);
                }
                console.log('this.pages = '+this.pages);
            },
            async getDataPagination (pageNumber) {
                this.page = pageNumber
                console.log('getDataPagination this.page = ',this.page);
                console.log('getDataPagination this.perPage = ',this.perPage);
                const actualPage = (this.page-1) ;
                console.log('getDataPagination actualPage = ',actualPage);
                 await axios
                .get('http://localhost:3000/api/v1/users/?page='+actualPage+"&limit="+this.perPage+"&like="+this.inputLike)

                .then(response => (this.usersData =  response.data.data))
            },
            loadUser:function(id){
                console.log('delete id = ',id);
                const index = this.usersData.findIndex(x => x.id === id);
                const user = this.usersData[index];
                this.idModal = user.id;
                this.firstNameModal = user.firstName,
                this.lastNameModal= user.lastName,
                this.phoneNumberModal = user.phoneNumber,
                this.emailModal= user.email

                this.actionModal = 'Edit';

                this.showModal = true;
            },
            clearModal: function() {
                this.idModal = '';
                this.firstNameModal = '',
                this.lastNameModal= '',
                this.phoneNumberModal = '',
                this.emailModal= ''

                this.actionModal = '';

                this.showModal = false;
            }
        }
    }

</script>

<style scoped>
    .modal-overlay{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        width:80%;
        height: 80%;
        margin: auto !important;
        padding:20px;
        /* z-index: 98; */
        background-color: #f9f9f9;
        overflow-y:scroll;

    }
    #headerModal{
        position: relative;
        text-align: center;
    }

    .footer-pagination{
        padding: 0 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .modalForm {
        display: flex;
        padding: 20px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .modalForm ul li{
        margin-bottom:20px;
    } 

    .modalForm ul {
        list-style: none;
        width: 100%;
    } 


    #btnAdd {
        border-radius: 25px;
        padding: 10px 30px;
        background: purple;
        border: none;
        color:white;
        cursor:pointer;
    }

    #btnEdit {
        border-radius: 25px;
        padding: 10px 30px;
        background: white;
        color:purple;
        border-color: purple;
        cursor:pointer;
    }

    #btnDelete {
        border-radius: 25px;
        padding: 10px 30px;
        background: white;
        color:red;
        border-color: red;
        cursor:pointer;
    }

    #tableUsers th{
        padding-top: 12px ;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
    }

    #tableUsers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #blockUsers {
        padding: 50px;
    }

    #tableUsers td, #tableUsers th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #tableUsers tr:nth-child(even){background-color: #f2f2f2;}

    #tableUsers tr:hover {background-color: #ddd;}

    button.page-link {
        display: inline-block;
    }

    #limitInput{
        width: 40px;
        text-align: center;
    }
    button.page-link {
        font-size: 20px;
        color: #29b3ed;
        font-weight: 500;
    }
    .offset{
        width: 500px !important;
        margin: 20px auto;  
    }

    .page-link {
        position: relative;
        display: block;
        padding: .5rem .75rem;
        margin-left: -1px;
        line-height: 1.25;
        color: #007bff;
        background-color: #fff;
        border: 1px solid #dee2e6;
    }

    .pagination {
        display: -ms-flexbox;
        display: flex;
        padding-left: 0;
        list-style: none;
        border-radius: .25rem;
    }

    .header {
        background: purple;
        height:'100px';
        text-align: center;
        padding: 10px 0;
    }
    #searchInput {
        height: 40px;
        width:50%;
        padding-left: 10px ;
    }
</style>
