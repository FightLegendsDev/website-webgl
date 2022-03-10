<script>
    import { Link, navigate } from "svelte-routing";
    import { register, savedEmail } from "auth";

    let loading = false,
        error = "",
        flashError = false;

    let form = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };

    const flashErrorMessage = () => {
        flashError = true;

        setTimeout(() => {
            flashError = false;
        }, 2000);
    };

    const isThereEmptyField = () => {
        return form.username.length <= 0 ||
            form.email.length <= 0 ||
            form.password <= 0 ||
            form.passwordConfirm <= 0;
    };

    const submit = async (e) => {
        if (isThereEmptyField())
            error = "Please fill out the form to register.";
        if (error.length > 0) {
            flashErrorMessage();
            return;
        }

        loading = true;

        const res = await register(form);

        // add try catch, do not go to next view if error
        savedEmail.set(form.email);
        navigate("email-verification");

        loading = false;
        console.log(res);
    };
    
    const formCheck = (e) => {
        let mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

        if (form.username.length > 0 && form.username.length < 3)
            error = "Username must be at least 3 characters.";
        else if (form.username.length > 127)
            error = "Got a bit excited here didn't we ? This is way too long for a username.";
        else if (form.email.length > 0 && !mailReg.test(form.email))
            error = "Please enter a valid mail address.";
        else if (
            form.password.length > 0 &&
            form.passwordConfirm.length > 0 &&
            form.password !== form.passwordConfirm
        )
            error = "Your passwords must match.";
        else if (form.password.length > 0 && !passwordReg.test(form.password))
            error = "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character.";
        else
            error = "";
    };
</script>

<form on:submit|preventDefault={submit} on:input={formCheck}>
    <p class="mb-6">Create an account and join the Fight today.</p>
    <input
        type="text"
        name="username"
        class="username mb-2"
        placeholder="Choose your username"
        disabled="{loading}"
        bind:value={form.username}
    />
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
        placeholder="Choose your password"
        disabled="{loading}"
        bind:value={form.password}
    />
    <input
        type="password"
        name="password-confirm"
        class="password-confirm mb-2"
        placeholder="Confirm your password"
        disabled="{loading}"
        bind:value={form.passwordConfirm}
    />
    <p class="mb-4 error-message" class:flashing={flashError}>{error}</p>
    <button class="yellow mb-8" class:loading={loading} type="submit">REGISTER</button>
    <p class="text-center">
        Already have an account ? <Link to="/">Login now.</Link>
    </p>
</form>