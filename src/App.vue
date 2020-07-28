<template>
  <div id="app">
      <Header :counterCurrent="index" :counterTotal="totalQuestions" :numCorrectAns="numCorrectAns"/>

      <b-container class="bv-example-row">
        <b-row>
          <b-col sm="6" offset="3">
            <QuestionBox
              v-if="questions.length"
              :currentQuestion="questions[index]"
              :next="next"
              :increment="increment"
             />
          </b-col>          
        </b-row>
          <b-button v-if="index === totalQuestions - 1" @click="re_render()">Take quiz again</b-button>
      </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import QuestionBox from '@/components/QuestionBox';

export default {
  name: 'app',
  components: {
    Header,
    QuestionBox
  },
  data() {
    return {
      questions: [],
      index: 0,
      totalQuestions: 0,
      numCorrectAns: 0
    }
  },
  methods: {
    next() {
      if (this.index < this.totalQuestions -1) {
        this.index++;
      }
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrectAns++;
      }
    },
    re_render() {
      //this.vm.$forceUpdate();
      //return this.mounted();
    }

  },
  mounted() {
    fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple', {
      method: 'get'
    }).then((response) => {
      return response.json();
    }).then((jsonData) => {
      this.questions = jsonData.results; 
      this.totalQuestions = this.questions.length
    });
  }

}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #000000
  margin-top 60px
</style>
