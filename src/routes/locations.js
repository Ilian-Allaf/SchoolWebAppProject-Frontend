import jwtStore from "./store.js";

let jwtItem;
jwtStore.subscribe((data) =>{
    jwtItem = data;
});
export async function getAllLocations() {
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
