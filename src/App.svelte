<script>
    import { onMount } from "svelte";
    import { World } from "World/World";

    let world, el;
    let opened = false;

    onMount(() => {
        startWorld().catch(err => {
            console.error(err);
        })
    });

    const startWorld = async () => {
        world = new World(el);

        await world.init(el);

        world.start();
    }

    const trigger = () => {
        if (!opened) {
            world.open();
            opened = true;
        }
        else {
            world.close();
            opened = false;
        }
    }
</script>

<div class="container-3d" bind:this={el} on:click={trigger}></div>

<style>
    .container-3d {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100vh;
    }
</style>