<template>

    <div class="topbox floatl ml50">
        <div id="cryptoname">
            Bitcoin<span class="ticker">BTC</span>
        </div>
        <div id="price" ref="value">
            {{this.$parent.getCleanValue(lastPrice)}}
        </div>
    </div>

</template>


<script>
export default {
    props: ['lastPrice'],
    name: "Price",
    watch: { 
        lastPrice: function(newVal, oldVal) { 
                if(newVal > oldVal)
                    this.$refs.value.style.animation = "greenFlash .8s";
                if(newVal < oldVal)
                    this.$refs.value.style.animation = "redFlash .8s";
            }
    }
};
</script>
