<div class="spinner" />

<style lang="sass">
    .spinner
        display: inline-block
        border-top-color: currentcolor
        border-right-color: currentcolor
        border-style: solid
        border-radius: 99999px
        border-width: 2px
        border-bottom-color: transparent
        border-left-color: transparent
        animation: 0.55s linear 0s infinite normal none running animation-spinner
        width: 1.5rem
        height: 1.5rem

    @keyframes animation-spinner
        100%
            transform: rotate(360deg)

</style>
