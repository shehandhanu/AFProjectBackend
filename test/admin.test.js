const axios = require("axios");

describe("Get All User", () => {
    it("should return the users", async () => {
        try {
            const res = axios.get("http://localhost:4000/api/v1/admin/getusers");

            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});

describe("Get User Profile", () => {
    it("should return sign in user detail", async () => {
        try {
            const res = axios.get("http://localhost:4000/api/v1/profile");

            expect(res.status).toEqual(200);
            expect(typeof res.data).toEqual("Object");
        } catch (error) {
            console.log(error);
        }
    });
});