<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" ref="inputText" v-model="inputCardTitle">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="cancelAdding">&times;</a>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddCard',
  data() {
    return {
      inputCardTitle: '',
    }
  },
  computed: {
    invalidInput() {
      return !this.inputCardTitle.trim();
    },
  },
  mounted() {
    this.$refs.inputText.focus();
    this.setupClickOutside(this.$el);
  },
  methods: {
    cancelAdding() {
      this.$emit('close');
    },
    onSubmit() {
      console.log('submit');
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        if (el.contains(e.target)) {
          return;
        }
        this.$emit('close');
      });
    },
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
