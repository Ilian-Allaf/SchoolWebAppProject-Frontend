<script>
    import jwtStore from "../store.js";
    import ListView from 'svelte-sortable-flat-list-view'

    let jwtItem;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });

    async function getFilmName() {
        try {
            const filmNamesArr = [];
            const response = await fetch(`http://localhost:3000/locations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtItem}`,
                },
            });
            const jsonResponse = await response.json()
            for (let i in jsonResponse){
                console.log(jsonResponse[i].filmName)
                filmNamesArr.push(jsonResponse[i].filmName)
            }
            return filmNamesArr;
        }
        catch (error) {
            console.error(error);
        }
    }
    const yo = getFilmName()
    for (let i in yo){
        console.log(i);
    }
</script>

