<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
           @click.prevent="SET_IS_SHOW_ADD_BOARD(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': isValid}" type="submit" form="add-board-form" :disabled="!isValid">
        Create Board
      </button>
    </div>
  </Modal>
</template>

<script>
  import Modal from './Modal';
  import {mapActions, mapMutations} from 'vuex';

  export default {
    name: "AddBoard",
    components: { Modal },
    data () {
      return {
        input: '',
        isValid: false
      }
    },
    watch: {
      input(val) {
        this.isValid = !!val.trim().length
      }
    },
    mounted () {
      this.$refs.input.focus()
    },
    methods: {
      ...mapMutations([
        'SET_IS_SHOW_ADD_BOARD',
      ]),
      ...mapActions([
        'ADD_BOARD',
      ]),
      addBoard() {
        this.SET_IS_SHOW_ADD_BOARD(false);
        this.ADD_BOARD({title: this.input})
        .then(({id}) => this.$router.push(`/b/${id}`));
      },
    }
  }
</script>

<style scoped>

</style>
