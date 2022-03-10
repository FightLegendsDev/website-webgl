<script>
    import { sendAgain, savedEmail } from "auth";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    let loading = false;

    const submit = async () => {
        loading = true;

        const res = await sendAgain();

        loading = false;
    };

    onMount(() => {
        if (get(savedEmail).length < 1) {
            navigate("/", { replace: true });
        }
    });
</script>

<form on:submit|preventDefault={submit}>
    <p class="mb-8">Thank you for creating an account. You should receive an email in the next few minutes to confirm your account.</p>
    <button class="yellow mb-8" class:loading={loading} type="submit">SEND AGAIN</button>
</form>