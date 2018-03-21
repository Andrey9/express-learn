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

export default {
  name: 'home',
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
      console.log(error);
      this.$store.dispatch('addMessage', { type: 'error', message: 'Whoops! Something went wrong' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card {
    margin-top: 20px;
  }
</style>
