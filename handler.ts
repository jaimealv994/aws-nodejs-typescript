import {ApolloServer, gql} from 'apollo-server-lambda';
import {CommentService} from './comment.service'
import 'source-map-support/register';


const typeDefs = gql`
    type Comment {
        msgId: Int
        userId: String
        content: String
        createdAt: String
        deleted: Boolean
    }

    type Query{
        get(itemId: String):[Comment]
    }

    type Mutation {
        addComment(itemId: String, userId:String, content:String): [Comment]
        edit(itemId: String, msgId:Int,userId:String, content:String): [Comment]
        delete(itemId: String, msgId:Int, userId:String) : [Comment]
    }
`;

const resolvers = {
    Query: {
        get: (root, args) => {
            const service = new CommentService();
            return service.getComments(args.itemId);
        },
    },
    Mutation: {
        addComment: (roots, args) => {
            const service = new CommentService();
            return service.addComments(args.itemId, args.userId, args.content);
        },
        edit: (roots, args) => {
            const service = new CommentService();
            return service.editComments(args.itemId, args.msgId, args.userId, args.content);
        },
        delete: (roots, args) => {
            const service = new CommentService();
            return service.deleteComments(args.itemId, args.msgId, args.userId);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const graphqlHandler = server.createHandler();
