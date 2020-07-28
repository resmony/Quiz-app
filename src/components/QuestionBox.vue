<template>
    <div class="question-box-container">
        <b-jumbotron>
            <template v-slot:lead>
                <span v-html="currentQuestion.question"></span>
            </template>

            <hr class="my-4">

            <b-list-group>
                <b-list-group-item
                    
                    v-for="(answer, index) in shuffledAnswers" 
                    :key="index"
                    @click.prevent="selectAnswer(index)"
                    :class="[classChanger(index)]"
                               
                >
                    <span v-html="answer" ></span>
                </b-list-group-item>
            </b-list-group>

            <div class="btn btn-group">
                <!-- <b-button 
                    variant="primary" 
                    @click="submitAnswer">Submit</b-button> -->
                <b-button @click="next" variant="success" href="#">Next</b-button> 
            </div>
            
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    name: 'QuestionBox',
    props: {
        currentQuestion: Object,
        next: Function,
        increment: Function
    },
    data() {
        return {
            selectedIndex: null,
            correctIndex: null,
            shuffledAnswers: [],
            answered: false,
            isRightAnswer: false
        }
    },
    methods: {   
        selectAnswer(index) {
            this.selectedIndex = index;
            
            if (!this.answered) {
                this.submitAnswer();
            }
        },

        shuffleAnswers() {
            let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer];
            this.shuffledAnswers = _.shuffle(answers);
            this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer);
        },

        submitAnswer() {
            let isCorrect = false;

            if (this.selectedIndex === this.correctIndex) {
                isCorrect = true;
            }

            this.answered = true;
            this.increment(isCorrect);
        },

        classChanger(index) {
            if (this.answered)
                return this.correctIndex === index ? 
                    'correct' : this.selectedIndex !== index ? 'disabled' : 'incorrect';            
        }
    },
    computed: {
        answers() {
            let answers = [...this.currentQuestion.incorrect_answers];
            answers.push(this.currentQuestion.correct_answer);         
            return answers;   
        }
    },
    watch: {
        currentQuestion: {
            immediate: true,
            handler() {
               this.selectedIndex = null;
               this.shuffleAnswers();
               this.answered = false;
               this.isRightAnswer = false;
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.question-box-container 
    margin-top: 10px

.list-group-item:hover {
    background: #bfbaba;
    cursor: pointer
}

.btn {
    margin-top: 10px
}

.selected {
    background-color: #42d1f5;
}

.correct {
    background-color: #42f079;
}

.incorrect {
    background-color: #e6665e;
}


</style>