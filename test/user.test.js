const axios = require("axios");

describe("get @ /user endpoint", () => {
    it("should get user profile", async () => {
        try {
            const res = axios.get("http://localhost:4000/profile");
 
            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});

describe("get @ /user endpoint", () => {
    it("should get all users", async () => {
        try {
            const res = axios.get("http://localhost:4000/admin/getusers");
 
            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});

