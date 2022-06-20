const userData = {
    id: 1,
    username: "test",
    email: "test@test.com",
    phone: "1234567890",
};

export default async function mockFetch(url) {
    switch (url) {
        case "/api/user":
            return Response.json(userData);
        case "/api/login":
            return Response.json(userData);
        case "/api/register":
            return Response.json(userData);
        case "/home":
            return Response.json({
                status: 200,
            });
        case "/profile":
            return Response.json({
                status: 200,
            });
        default:
            return Response.json({
                status: 404,
            });
    };
}