<template>
  <div class="pl-4 pr-4 pt-2 pb-2">
    <v-text-field name="title" label="Title" id="Title" type="title"
        :value="value.title" v-validate="'required'"
        :error-messages="errors.collect('title')"
        @input="change('title', $event)"/>
    <v-text-field name="content" label="Content" id="content" type="text"
        :value="value.content" v-validate="'required'"
        :error-messages="errors.collect('content')"
        @input="change('content', $event)"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  data () {
    return {
      form: this.value
    };
  },
  methods: {
    change (attr, value) {
      this.form[attr] = value;
      this.$emit('input', this.form);
    }
  }
};
</script>

<style scoped>

</style>
