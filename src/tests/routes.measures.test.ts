import { app } from "../server";
import supertest from "supertest";

const request = supertest(app);

describe("API - Measures", () => {

    it("Deve retornar status 200 no POST /upload", async () => {
        const response = await request.post("/upload")
            .send({
                image_url: "https://m.media-amazon.com/images/I/61VSma+336L._AC_UF894,1000_QL80_.jpg",
                customer_code: "123123",
                measure_datetime: "2006-04-02",
                measure_type: "GAS",
                measure_value: 12.10
            });
        expect(response.status).toBe(200);
        expect(response.type).toBe("application/json");

    })

    it("Deve retornar 400 no POST /upload", async()=> {
        const response = await request.post("/upload")
        .send({
            image_url: "https://m.media-amazon.com/images/I/61VSma+336L._AC_UF894,1000_QL80_.jpg",
            customer_code: "123123",
            measure_datetime: "2021-09-01",
            measure_type: ""
        });
        expect(response.status).toBe(400);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("error_code");
    });

    it("Deve retornar 409 no POST /upload", async()=> {
        const response = await request.post("/upload")
        .send({
            image_url: "https://m.media-amazon.com/images/I/61VSma+336L._AC_UF894,1000_QL80_.jpg",
            customer_code: "123123",
            measure_datetime: "2021-09-02",
            measure_type: "GAS"

        });
        expect(response.status).toBe(409);
        expect(response.type).toBe("application/json");
        expect(response.body).toHaveProperty("error_code")
    });
})