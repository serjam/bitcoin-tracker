<template>

    <div class="topbox floatr">
        <div class="details">volume: <span>{{this.$parent.getCleanValue(metaInfo['vol'])}}</span></div>
        <div class="details">daily high: <span>{{this.$parent.getCleanValue(metaInfo['daily'])}}</span></div>
    </div>

</template>


<script>
export default {
    name: "Metadata",
    props: ['metaInfo']

};
</script>
