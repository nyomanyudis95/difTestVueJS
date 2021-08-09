<template>
    <div class='header'>
        <input  type='text' id='searchInput' placeholder="Type some keywords" v-on:keyup.enter="enterInputLike"/>
    </div>
</template>

<script>
    export default {
        name:'Header',
        props: {
            enterInputLike: { type: Function },
        },
    }
</script>

<style>
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
