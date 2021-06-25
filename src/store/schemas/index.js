import { schema } from "normalizr";

const memberSchema = new schema.Entity("member");
const memberArraySchema = new schema.Array(memberSchema);

export { memberSchema, memberArraySchema };
