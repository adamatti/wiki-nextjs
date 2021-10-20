import logger from "./logger";

describe("logger", ()=> {
    it ("shall not explode", () => {
        logger.debug("debug");
        logger.info("info");
        logger.warn("warn");
        logger.error("error");
    });

    it ("create child", ()=> {
        const child = logger.child({
            foo: "bar"
        });

        child.info("info");
    })
})