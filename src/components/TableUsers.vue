<template>
    <div id='blockUsers'>
        <table id="tableUsers">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
            </tr>
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
            </tr>
        </table>
    </div>
</template>

<script>
    console.log()
    export default  {
        created(){
         console.log('usersData ',this.usersData);
        },
        name:'TableUsers',
        props:{
            usersData:Array
        }
    }

</script>

<style scoped>
    

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
</style>
