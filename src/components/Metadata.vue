<template>

    <div class="topbox floatr">
        <div class="details">volume: <span id="volume">{{lastVolume}}</span></div>
        <div class="details">daily high: <span id="dailyhigh">{{dailyHigh}}</span></div>
    </div>

</template>


<script>



export default {
    name: "Metadata",
    data () {
        return {
            lastVolume: '300.00',
            dailyHigh: '282.82'
        }
    }
};
</script>


<style>

</style>
