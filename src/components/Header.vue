<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled><h4>My Quiz App</h4></b-nav-item>
            <b-nav-item disabled>Question: {{counterCurrent+1}}/{{counterTotal}}</b-nav-item>
            <b-nav-item disabled>Correct answers: {{numCorrectAns}}/{{counterTotal}}</b-nav-item>
        </b-nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        counterCurrent: Number,
        counterTotal: Number,
        numCorrectAns: Number
    }
}
</script>