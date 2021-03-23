export const filterBySearch = (value, array) =>{
    if (value){
        return array.filter(one => {
            return value.toLowerCase().split(" ").every(word => {
                return (one.name.toLowerCase().includes(word))
            })
        })
    }
    else{
        return array;
    }
}

export default filterBySearch;
