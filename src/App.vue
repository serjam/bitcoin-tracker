<template>
    <div id="container">
        <div id="content">
            <Price/>
            <Metadata/>
            <Graph/>
        </div>
    </div>
</template>

<script>

import Price from "./components/Price";
import Metadata from "./components/Metadata";
import Graph from "./components/Graph";


export default {
    name: "App",
    components: {
        Price,
        Metadata,
        Graph
    }
};
</script>

<style lang="scss">
    @import './assets/styles.css';
</style>