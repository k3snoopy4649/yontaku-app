import { ref } from "vue";
const SetLocal = () => {
    const setLocal = (prop, val) => {
        localStorage.setItem(prop, JSON.stringify(val))
    }
    return { setLocal }
}
export default SetLocal