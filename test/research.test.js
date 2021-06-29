const axios = require("axios");
 
describe("Research Controller POST", () => {
    it("Add research details to Database", async () => {
        try {
            const res = axios.post("http://localhost:4000/api/v1/researchpublication", {
                title: "Intrusion Detection System in Wireless Sensor Networks",
                description: "Testing Node 1",
                tag: "IDS",
                
            });
            expect(res.status).toEqual(200);
        } catch (error) {
            console.log(error);
        }
    });
});

describe("Research Controller GET", () => {
    it("should return the all research paper details", async () => {
        try {
            const res = axios.get("http://localhost:4000/api/v1/allresearchpapers");
 
            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});