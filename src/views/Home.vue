<template>
  <main class="bg-grid ly-full-width">

    <MondaiList @selectMondai="selectMondaiFromCat" :selectedCat="selectedCat" :computedMondai="computedMondai" :mondaiArray="mondaiArray" v-if="!status.isPlaying"/>
    <Play v-if="status.isPlaying" :setting="setting" :status="status" @update="updateStatus" @showRes="showRes"/>
  </main>

  <teleport to="#modals" v-if="isModalOpen">
    <Modals @close="isModalOpen = !isModalOpen" :selectedMondaiArr="selectedMondaiArr" @start="start" :setting="setting" />
  </teleport>
</template>

<script>
import { ref } from "@vue/reactivity";

import Modals from "../components/Modals.vue";
import MondaiList from "../components/MondaiList.vue"
import Play from '../components/Play.vue'
import { computed, watchEffect } from '@vue/runtime-core';
import getMondai from '../composable/getMondai'
import SetLocal from '../composable/SetLocal'
import GetLocal from '../composable/GetLocal'
import ClearLocal from '../composable/ClearLocal'
import RandomArray from '../composable/RandomArray'
export default {
  components: { Modals ,MondaiList,Play},
  setup() {
    // const url = ref("https://options.acu-log.com/db/data.json")
    const url = ref("http://localhost:3000/mondai")
    const {getLocal} = GetLocal()
    const {setLocal} = SetLocal()
    const { getRandomArr } = RandomArray()
    const {clear} = ClearLocal()
    const status = ref(getLocal("status")||{'isPlaying':false})
    const setting = ref(getLocal("setting")||{'title':null,'mondai':null,'time':null,'sort':null})
    const isModalOpen = ref(false);
    const {mondaiArray,error,load} = getMondai()
    const selectedMondaiArr = ref({})
    const selectedCat = ref(null)
    load(url.value);
    
    const computedMondai = computed(()=>{
      if(!mondaiArray.value) return
      // 本番公開の時はmondaiのプロパティをかます。
      return mondaiArray.value.reduce((a,i)=>{
         if(!a[i.subject])a[i.subject] = new Array()
          a[i.subject].push(i)
         return a 
      },{})
    })
    const selectMondaiFromCat = (cat,arr) =>{
      selectedMondaiArr.value = new Object()
      selectedMondaiArr.value[cat] = []
      selectedMondaiArr.value[cat].push(arr)
      isModalOpen.value = !isModalOpen.value
    }
    const start = () =>{
      isModalOpen.value = !isModalOpen.value
      status.value.isPlaying = !status.value.isPlaying
      //問題がランダムの場合
      if(setting.value.sort === "random"){
        getRandomArr(setting.value.mondai)
      }
      setLocal("setting",setting.value)
      setLocal("status",status.value)
    }
    const showRes = (arr) =>{
      clear(arr)
    }
    const updateStatus = (prm) =>{
      setLocal("status",prm)
    }
    watchEffect(()=>{
    })
    return { isModalOpen , mondaiArray,computedMondai,selectedMondaiArr,selectMondaiFromCat,start,setting,selectedCat,status,updateStatus,showRes};
  },
};
</script>
