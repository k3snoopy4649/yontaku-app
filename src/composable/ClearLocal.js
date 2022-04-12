const ClearLocal = () => {
    const clear = (trgs) => {
        trgs.map(el => localStorage.setItem(el, null))
    }
    return { clear }
}
export default ClearLocal