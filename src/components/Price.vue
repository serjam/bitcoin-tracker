<template>

    <div class="topbox floatl ml50">
        <div id="cryptoname">
            Bitcoin<span class="ticker">BTC</span>
        </div>
        <div id="price">{{this.$parent.getCleanValue(lastPrice)}}</div>
    </div>

</template>


<script>
export default {
    props: ['lastPrice'],
    name: "Price"
};
</script>


<style>

</style>
