<script>
    import { Link } from "svelte-routing";
    import { login } from "auth";

    let loading = false,
        error = "",
        flashError = false;

    let form = {
        email: "",
        password: "",
    };

    const flashErrorMessage = () => {
        flashError = true;

        setTimeout(() => {
            flashError = false;
        }, 2000);
    };

    const isThereEmptyField = () => {
        return form.email.length <= 0 ||
            form.password <= 0;
    };

    const submit = async (e) => {
        if (isThereEmptyField())
            error = "Please fill out your details to login.";
        if (error.length > 0) {
            flashErrorMessage();
            return;
        }

        loading = true;

        const res = await login(form);

        loading = false;
        console.log(res);
    };
</script>

<form on:submit|preventDefault={submit}>
    <p class="mb-6">Please login to your account.</p>
    <input
        type="email"
        name="email"
        class="email mb-2"
        placeholder="Enter your mail address"
        disabled="{loading}"
        bind:value={form.email}
    />
    <input
        type="password"
        name="password"
        class="password mb-2"
        placeholder="Enter your password"
        disabled="{loading}"
        bind:value={form.password}
    />
    <p class="mb-4 error-message" class:flashing={flashError}>{error}</p>

    <div class="text-right grey-link mb-4">
        <Link to="password-recovery">
            Forgot your password ?
        </Link>
    </div>
    <button class="yellow mb-8" class:loading={loading} type="submit">LOGIN</button>
    <p class="text-center">
        Don't have an account ? <Link to="register">Create one now.</Link>
    </p>
</form>