<template>
  <div class="block-content">
    <div class="block-inner" v-if="computedMondai">
      <h3 class="block-title-h3">問題を抽出</h3>
        <div class="form-item box-shadow bg-white">
          <input
            type="text"
            name=""
            id="keywords"
            v-model="keywords"
            @input.prevent="filterMondai"
            placeholder="キーワードを入力"
          />
        </div>
        <ul class="result keyword ly-list-cont" v-if="filteredMondai['filteredMondai']&&keywords">
          <li class="block-list-item box-shadow bg-white">
            <a href="" class="block-list-item-link" @click.prevent="selectMondaiFromCat(keywords+'に関連する問題', filteredMondai['filteredMondai'])">
              <p class="quest-title">{{ keywords }}に関連する問題</p>
              <span class="quest-info quest-num">{{
                filteredMondai["filteredMondai"].length
              }}</span>
            </a>
          </li>
        </ul>
    </div>
    <div class="block-inner">
      <h3 class="block-title-h3">問題カテゴリ一覧</h3>
      <div v-if="computedMondai">
        <ul class="ly-list-cont">
          <li
            class="block-list-item br-32 box-shadow bg-white"
            v-for="(cat, index) in Object.keys(computedMondai)"
            :key="index"
          >
            <a
              href=""
              class="block-list-item-link"
              @click.prevent="selectMondaiFromCat(cat, computedMondai[cat])"
            >
              <p class="quest-title">{{ cat }}</p>
              <span class="quest-info quest-num">{{
                computedMondai[cat].length
              }}</span>
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
import { ref } from "@vue/reactivity";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
export default {
  props: ["computedMondai", "selectedCat", "mondaiArray"],
  setup(props, { emit }) {
    const keywords = ref();
    const selectMondaiFromCat = (cat, arr) => {
      emit("selectMondai", cat, arr);
    };
    const filteredMondai = ref({});
    const filterMondai = () => {
      if (!keywords.value) return;
      filteredMondai.value = {
        "filteredMondai":[]
      }
      props.mondaiArray.filter((el) => {
        keywords.value.split(" "||"　"||",").map((keyword) => {
          if (JSON.stringify(el).includes(keyword)) {
            return filteredMondai.value["filteredMondai"].push(el);
          }
        });
      });
    };
    watchEffect(() => {
    });
    onMounted(() => {
      });
    return { selectMondaiFromCat, keywords, filteredMondai, filterMondai };
  },
};
</script>

<style>
</style>