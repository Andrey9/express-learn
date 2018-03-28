<template>
  <div style="position: relative">
    <hr>
    <v-btn absolute dark fab top right small color="blue darken-2" @click.stop="commentFormShow = true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card class="card" v-for="(comment, key) in comments" :key="key">
      <v-card-title>
        <h4>{{ comment.author.firstName }} {{ comment.author.lastName }}</h4>
      </v-card-title>
      <v-card-text>
        <p>{{ comment.comment }}</p>
      </v-card-text>
    </v-card>

    <v-dialog v-model="commentFormShow" max-width="500px">
      <v-card>
        <v-card-title>
          <h4>Add new comment</h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            name="comment"
            label="Comment"
            multi-line v-model="comment"
            v-validate="'required'"
            :error-messages="errors.collect('comment')"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="addComment">Add</v-btn>
          <v-btn color="primary" flat @click.stop="commentFormShow = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import bus from '../../../store/eventBus';

export default {
  props: {
    comments: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      commentFormShow: false,
      comment: ''
    };
  },
  methods: {
    async addComment () {
      const isValid = await this.$validator.validateAll();

      if (!isValid) {
        bus.flash('Fill required fields', 'error');
        return false;
      }

      this.$emit('addComment', this.comment);
      this.commentFormShow = false;
      this.comment = '';
    }
  }
};
</script>

<style scoped>
  hr {
    margin: 30px auto;
  }
  .card {
    text-align: left;
    border-bottom: 1px solid black;
  }
</style>
