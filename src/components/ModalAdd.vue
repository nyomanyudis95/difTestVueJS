<template>
    <transition name="fade" appear>
        <div class="modal-overlay" v-bind:showModal='showModal' v-if="showModal" v-on:click="showModal = false">
            <div id='headerModal'> 
                <h2>Create New User</h2> 
            </div>
            <div class='modalForm'>
                <ul>
                    <li>
                        <input type='text' id='searchInput' placeholder="First Name"/>
                    </li>
                    <li>
                        <input type='text' id='searchInput' placeholder="Last Name"/>
                    </li>
                    <li>
                        <input type='text' id='searchInput' placeholder="Phone Number"/>
                    </li>
                    <li>
                        <input type='text' id='searchInput' placeholder="Email"/>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>   
    
    export default  {
        name:'ModalAdd',
        created(){
            console.log('showModal ',this.value);
        },
        props:['value'],
        methods: {
            updateShowModal: function (showModal) {
                this.$emit(false, showModal);
            }
        }
    }
    

</script>

<style scoped>
    .modal-overlay{
        position: absolute;
        top:100px;
        left: 100px;
        right: 100px;
        bottom: 100px;
        padding:20px;
        /* z-index: 98; */
        background-color: gray;
    }
    #headerModal{
        text-align: center;
    }

    .modalForm li{
        margin-top: 20px;
    }


    
</style>
