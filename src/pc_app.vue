<template>
  <div>
    <PCHeader />
    <PCGridUser />
    <PCMakeUser />
  </div>
</template>

<script>
import { PCHeader, PCGridUser, PCMakeUser } from 'components';

export default {
  name: 'PCApp',
  components: {
    PCHeader,
    PCGridUser,
    PCMakeUser,
  },
  data() {
    return {

    };
  },
};
</script>

<style>
  
</style>
