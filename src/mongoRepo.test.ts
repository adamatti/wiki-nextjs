import * as mongoRepo from "./mongoRepo";

describe("mongoRepo", ()=> {
    it("list shall not explode", ()=> {
        return mongoRepo.list();
    })

    it ("save shall not explode", ()=> {
        return mongoRepo.save({name: "unit-test", text: ""});
    })

    it ("delete shall not explode", ()=> {
        return mongoRepo.remove("unit-test");
    })

    afterAll (()=> {
        return mongoRepo.close();
    })
})