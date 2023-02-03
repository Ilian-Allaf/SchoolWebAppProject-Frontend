<script>
    import jwtStore from "../store.js";
    import { getAllLocations } from '../locations.js';

    let jwtItem;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });
    const locations = getAllLocations()
    let data;
</script>


{#await locations}
    <p>Loading...</p>
{:then filmNamesArray}
    {#each filmNamesArray as location}
        <div>
            <div>
                <div class = "location-card" on:click={() => {location.showDetails = !location.showDetails}}>
                    {location.filmName}
                </div>
            </div>

            {#if location.showDetails}
                <p>Film type: {location.filmType}</p>
                <p>ProducerName: {location.filmProducerName}</p>
                <p>End date: {location.endDate}</p>
                <p>District: {location.district}</p>
                <p>Coordinates: {location.geolocation.coordinates[0]}, {location.geolocation.coordinates[1]}</p>
                <p>Director name: {location.filmDirectorName}</p>
                <p>Address: {location.address}</p>
                <p>Start date: {location.startDate}</p>
                <p>Year: {location.year}</p>
            {/if}
        </div>
    {/each}
{/await}
<style>
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    #open-popup-button {
        display: block;
        background-color: #4CAF50;
        color: white;
        padding: 16px 20px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    #edit-button, #delete-button {
        background-color: #f44336;
        color: white;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        float: right;
        margin-left: 10px;
    }
    .center-button {
        display: block;
        margin: 0 auto;
        text-align: center;
    }
    .location-card {
        background-color: #f2f2f2;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 15px;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
    }
    .location-card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        margin-bottom: 10px;
    }
</style>





