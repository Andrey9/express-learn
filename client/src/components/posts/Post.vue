<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="card">
        <v-card-title primary-title>
          <h3>{{ post.title }}</h3>
        </v-card-title>
        <v-card-text>
          <div>{{ post.content }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat dark class="blue darken-2" :to="`/posts/${post._id}/edit`">Edit</v-btn>
          <v-btn flat dark class="red darken-2" :to="`/posts/${post._id}`">Delete</v-btn>
        </v-card-actions>
      </v-card>
      <comments-list :comments="post.comments" @addComment="addComment"/>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '../../services/PostService';
import CommentsList from './common/CommentsList';
import bus from '../../store/eventBus';

export default {
  data () {
    return {
      post: {}
    };
  },
  async mounted () {
    this.loadPost();
  },
  components: {
    CommentsList
  },
  methods: {
    async loadPost () {
      try {
        const result = await PostService.getPostById(this.$route.params.id);
        this.post = result.data;
      } catch (err) {
        bus.flash('Whoops! Something went wrong', 'error');
        this.$router.push('/404');
      }
    },
    async addComment (comment) {
      try {
        await PostService.addComment(this.$route.params.id, { comment });
        bus.flash('Comment added', 'success');
        this.loadPost();
      } catch (error) {
        bus.flash('Whoops! Something went wrong', 'error');
      }
    }
  }
};
</script>

<style scoped>
  .card {
    margin-top: 20px;
    text-align: left;
  }
</style>
