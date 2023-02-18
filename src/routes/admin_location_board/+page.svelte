<script>
    import jwtStore from "../store.js";
    import AddLocationForm from "./add_location_form.svelte";
    import { getAllLocations } from '../locations.js';

    let jwtItem;
    let data;
    //#State variables
    let showAddFormPopup = "none";
    let updateForm = false;
    let currentLocationEditingOn = "";
    let showButtons = false;
    let currentFilmNameMouseOn;
    //#endregion

    let filmType;
    let filmProducerName;
    let endDate;
    let filmName;
    let district;
    let coordinates;
    let filmDirectorName;
    let address;
    let startDate;
    let year;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });

    function editButtonPressed(location) {
        filmType = location.filmType;
        filmProducerName = location.filmProducerName;
        endDate = location.endDate;
        filmName = location.filmName;
        district = location.district;
        coordinates = location.geolocation.coordinates[0] + "," + location.geolocation.coordinates[1];
        filmDirectorName = location.filmDirectorName;
        address = location.address;
        startDate = location.startDate;
        year = location.year;
        updateForm = true;
        currentLocationEditingOn = location._id;
        showAddFormPopup = "block";
        location.showDetails = false;
    }
    async function deleteLocation(id) {
        try {
            await fetch(`https://secure-web-dev-backend-mf4y.onrender.com/locations/` + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtItem}`,
                },
            });
            locations = await getAllLocations();
        }
        catch (error) {
            console.error(error);
        }
    }
    let locations = getAllLocations();


</script>

<button class="center-button" on:click={() => {showAddFormPopup = "block"}} id="open-popup-button">Add</button>


{#await locations}
    <p>Loading...</p>
{:then filmNamesArray}
    {#each filmNamesArray as location}
        <div>
            <div on:mouseenter={() => {showButtons = true; currentFilmNameMouseOn = location._id}} on:mouseleave={() => {showButtons = false; currentFilmNameMouseOn = ""}}>
                <div class = "location-card" on:click={() => {location.showDetails = !location.showDetails}}>
                    {location.filmName}

               {#if showButtons && currentFilmNameMouseOn === location._id && showAddFormPopup === "none"}
                   <button on:click={editButtonPressed(location)} id="edit-button">edit</button>
                   <button on:click={deleteLocation(location._id)} id="delete-button">delete</button>
               {/if}
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
<AddLocationForm
        bind:locations={locations}
        bind:showAddFormPopup={showAddFormPopup}
        bind:updateForm={updateForm}
        bind:currentLocationEditingOn={currentLocationEditingOn}
        bind:filmType={filmType}
        bind:filmProducerName={filmProducerName}
        bind:endDate={endDate}
        bind:filmName={filmName}
        bind:district={district}
        bind:coordinates={coordinates}
        bind:filmDirectorName={filmDirectorName}
        bind:address={address}
        bind:startDate={startDate}
        bind:year={year}
/>

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
