<template>
  
    <div class="block-content">
      <div class="block-inner">
        <h3 class="block-title-h3">問題カテゴリ一覧</h3>
        <div v-if="computedMondai">
          <ul class="ly-list-cont">
            <li class="block-list-item br-32 box-shadow bg-white" v-for="(cat,index) in Object.keys(computedMondai)" :key="index">
              <a
                href=""
                class="block-list-item-link"
               @click.prevent="selectMondaiFromCat(cat,computedMondai[cat])"
              >
                <p class="quest-title">{{cat}}</p>
                <span class="quest-info quest-num">{{computedMondai[cat].length}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Now Loading...</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props:["computedMondai","selectedCat"],
    setup(props,{emit}){
        const selectMondaiFromCat = (cat,arr) =>{
            emit("selectMondai",cat,arr)
        }
        return {selectMondaiFromCat}
    }
}
</script>

<style>

</style>