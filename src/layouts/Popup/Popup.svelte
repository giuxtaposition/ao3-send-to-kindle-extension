<script lang="ts">
    import { onMount } from "svelte"
    import Alert from "../../components/Alert/Alert.svelte"
    import { localStore } from "../../store/store"

    let email = ""

    let alertMessage = ""
    let alertType: "success" | "error" = "success"
    let alertIsVisible = false

    onMount(async () => {
        email = await localStore.get("email")
    })

    const updateEmail = async () => {
        try {
            await localStore.set("email", email)
            alertType = "success"
            alertMessage = "Email updated successfully"
            alertIsVisible = true
        } catch (e) {
            alertMessage = "Error updating email"
            alertType = "error"
            alertIsVisible = true
        } finally {
            setTimeout(() => {
                alertIsVisible = false
            }, 3000)
        }
    }

    const onKeyPress = async e => {
        if (e.charCode === 13) await updateEmail()
    }
</script>

<div id="popup-content">
    <Alert message={alertMessage} type={alertType} isVisible={alertIsVisible} />
    <input
        type="email"
        placeholder="Email"
        bind:value={email}
        on:keypress={onKeyPress}
    />
    <button type="button" on:click={updateEmail}>Save</button>
</div>

<style lang="sass">
#popup-content
    width: 20rem
    display: flex
    flex-direction: column
    column-gap: 1rem

input
    outline: transparent solid 2px
    outline-offset: 2px
    appearance: none
    font-size: 1rem
    padding-inline-start: 1rem
    padding-inline-end: 1rem
    height: 2rem
    border-radius: 0.375rem
    border-style: solid
    border-width: 1px
    border-color: #E2E8F0
    background: inherit

button
    display: inline-flex
    appearance: none
    -moz-box-align: center
    align-items: center
    -moz-box-pack: center
    justify-content: center
    user-select: none
    position: relative
    white-space: nowrap
    vertical-align: middle
    outline: transparent solid 2px
    outline-offset: 2px
    line-height: 1.2
    border-radius: 0.375rem
    font-weight: 600
    transition-property: background-color,border-color,color,fill,stroke,opacity,box-shadow,transform
    transition-duration: 200ms
    height: 2rem
    min-width: 2rem
    font-size: 1rem
    padding-inline-start: 1rem
    padding-inline-end: 1rem
    background: #63171B
    color: #E3F2F9
</style>
