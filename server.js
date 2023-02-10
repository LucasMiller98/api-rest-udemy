import app from "./app";

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.info(`
    Listening on port ${port}. 
    Link: http://localhost:${port}
  `)
})