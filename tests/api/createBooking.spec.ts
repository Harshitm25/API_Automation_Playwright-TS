import {test,expect} from '@playwright/test';


test("create post request",async({request})=>{

    const requestBody=
        {
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        }

        const response= await request.post("/booking",{data:requestBody});

        const json=response.json();
        console.log("newfile ",json);

        // validation status

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

         

})