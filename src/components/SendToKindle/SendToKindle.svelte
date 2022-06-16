<script lang="ts">
    import { localStore } from "../../store/store"

    export let workUrl
    let isVisible = false

    const sendToKindle = async () => {
        try {
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
        }
    }
</script>

<div
    class="send-to-kindle-container"
    aria-describedby="send-to-kindle-tooltip"
    role="button"
    on:mouseenter={() => (isVisible = true)}
    on:mouseleave={() => (isVisible = false)}
    on:click={sendToKindle}
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
{#if isVisible}
    <div role="tooltip" id="send-to-kindle-tooltip">Send to kindle</div>
{/if}

<style lang="sass">
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
