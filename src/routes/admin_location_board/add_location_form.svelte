<script>
    import jwtStore from "../store.js";
    import { getAllLocations } from '../locations.js';
    export let locations;
    export let filmType;
    export let filmProducerName;
    export let endDate;
    export let filmName;
    export let district;
    export let coordinates;
    export let filmDirectorName;
    export let address;
    export let startDate;
    export let year;
    export let showAddFormPopup = "none";
    export let updateForm= false;
    export let currentLocationEditingOn = "";
    let jwtItem;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });
    function resetInputVariables(){
        [filmType, filmProducerName, endDate, filmName, district, coordinates, filmDirectorName, address, startDate, year] =  ""
    }
    function cancelLocationUpdate(){
        showAddFormPopup = "none";
        resetInputVariables();
    }
    async function applyLocationUpdate() {
        try {
            await fetch(`http://localhost:3000/locations/`+ currentLocationEditingOn, {
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
                        coordinates: [coordinates.split(",")[0], coordinates.split(",")[1]],
                    },
                    filmDirectorName: filmDirectorName,
                    address: address,
                    startDate: startDate,
                    year: year,
                }),
            });
            updateForm = false;
            resetInputVariables();
            showAddFormPopup = "none";
            locations = getAllLocations()

        }
        catch (error) {
            console.log(error);
        }
    }
    async function addLocation(){
        const response = await fetch(`http://localhost:3000/locations`, {
            method: "POST",
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
        showAddFormPopup = "none"
        let jsonResponse = response.json();
        console.log(jsonResponse)
    }
</script>
<div class="popup" style="display: {showAddFormPopup};">
<form class="popup-form">
    <label>Film Name</label>
    <input name="filmName" id="filmName" bind:value={filmName}/>
    <br>
    <label>Film Type</label>
    <input name="filmType" id="filmType" bind:value={filmType}/>
    <br>
    <label>Film Producer Name</label>
    <input name="filmProducerName" id="filmProducerName" bind:value={filmProducerName}/>
    <br>
    <label>End Date</label>
    <input name="endDate" id="endDate" bind:value={endDate}/>
    <br>
    <label>District</label>
    <input name="district" id="district" bind:value={district}/>
    <br>
    <label>Coordinates</label>
    <input name="coordinates" id="coordinates" bind:value={coordinates}/>
    <br>
    <label>Film Director Name</label>
    <input name="filmDirectorName" id="filmDirectorName" bind:value={filmDirectorName}/>
    <br>
    <label>Address</label>
    <input name="address" id="address" bind:value={address}/>
    <br>
    <label>Start Date</label>
    <input name="startDate" id="startDate" bind:value={startDate}/>
    <br>
    <label>Year</label>
    <input name="year" id="year" bind:value={year}/>
    <br>
    {#if updateForm === true}
        <button on:click={() => applyLocationUpdate()} id="apply-update-button">apply</button>
        <button on:click={() => cancelLocationUpdate()} id="cancel-update-button">cancel</button>
    {:else}
        <button on:click={() => {showAddFormPopup = "none"}} id="close-popup-button">Close</button>
        <button on:click={() => {addLocation()}} id="send-form_button">Add</button>
    {/if}
</form>
</div>

<style>
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px gray;
        max-width: 600px;
        width: 80%;
        text-align: center;
    }

    input[type="text"],
    input[type="date"] {
        padding: 10px;
        margin: 10px 0;
        width: 100%;
        border: none;
        border-bottom: 2px solid grey;
        border-radius: 5px;
        box-shadow: none;
    }

    label {
        font-weight: bold;
        margin-right: 30px;
        margin-bottom: 0px;
        display: inline-block;
        width: 150px;
        text-align: left;
        padding-right: 10px;
    }

    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: 1px solid #4CAF50;
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }
</style>