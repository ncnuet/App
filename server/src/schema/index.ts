import { Express } from "express"
import { graphqlHTTP } from "express-graphql"
import schema from "./schema"


export default function addGrapQl (app: Express){
    app.use(
        "/graphql",
        graphqlHTTP({
          schema: schema,
          graphiql: true,
        })
      )
}