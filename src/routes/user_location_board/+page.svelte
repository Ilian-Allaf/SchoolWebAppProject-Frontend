<script>
    import jwtStore from "../store.js";

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
            //const jsonResponse = await response.json()
/*
            for (let i in jsonResponse){
                filmNamesArr.push(jsonResponse[i].filmName)
            }

 */


            return await response.json();
        }
        catch (error) {
            console.error(error);
        }
    }
    const filmNames = getFilmName()
    let data;
</script>

{#await filmNames}
    <p>Loading...</p>
{:then filmNamesArray}
    {#each filmNamesArray as filmName}
        <div>
            <span on:click={() => filmName.showDetails = !filmName.showDetails}>
                {filmName.filmName}
            </span>
            {#if filmName.showDetails}
                <p>filmtype: {filmName.filmType}</p>
                <p>filmProducerName: {filmName.filmProducerName}</p>
                <p>endDate: {filmName.endDate}</p>
                <p>district: {filmName.district}</p>
                <p>filmDirectorName: {filmName.filmDirectorName}</p>
                <p>address: {filmName.address}</p>
                <p>startDate: {filmName.startDate}</p>
                <p>year: {filmName.year}</p>
            {/if}
        </div>
    {/each}
{/await}







