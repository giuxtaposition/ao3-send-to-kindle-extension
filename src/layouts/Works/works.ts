import SendToKindle from "../../components/SendToKindle/SendToKindle.svelte"

const allWorksHeaders = document.querySelectorAll(".header.module > h4.heading")

for (const header of allWorksHeaders) {
    const workUrl =
        "https://archiveofourown.org" +
        header.firstElementChild.getAttribute("href")

    new SendToKindle({
        target: header,
        props: {
            workUrl,
        },
    })
}
