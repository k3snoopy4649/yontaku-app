const RandomArray = () => {
    const getRandomArr = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = arr[i];
            arr[i] = arr[r];
            arr[r] = tmp;
        }
    }
    return { getRandomArr }
}
export default RandomArray