<template>
  <div id="wrapper">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
export default {
  components: { Footer, Header },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&display=swap");
@mixin fz($size: 16) {
  font-size: ($size / 10) + rem;
}

html {
  font-size: 62.5%;
  font-family: "Noto Sans JP", serif;
}

p {
  @include fz(14);
}

$themeColor: #328bea;
$red: #ea3232;
$blue: #328bea;
$green: #2bc524;
$textColor: #333;
$gradBlue: linear-gradient(
  45deg,
  $themeColor 0%,
  #11bede 25%,
  $themeColor 50%,
  #11bede 75%
);
$gradRed:linear-gradient(
            45deg,
            $red 0%,
            #de7e11 25%,
            $red 50%,
            #de7e11 75%
          );
$mxWidth: 640px;
* {
  margin: 0;
  padding: 0;
  color: $textColor;
  line-height: 200%;
  letter-spacing: 0.2em;
  text-decoration: none;
}

input[type="submit"],
input[type="button"] {
  border-radius: 0;
  -webkit-box-sizing: content-box;
  -webkit-appearance: button;
  appearance: button;
  border: none;
  box-sizing: border-box;
  &::-webkit-search-decoration {
    display: none;
  }
  &:focus {
    outline-offset: -2px;
  }
}

input,
button,
select,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
}

textarea {
  resize: vertical;
}

input[type="checkbox"],
input[type="radio"] {
  display: none;
}

input[type="submit"],
input[type="button"],
label,
button,
select {
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

li {
  list-style-type: none;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

.box-shadow {
  box-shadow: 3px 3px 3px rgba($themeColor, $alpha: 0.1);
}

.bg-grid {
  background: url(./assets/bg_glid.jpg);
}

.bg-white {
  background: #fff;
}

#wrapper {
  position: relative;
  z-index: 1;
  max-width: $mxWidth;
  margin: auto;
  background: #fff;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  .header-inner {
    .logo-image {
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 0;
      p {
        @include fz(24);
        font-weight: bold;
        padding-left: 8px;
      }
      a,
      img {
        height: 100%;
        width: auto;
        display: block;
      }
    }
  }
}

footer {
  text-align: center;
  padding: 16px 0;
}

.block-content {
  .block-inner {
    width: calc(100% - 24px);
    margin: auto;
  }
}

.br-32 {
  border-radius: 32px;
}

.subttl {
  width: 100%;
  padding: 8px 0 8px;
  color: #fff;
  text-align: center;
  background: linear-gradient(
    90deg,
    $themeColor,
    #11bede,
    $themeColor,
    #11bede
  );
  font-weight: normal;
  @include fz(18);
}

.block-title-h3 {
  padding: 16px 0 8px;
  @include fz(18);
  &::before {
    display: inline-block;
    height: 1rem;
    width: 4px;
    background: $themeColor;
    content: "";
    margin-right: 2px;
  }
}

.ly-list-cont {
  position: relative;
  box-sizing: border-box;
  padding-top: 0px;
  padding-bottom: 16px;
  .icons{
        position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-correct,.icon-false{
         font-size: 60vw;
    font-weight: bold;
    display: flex;
    align-items: center;
    letter-spacing: 0;
    justify-content: center;
    }
        .icon-correct{
          color: rgba($red, $alpha: .2);
        }
      .icon-false{
          color: rgba($themeColor, $alpha: .2);
      }
  }
  .block-list-item {
    width: 100%;
    margin: 0 auto 16px;
    .block-list-item-link {
      display: flex;
      align-items: center;
      width: 100%;
      min-height: 64px;
      padding: 8px 64px 8px 16px;
      position: relative;
      box-sizing: border-box;
      .quest-title {
        text-align: left;
        @include fz(14);
      }
      .quest-info {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        @include fz(10);
        width: 56px;
        height: 56px;
        position: absolute;
        right: 8px;
        top: 4px;
        margin: auto;
        border-radius: 50%;
        transition: 0.3s;
        &.quest-num {
          background: linear-gradient(
            45deg,
            $themeColor 0%,
            #11bede 25%,
            $themeColor 50%,
            #11bede 75%
          );
          font-weight: bold;
          &::after {
            content: "問";
            @include fz(8);
          }
        }
        &.quest-result-correct {
          background: linear-gradient(
            45deg,
            $red 0%,
            #de7e11 25%,
            $red 50%,
            #de7e11 75%
          );
        }
        &.quest-result-false {
          background: linear-gradient(
            45deg,
            $themeColor 0%,
            #11bede 25%,
            $themeColor 50%,
            #11bede 75%
          );
        }
      }
      .quest-num {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        @include fz(10);
        width: 56px;
        height: 56px;
        position: absolute;
        right: 8px;
        top: 4px;
        margin: auto;
        border-radius: 50%;
        transition: 0.3s;
        background: linear-gradient(
          45deg,
          $themeColor 0%,
          #11bede 25%,
          $themeColor 50%,
          #11bede 75%
        );
        &::after {
          content: "問";
          @include fz(8);
        }
      }
    }
  }
}

.input-module {
  overflow: hidden;
  width: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  input[type="text"] {
    width: 100%;
    background: #fff;
    display: block;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgba($themeColor, $alpha: 0.25);
  }
  &.radio {
    input:checked + div > span {
      width: 0.8em;
      height: 0.8em;
      background: $themeColor;
      display: inline-block;
      border-radius: 50%;
      position: absolute;
      right: 8px;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    label {
      border-radius: 16px;
      border: 1px solid $textColor;
      display: inline-block;
      position: relative;
      padding: 2px 32px 2px 8px;
      margin-top: 8px;
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
}

.modal-cont {
  transition: 0.3s;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  margin: auto;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);

  z-index: 2;
  opacity: 1;
  .mask-layer {
    height: 100%;
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    z-index: 1;
  }
  .modal-inner {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: calc(100% - 32px);
    max-width: 720px;
    max-height: calc(var(--vh, 1vh) * 60);
    box-sizing: border-box;
    padding: 16px;
    margin: auto;
    background: #fff;
    border-radius: 24px;
    .input-module {
      margin-bottom: 16px;
    }
    .submit-area {
      width: 100%;
      display: flex;
      align-items: center;
      .link-btn {
        padding: 8px 16px;
        border-radius: 16px;
        background: $themeColor;
        color: #fff;
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
    .modal-title {
      box-sizing: border-box;
      padding-right: 40px;
      @include fz(18);
    }
    .modal-sub-title {
      margin-top: 16px;
      position: relative;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-block;
        height: 1rem;
        border-left: 2px solid $themeColor;
        margin-right: 0.5em;
      }
    }
    .modal-close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 48px;
      height: 48px;
      display: block;
      cursor: pointer;
      span {
        width: 80%;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        transform: rotate(45deg);
        height: 2px;
        background: $themeColor;
        &:nth-child(2) {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
.quest-status {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 24px 0;
  .quest-num {
    background: $gradBlue;
    color: #fff;
    border-radius: 16px;
    width: auto;
    padding: 0 16px;
    font-weight: bold;
    @include fz(12);
    text-align: center;
  }
  .quest-id {
    text-align: right;
    width: 30%;
    @include fz(11);
  }
  .quest-name {
    margin-top: 24px;
    width: 100%;
    text-align: left;
    padding-left: 24px;
    padding-right: 24px;
  }
}
.title-bg-white {
  width: calc(100% + 24px);
  margin: auto;
  margin-left: -12px;
  background: #fff;
  padding: 8px 0;
}
.mondai-options{
  padding: 0 24px;
  .option{
    background: rgba($themeColor, $alpha: .7);
    color: #fff;
    margin-bottom: 8px;
    border-radius: 8px;
    font-weight: bold;
    padding: 0 8px;
    text-align: left;
  }
}
.exp-text{
  border-top: 1px solid rgba($red, $alpha: .4);
  padding: 24px 0 0;
  width: calc(100% - 48px);
  margin: 24px auto 0;
  >.title{
    display: flex;
align-items: center;
    text-align: left;
    font-weight: bold;
    span{
      white-space: nowrap;
      background: $gradRed;
    font-weight: bold;
      color: #fff;
      padding: 0 8px;
      border-radius: 24px;
      margin-right: 16px;
      @include fz(11);
    }
  }
  .text{
    padding-top: 8px;
    text-align: left;
  }
}
.close{
  .exp-text{
    display: none;
  }
}
.mondai-list-cont {
  margin-top: 24px;
  margin-bottom: 24px;
  > .title {
    background: $blue;
    color: #fff;
    padding: 4px 0;
    text-align: center;
    @include fz(16);
  }
  > .note {
    padding: 16px 0;
    @include fz(11);
  }
  .mondai-item{
    &:not(:last-child){
      margin-bottom: 24px;
    }
  }
  .mondai-item-inner {
    border-radius: 16px;
    padding-bottom: 24px;
    .mondai-text {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 24px;
      .num {
        border-radius: 24px;
        display: block;
        padding: 0 8px;
        width: auto;
        white-space: nowrap;
        background: $gradBlue;
        color: #fff;
        font-weight: bold;
        @include fz(11);
        &::before {
          content: "Q.";
          display: inline-block;
        }
      }
      .text {
        width: auto;
        padding-left: 16px;
        text-align: left;
      }
    }
  }
}

  .result-message{
    padding: 24px 0 16px;
    @include fz(24);
  }
.result-area {
  position: relative;
  .score-inner {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    .mondai-num {
      @include fz(12);
      font-weight: bold;
      span {
        @include fz(16);
      }
    }
    .score-num {
      color: $blue;
      @include fz(16);
      font-weight: bold;
      span {
        color: $blue;
        @include fz(32);
      }
    }
  }
}
.quest-ui {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 24px;
  position: relative;
  &.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba($color: #fff, $alpha: 0.5);
    padding: 12px 24px 12px;
  }
  button {
    padding: 4px 16px;
    font-weight: bold;
    border-radius: 16px;
    background: $blue;
    color: #fff;
    &.giveup-btn {
      margin: auto;
      background: #ea3264f7;
    }
    &.showres-btn{
      background: #ea3264f7;
    }
    &.unknown-btn {
      background: #248dc5ab;
    }
    &.next-btn {
      position: relative;
      &::after {
        content: "▶︎";
        color: #fff;
        display: inline-block;
      }
    }
    &.prev-btn {
      position: relative;
      &::before {
        content: "◀︎";
        color: #fff;
        display: inline-block;
      }
    }
  }
}

.quest-exp {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  text-align: left;
  margin-bottom: 24px;
}
.form-item{
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  label{
    @include fz(14);
  }
  input[type="text"]{
    border-bottom: 1px solid rgba(#333,.1);
    width: 90%;
    @include fz(14);
  }
}
</style>
