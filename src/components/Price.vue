<template>

    <div class="topbox ml50">
        <div id="cryptoname">
            Bitcoin<span class="ticker">BTC</span>
        </div>
        <div id="price">{{currentPrice}}</div>
    </div>

</template>


<script>



export default {
    name: "Price",
    data () {
        return {
            currentPrice: '700.00'
        }
    }
};
</script>


<style>

</style>
