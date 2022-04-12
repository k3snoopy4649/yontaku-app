import { ref } from "@vue/reactivity";
const getMondai = () => {
    const mondaiArray = ref([])
    const error = ref(null)

    const load = async(url) => {
        try {
            let data = await fetch(url)
            if (!data.ok) throw Error("問題が取得できませんでした。")
            mondaiArray.value = await data.json()
        } catch (err) {
            error.value = err.message
        }
    }
    return { mondaiArray, error, load }
}
export default getMondai