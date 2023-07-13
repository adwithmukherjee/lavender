const api = require("lambda-api")();

api.get("/status", () => {
    return { status: "ok " };
});

api.get("/health", () => {
    return { status: "healthy" };
});

const handler = async (event, context) => {
    return await api.run(event, context)
}

module.exports = {
    handler,
};
