<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="(post, key) in posts" :key="key" class="card">
        <v-card-title primary-title>{{ post.title }}</v-card-title>
        <v-card-actions>
          <v-btn class="blue darken-2" dark >Show</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '../../services/PostService';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      posts: []
    };
  },
  async mounted () {
    try {
      const result = await PostService.getPosts();
      this.posts = result.data;
    } catch (error) {
      bus.flash('Whoops! Something went wrong', 'error');
    }
  }
};
</script>

<style scoped>
  .card {
    margin-top: 20px;
  }
</style>
