<script>
    import jwtStore from "../store.js";
    import AddLocationForm from "./add_location_form.svelte";
    import { getAllLocations } from './locations.js';

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
    }
    async function deleteLocation(id) {
        try {
            await fetch(`http://localhost:3000/locations/` + id, {
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

<button on:click={() => {showAddFormPopup = "block"}} id="open-popup-button">Add</button>

{#await locations}
    <p>Loading...</p>
{:then filmNamesArray}
    {#each filmNamesArray as location}
        <div>
            <div on:mouseenter={() => {showButtons = true; currentFilmNameMouseOn = location._id}} on:mouseleave={() => {showButtons = false; currentFilmNameMouseOn = ""}}>
                <span on:click={() => {location.showDetails = !location.showDetails}}>
                    {location.filmName}
               </span>
               {#if showButtons && currentFilmNameMouseOn === location._id && showAddFormPopup === "none"}
                   <button on:click={editButtonPressed(location)} id="edit-button">edit</button>
                   <button on:click={deleteLocation(location._id)} id="delete-button">delete</button>
               {/if}
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


