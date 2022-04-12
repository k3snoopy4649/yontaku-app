import { ref } from "vue";
const GetLocal = () => {
    const getLocal = (prop, val) => {
        return JSON.parse(localStorage.getItem(prop, val))
    }
    return { getLocal }
}
export default GetLocal