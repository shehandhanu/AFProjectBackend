const axios = require("axios");
 
describe("POST @ /session endpoint", () => {
    it("should create a session preposal ", async () => {
        try {
            const res = axios.post("http://localhost:4000/createsession/:id", {
                praposeBy: "60e13d4b142b3819fc1b1471",
                researcherName: "nuwan pradeep",
                
            });
 
            expect(res.status).toEqual(200);
        } catch (error) {
            console.log(error);
        }
    });
});

describe("GET @ /session endpoint", () => {
    it("should return sessions", async () => {
        try {
            const res = axios.get("http://localhost:4000/allsessions");
 
            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});

describe("get @ /session endpoint", () => {
    it("should get session by ID", async () => {
        try {
            const res = axios.get("http://localhost:4000/session/:id");
 
            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});