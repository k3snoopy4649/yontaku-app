<template>
  <div class="block-content">
    <div class="block-inner" v-if="!playStatus.showRes">
      <div class="quest-status">
        <p class="quest-num">
          Q.{{ playStatus["index"]+1 }}/{{ data.length }}問（正解{{
            playStatus.correct.length
          }}問）
        </p>
        <p class="quest-id">ID:{{ id }}</p>
        <h3 class="quest-name">{{ title }}</h3>
      </div>
      <ul class="ly-list-cont">
        <div class="icons">
          <span class="icon-correct" v-if="playStatus.showExp && isCorrect">◯</span>
          <span class="icon-false" v-if="playStatus.showExp && !isCorrect &&isCorrect != null">×</span>
        </div>
        <li
          class="block-list-item br-32 box-shadow bg-white"
          v-for="(computedOption, index) in computedOptions"
          :key="index"
        >
          <a
            href=""
            class="block-list-item-link"
            @click.prevent="selectOption(computedOption[1])"
          >
            <p class="quest-title">{{ computedOption[0] }}</p>

            <span
              class="quest-info quest-result-correct"
              v-if="computedOption[1] && playStatus.showExp"
              >正解</span
            >
            <span
              class="quest-info quest-result-false"
              v-if="!computedOption[1] && playStatus.showExp"
              >不正解</span
            >
          </a>
        </li>
      </ul>
      <div class="quest-ui">
        <button class="prev-btn" v-if="playStatus.index != 0" @click="prevBtn">
          前の問題
        </button>
        <button class="showres-btn" @click.prevent="showRes" v-if="isLastQuest">
          結果をみる
        </button>
        <button class="unknown-btn" @click.prevent="selectOption(false)" v-if="!isLastQuest">
          答えをみる
        </button>
        <button
          class="next-btn"
          v-if="data.length != playStatus.index && !isLastQuest"
          @click="nextBtn"
        >
          次の問題
        </button>
      </div>
      <div class="quest-exp box-shadow" v-if="playStatus.showExp">
        <p v-html="exp"></p>
      </div>

      <div class="quest-ui" v-if="data.length != playStatus.index && !isLastQuest">
        <button class="giveup-btn" @click.prevent="showRes">終了する</button>
      </div>
    </div>
    <div class="block-inner" v-else id="result">
      <div class="title-bg-white">
        <h2>問題：{{ setting.title }}</h2>
      </div>
        <h3 class="result-message">{{message}}</h3>
      <div class="result-area">
        <div class="score">
            <canvas id="myChart" width="400" height="400"></canvas>
          <div class="score-inner">
            <p class="mondai-num">
              全<span>{{ data.length }}</span
              >問中
            </p>
            <p class="score-num">
              <span v-if="score">{{ score }}</span
              ><span v-else>0</span>点
            </p>
          </div>
        </div>
      </div>
      <div class="mondai-list-cont">
        <h3 class="title">間違えた問題一覧</h3>
        <p class="note">クリックすると解答が確認できます。</p>
        <ul class="mondai-list">
          <li
            class="mondai-item"
            v-for="(mondai_failed, i) in data_failed"
            :key="i"
          >
            <div
              class="mondai-item-inner box-shadow bg-white close"
              v-if="mondai_failed"
              :id="'ID' + mondai_failed.id" @click="showAnswer('ID' + mondai_failed.id)"
            >
              <div class="mondai-text">
                <p class="num">{{ i }}</p>
                <p class="text">{{ mondai_failed.title }}</p>
              </div>
              <div class="mondai-options">
                <p
                  class="option"
                  v-for="option in mondai_failed.options"
                  :key="option"
                  
                >
                  {{ option }}
                </p>
              </div>
              <div class="exp-text">
                <p class="title">
                  <span>正解</span
                  >{{ mondai_failed.options[mondai_failed.ans-1] }}
                </p>
                <p class="text" v-html="mondai_failed.exp"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="quest-ui fixed-bottom">
        <button class="giveup-btn" @click.prevent="retry">再挑戦！</button>
        <button class="giveup-btn" @click.prevent="reset">ホームに戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, DoughnutController, ArcElement, Tooltip } from "chart.js";
Chart.register(DoughnutController, ArcElement, Tooltip);
import { ref } from "@vue/reactivity";
import { computed, onMounted, watchEffect } from "@vue/runtime-core";
import GetLocal from "../composable/GetLocal";
export default {
  props: ["setting", "status"],
  setup(props, { emit }) {
    const isLastQuest = ref(false)
    const isCorrect = ref(null)
    const ctx = ref(null);
    const message = ref(null)
    const { getLocal } = GetLocal();
    const playStatus = ref(
      getLocal("status").playStatus || {
        index: 0,
        isAnswered: [],
        correct: [],
        false: [],
        showExp: false,
        showRes: false,
      }
    );
    const data = ref(props.setting.mondai);
    const data_failed = computed(() => {
      return data.value.map((el, i) => {
        if (!playStatus.value.correct.includes(i)) return el;
      });
    });
    const scrollTop = () =>{

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
    const quest = ref(data.value[playStatus.value.index]);
    const title = ref(quest.value.title);
    const exp = ref(quest.value.exp);
    const options = ref(quest.value.options);
    const id = ref(quest.value.id);
    const score = ref(playStatus.value.correct.length || null);
    const randomArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
      }
    };
    const computedOptions = computed(() => {
      let res = options.value.reduce((arr, data, i) => {
        arr[i] = [];
        arr[i].push(data);
        Number(quest.value["ans"])-1 === i
          ? arr[i].push(true)
          : arr[i].push(false);
        return arr;
      }, []);
      randomArray(res);
      return res;
    });
    const updateStatus = () => {
      quest.value = data.value[playStatus.value.index];
      title.value = quest.value.title;
      exp.value = quest.value.exp;
      options.value = quest.value.options;
      id.value = quest.value.id;
      playStatus.value.isAnswered.includes(playStatus.value.index)
        ? (playStatus.value.showExp = true)
        : (playStatus.value.showExp = false);
      props.status["playStatus"] = playStatus.value;
      emit("update", props.status);
    };
    const nextBtn = () => {
      playStatus.value.index++;
      updateStatus();
    };
    const prevBtn = () => {
      playStatus.value.index--;
      updateStatus();
    };
    const selectOption = (correct) => {
      if (playStatus.value.isAnswered.includes(playStatus.value.index)) return;

      playStatus.value.showExp = !playStatus.value.showExp;
      playStatus.value.isAnswered.push(playStatus.value.index);
      
        isCorrect.value = correct
      if(correct){
        playStatus.value.correct.push(playStatus.value.index)
      } else {
        playStatus.value.false.push(playStatus.value.index);
      }
      props.status["playStatus"] = playStatus.value;
      emit("update", props.status);
    };
    onMounted(() => {
      scrollTop()
      if (!props.status.playStatus) {
        updateStatus();
      }
      if (playStatus.value.showRes) {
        message.value = evalScore();
        addGraph();
      }
    });
    const retry = () => {
      playStatus.value = {
        index: 0,
        isAnswered: [],
        correct: [],
        false: [],
        showExp: false,
      };
      props.status.playStatus = playStatus.value;
      emit("update", props.status);
    };
    const reset = () => {
      playStatus.value = {
        index: 0,
        isAnswered: [],
        correct: [],
        false: [],
        showExp: false,
      };
      props.status.isPlaying = false;
      props.status.playStatus = playStatus.value;
      emit("update", props.status);
    };
    const addGraph = () => {
      ctx.value = document.getElementById("myChart");
      const createChart = new Chart(ctx.value, {
        type: "doughnut",
        options: {
          cutout: 120,
        },
        data: {
          labels: ["正解", "不正解"],
          datasets: [
            {
              label: "結果",
              data: [score.value, data.value.length],
              backgroundColor: ["#328bea", "#8b8b8b"],
              hoverOffset: 1,
            },
          ],
        },
      });
    };
    const showRes = () => {
      score.value = playStatus.value.correct.length;
      playStatus.value.showRes = !playStatus.value.showRes;
      updateStatus();
      scrollTop()
      message.value = evalScore();
      setTimeout(() => {
        addGraph();
      }, 250);
    };
    const showAnswer = (id) => {
      const trgElm = document.getElementById(id);
      if (!trgElm.classList.contains("close")) return;
      trgElm.classList.remove("close");
    };
    const evalScore = () =>{
      const _score = ref(score.value / data.value.length * 100)
      switch(_score.value){
        case _score.value === 100:
          return "完璧！"
          break;
        case _score.value >= 80:
          return "素晴らしい"
          break;
        case _score.value >= 70:
          return "惜しい！"
          break;
        case _score.value >= 60:
          return "ギリギリセーフ！"
          break;
        case _score.value >= 30:
          return "もう少し頑張ろう！"
          break;
        default:
          return "伸び代しかない！！"
      }
    }
    watchEffect(()=>{
      if(playStatus.value.index+1 === data.value.length){
        isLastQuest.value = true
      } else  {
        isLastQuest.value = false
      }
    })
    return {
      isLastQuest,
      title,
      data,
      updateStatus,
      playStatus,
      options,
      id,
      computedOptions,
      selectOption,
      exp,
      reset,
      nextBtn,
      prevBtn,
      showRes,
      score,
      data_failed,
      showAnswer,
      retry,
      message,
      isCorrect,
    };
  },
};
</script>

<style>
</style>