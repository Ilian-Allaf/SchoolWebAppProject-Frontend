<script>
    import jwtStore from "../store.js";
    import AddLocationForm from "./add_location_form.svelte";

    let jwtItem;
    let data;
    //#State variables
    let showAddFormPopup = "none";

    let showButtons = false;
    let isEditing = false;
    let currentFilmNameMouseOn;
    let currentFilmNameEditingOn;
    //#endregion
    //#Input variables
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
    //#endregion
    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });

    async function getAllLocations() {
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
    function editButtonPressed(location) {
        isEditing = true;
        location.showDetails = true;
        currentFilmNameEditingOn = location._id;
        filmType = location.filmType;
        filmProducerName = location.filmProducerName;
        endDate = location.endDate;
        filmName = location.filmName;
        district = location.district;
        coordinates =location.coordinates;
        filmDirectorName = location.filmDirectorName;
        address = location.address;
        startDate = location.startDate;
        year = location.year;
    }
    function cancelLocationUpdade(){
        isEditing = false;
        currentFilmNameEditingOn = "";
    }
    async function applyLocationUpdate(location) {
        try {
            const response = await fetch(`http://localhost:6969/locations/`+ location._id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtItem}`,
                },
                body: JSON.stringify({
                    filmType: filmType,
                    filmProducerName: filmProducerName,
                    endDate: endDate,
                    filmName: filmName,
                    district: district,
                    geolocation: {
                        coordinates: coordinates,
                    },
                    filmDirectorName: filmDirectorName,
                    address: address,
                    startDate: startDate,
                    year: year,
                }),
            });
            return await response.json();
        }
    catch (error) {
            console.error(error);
        }
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
            $:locations = await getAllLocations();
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
                    {#if isEditing === false}
                    {location.filmName}
                    {/if}
                    {#if isEditing === true && currentFilmNameEditingOn === location._id}
                        <input name="filmName" id="filmName" bind:value={filmName}/>
                        <br/>
                    {/if}
                    {#if isEditing === true && currentFilmNameEditingOn !== location._id}
                        {location.filmName}
                    {/if}
                </span>
                {#if showButtons && currentFilmNameMouseOn === location._id && isEditing === false}
                    <button on:click={() => editButtonPressed(location)} id="edit-button">edit</button>
                    <button on:click={deleteLocation(location._id)} id="delete-button">delete</button>
                {/if}

                {#if isEditing === true && currentFilmNameEditingOn === location._id}
                    <button on:click={() => applyLocationUpdate()} id="apply-update-button">apply</button>
                    <button on:click={() => cancelLocationUpdade()} id="cancel-update-button">cancel</button>
                {/if}

            </div>

            {#if location.showDetails && isEditing === false}
                <p>Film type: {location.filmType}</p>
                <p>ProducerName: {location.filmProducerName}</p>
                <p>End date: {location.endDate}</p>
                <p>District: {location.district}</p>
                <p>Director name: {location.filmDirectorName}</p>
                <p>Address: {location.address}</p>
                <p>Start date: {location.startDate}</p>
                <p>Year: {location.year}</p>
            {/if}
            {#if location.showDetails && isEditing === true}
                <input name="filmType" id="filmType" bind:value={filmType}/>
                <br/>
                <input name="filmProducerName" id="filmProducerName" bind:value={filmProducerName}/>
                <br/>
                <input name="endDate" id="endDate" bind:value={endDate}/>
                <br/>
                <input name="district" id="district" bind:value={district}/>
                <br/>
                <input name="filmDirectorName" id="filmDirectorName" bind:value={filmDirectorName}/>
                <br/>
                <input name="address" id="address" bind:value={address}/>
                <br/>
                <input name="startDate" id="startDate" bind:value={startDate}/>
                <br/>
                <input name="year" id="year" bind:value={year}/>
            {/if}
        </div>
    {/each}
{/await}
<AddLocationForm bind:showAddFormPopup={showAddFormPopup}/>


