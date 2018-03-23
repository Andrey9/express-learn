<template>
  <v-layout column>
    <v-flex xs8 offset-xs2>
      <div class="white elevation-2  top-120">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Create new post</v-toolbar-title>
        </v-toolbar>
        <post-form v-model="form" ref="form"/>
        <v-btn class="blue darken-2" dark @click="create">Create</v-btn>
        <v-btn class="white darken-2"
               style="color: black"
               dark to="/">Cancel</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '../../services/PostService';
import PostForm from './common/PostForm';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    };
  },
  methods: {
    async create () {
      const isValid = await this.$refs.form.$validator.validateAll();
      if (!isValid) {
        bus.flash('Fill required fields', 'error');
        return false;
      }

      try {
        await PostService.create(this.form);
        bus.flash('Post was created', 'success');
        this.$router.push('/');
      } catch (error) {
        bus.flash('Something went wrong...', 'error');
      }
    }
  },
  components: {
    PostForm
  }
};
</script>
