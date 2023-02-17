<template>
    <div>
        <v-detail :devInfo="devInfo" :alarms="alarms" :attributes="attributes" @onSubmitCommand="onSubmitCommand"></v-detail>
    </div>
  </template>
  
  <script>
  import detail from '@/components/detail.vue'
  export default {
  
    name: 'home',

    data() {
        return {
            devId: '',
            devInfo: {},
            alarms: [],
            attributes: [],
            show: false
        }
    },
  
    components: {
          'v-detail': detail
    },

    setup(props, {emit}) {

      const onSubmitCommand = () => {
        
      }

      return {
        onSubmitCommand
      }
    }

  
  }
  </script>
  
  <style>
  .router-link-active {
    text-decoration: none;
    color: #1989fa;
  }
  a{
    text-decoration: none;
    color: #323233;
  }
  </style>
  