<script lang="ts">
    import { fade } from "svelte/transition"
    import { localStore } from "../../store/store"
    import Spinner from "../Spinner/Spinner.svelte"

    export let workUrl
    let isTooltipVisible = false
    let isSpinnerVisible = false

    const sendToKindle = async () => {
        try {
            isSpinnerVisible = true
            const email = await localStore.get("email")
            if (email) {
                const response = await fetch(
                    "https://ao3-send-to-kindle.herokuapp.com/emailer/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            workUrl: workUrl,
                            emailTo: email,
                        }),
                    }
                )

                if (response.status === 200) {
                    console.log("Email sent successfully")
                } else {
                    console.error("Error sending email")
                }
            } else {
                console.error("No email address found")
            }
        } catch (e) {
            console.error(e)
        } finally {
            isSpinnerVisible = false
        }
    }
</script>

{#if isSpinnerVisible}
    <div class="spinner" in:fade={{ delay: 200, duration: 500 }}>
        <Spinner />
    </div>
{:else}
    <div
        class="send-to-kindle-container"
        aria-describedby="send-to-kindle-tooltip"
        role="button"
        on:mouseenter={() => (isTooltipVisible = true)}
        on:mouseleave={() => (isTooltipVisible = false)}
        on:click={sendToKindle}
        in:fade={{ delay: 200, duration: 500 }}
    >
        <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
            ><line x1="22" y1="2" x2="11" y2="13" /><polygon
                points="22 2 15 22 11 13 2 9 22 2"
            /></svg
        >
    </div>
{/if}
{#if isTooltipVisible}
    <div role="tooltip" id="send-to-kindle-tooltip">Send to kindle</div>
{/if}

<style lang="sass">
    .spinner
        margin-top: 0.5rem
        margin-bottom: 0.25rem
    .send-to-kindle-container
        margin-top: 0.5rem
        margin-bottom: 0.25rem
        cursor: pointer
        width: fit-content
    #send-to-kindle-tooltip
        position: absolute
        top: 4rem
        background-color: #2D3748
        color: #F7FAFC
        padding: 0.25rem
</style>
