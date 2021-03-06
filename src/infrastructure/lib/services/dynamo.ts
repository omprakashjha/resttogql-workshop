import * as cdk from "@aws-cdk/cdk";
import * as dynamodb from "@aws-cdk/aws-dynamodb";

import IRestToGqlStack from "../interfaces/IRestToGqlStack";

const DDB_TABLE_PK = process.env.DDB_TABLE_PK || "";
const DDB_TABLE_NAME = process.env.DDB_TABLE_NAME || "";

const RestToGqlTable = (stack: IRestToGqlStack) => {
    const scope = (stack as unknown) as cdk.Construct;
    stack.Table = new dynamodb.Table(scope, DDB_TABLE_NAME, {
        tableName: DDB_TABLE_NAME,
        streamSpecification: dynamodb.StreamViewType.NewAndOldImages,
        partitionKey: { name: DDB_TABLE_PK, type: dynamodb.AttributeType.Number }
    });

    return stack;
};

export default RestToGqlTable;
