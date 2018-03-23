<template>
  <v-layout column>
    <v-flex xs8 offset-xs2>
      <div class="white elevation-2  top-120">
        <v-toolbar class="blue darken-2" flat dense dark>
          <v-toolbar-title>Update post</v-toolbar-title>
        </v-toolbar>
        <post-form v-model="form" ref="form"/>
        <v-btn class="blue darken-2" dark @click="update">Update</v-btn>
        <v-btn class="white darken-2"
               style="color: black"
               dark :to="`/posts/${id}`">Cancel</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import PostForm from './common/PostForm';
import PostService from '../../services/PostService';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      id: '',
      form: {
        title: '',
        content: ''
      }
    };
  },
  async mounted () {
    try {
      const result = await PostService.getPostById(this.$route.params.id);
      this.id = result.data._id;
      this.form.title = result.data.title;
      this.form.content = result.data.content;
    } catch (error) {
      bus.flash('Whoops! Something went wrong', 'error');
    }
  },
  methods: {
    async update () {
      const isValid = await this.$refs.form.$validator.validateAll();
      if (!isValid) {
        bus.flash('Fill required fields', 'error');
        return false;
      }

      try {
        await PostService.update(this.$route.params.id, this.form);
        bus.flash('Post was updated', 'success');
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

<style scoped>

</style>
