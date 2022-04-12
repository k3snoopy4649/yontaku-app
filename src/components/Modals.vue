<template>
  <div class="modal-cont">


        <div class="block-modal setting-menu">
            <div class="modal-inner">
                <div class="modal-close-btn" @click="closeModal"><span></span><span></span></div>
                <div class="block-inner">
                    <h3 class="modal-title">
                        {{title}}
                    </h3>
                    <div class="setting-area">
                        <h4 class="modal-sub-title">タイマー</h4>
                        <div class="input-module radio">
                            <label v-for="(time,index) in timer" :key="index" :for="'time'+time">
                                <input type="radio" :id="'time'+time" v-model="setting['time']" :value="time" name="timerSetting">
                                <div v-if="!time">設定しない<span></span></div>
                                <div v-else>{{time}}秒<span></span></div>
                            </label>
                        </div>
                        <h4 class="modal-sub-title">問題順序</h4>
                        <div class="input-module radio">
                            <label v-for="(sort,index) in sorts" :key="index" :for="'sort'+sort">
                                <input type="radio" :id="'sort'+sort" v-model="setting['sort']" :value="sort" name="sortrSetting">
                                <div v-if="!sort">設定しない<span></span></div>
                                <div v-else>ランダム<span></span></div>
                            </label>
                        </div>
                        <div class="submit-area">
                            <a class="link-btn try" @click.prevent="start">問題を開始する</a>
                            <!-- <a href="" class="link-btn show-all-list">問題をリストで見る</a> -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="mask-layer" @click="closeModal"></div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted, watchEffect } from '@vue/runtime-core'
export default {
    props:["selectedMondaiArr","setting"],
    setup(props,{emit}){
        const timer = ref([null,'30','60','90'])
        const sorts = ref([null,'random'])
        const closeModal = () =>{
            emit("close")
        }
        const start = () =>{
            emit("start",props.setting)
        }
        const title = computed(()=>{
            return Object.keys(props.selectedMondaiArr).toString()
        })
        watchEffect(()=>{
        })
        onMounted(()=>{
            props.setting['title'] = title.value
            props.setting['mondai'] = [...props.selectedMondaiArr[title.value][0]]
        })
        return {closeModal,title,timer,sorts,start}
    }
}
</script>

<style>

</style>