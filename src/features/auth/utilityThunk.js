import { createApiThunk } from "../../utils/createApiThunk";

export const getUtilities = createApiThunk("utility/getAll", "get", () => "/getutil");
export const postUtility = createApiThunk("utility/post", "post", () => "/addutil");
export const updateUtility = createApiThunk("utility/update", "put", (data) => `/updateutil/${data.id}`);
export const deleteUtility = createApiThunk("utility/delete", "delete", (data) => `/deleteutil/${data.id}`);





