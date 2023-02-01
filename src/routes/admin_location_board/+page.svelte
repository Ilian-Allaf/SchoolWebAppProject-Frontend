<script>
    import jwtStore from "../store.js";
    //import add_location_form  from "./add_location_form.svelte";

    let jwtItem;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });

    async function getFilmName() {
        try {
            const response = await fetch(`http://localhost:3000/locations`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtItem}`,
                },
            });
            return await response.json();
        }
        catch (error) {
            console.error(error);
        }
    }
    async function addLocation(log){
        const response = await fetch(`http://localhost:3000/locations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtItem}`,
            },
            body: JSON.stringify({
                filmType: log.filmType,
                filmProducerName: log.filmProducerName,
                endDate: log.endDate,
                filmName: log.filmName,
                district: log.district,
                geolocation: {
                    coordinates: log.coordinates,
                    type: { type: String },
                },
                sourceLocationId: log.sourceLocationId,
                filmDirectorName: log.filmDirectorName,
                address: log.address,
                startDate: log.startDate,
                year: log.year,
            }),
        });
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
                <p>Film type: {filmName.filmType}</p>
                <p>ProducerName: {filmName.filmProducerName}</p>
                <p>End date: {filmName.endDate}</p>
                <p>District: {filmName.district}</p>
                <p>Director name: {filmName.filmDirectorName}</p>
                <p>Address: {filmName.address}</p>
                <p>Start date: {filmName.startDate}</p>
                <p>Year: {filmName.year}</p>
            {/if}
        </div>
    {/each}
{/await}
<button on:click={() => {addLocation()}}>ADD</button>







