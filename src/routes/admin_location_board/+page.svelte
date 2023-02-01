<script>
    import jwtStore from "../store.js";
    import AddLocationForm from "./add_location_form.svelte";

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

    const filmNames = getFilmName()
    let data;
    let visible = "none";
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
<button on:click={() => {visible = "block"}} id="open-popup-button">ADD</button>

<AddLocationForm bind:visible={visible}/>


