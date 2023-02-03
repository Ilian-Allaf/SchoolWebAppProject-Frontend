<script>
    import jwtStore from "../store.js";
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
    export let showAddFormPopup = "none";
    let jwtItem;

    jwtStore.subscribe((data) =>{
        jwtItem = data;
    });


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
        let jsonResponse = response.json();
        console.log(jsonResponse)
    }
</script>
<div class="popup" style="display: {showAddFormPopup};">
<form class="popup-form">
    <label>filmType</label>
    <input name="filmType" id="filmType" bind:value={filmType}/>
    <br>
    <label>filmProducerName</label>
    <input name="filmProducerName" id="filmProducerName" bind:value={filmProducerName}/>
    <br>
    <label>endDate</label>
    <input name="endDate" id="endDate" bind:value={endDate}/>
    <br>
    <label>filmName</label>
    <input name="filmName" id="filmName" bind:value={filmName}/>
    <br>
    <label>district</label>
    <input name="district" id="district" bind:value={district}/>
    <br>
    <label>coordinates</label>
    <input name="coordinates" id="coordinates" bind:value={coordinates}/>
    <br>
    <label>filmDirectorName</label>
    <input name="filmDirectorName" id="filmDirectorName" bind:value={filmDirectorName}/>
    <br>
    <label>address</label>
    <input name="address" id="address" bind:value={address}/>
    <br>
    <label>startDate</label>
    <input name="startDate" id="startDate" bind:value={startDate}/>
    <br>
    <label>year</label>
    <input name="year" id="year" bind:value={year}/>
    <br>
    <button on:click={() => {showAddFormPopup = "none"}} id="close-popup-button">Close</button>
    <button on:click={() => {addLocation()}} id="send-form_button">ADD</button>
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
        border-radius: 5px;
        box-shadow: 0px 0px 5px 0px gray;
    }

    label {
        font-weight: bold;
        margin-right: 10px;
    }

    button {
        background-color: green;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }
</style>


